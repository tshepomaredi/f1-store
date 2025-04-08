// infrastructure/lib/application-stack.ts
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

interface ApplicationStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
  databaseSecretArn: string;
}

export class ApplicationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ApplicationStackProps) {
    super(scope, id, props);

    // Security Groups
    const albSg = new ec2.SecurityGroup(this, 'AlbSecurityGroup', {
      vpc: props.vpc,
      description: 'Security group for Application Load Balancer',
      allowAllOutbound: true,
    });

    const appSg = new ec2.SecurityGroup(this, 'ApplicationSecurityGroup', {
      vpc: props.vpc,
      description: 'Security group for application instances',
      allowAllOutbound: true,
    });

    // Allow inbound HTTP traffic to ALB
    albSg.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'Allow HTTP traffic'
    );

    // Allow traffic from ALB to application instances
    appSg.addIngressRule(
      albSg,
      ec2.Port.tcp(80),
      'Allow traffic from ALB'
    );

    // Application Load Balancer
    const alb = new elbv2.ApplicationLoadBalancer(this, 'ApplicationALB', {
      vpc: props.vpc,
      internetFacing: true,
      securityGroup: albSg,
    });

    // ALB Listener
    const listener = alb.addListener('HttpListener', {
      port: 80,
      open: true,
    });

    // IAM Role for EC2 instances
    const ec2Role = new iam.Role(this, 'EC2InstanceRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
    });

    // Add permissions to access database secrets
    ec2Role.addToPolicy(new iam.PolicyStatement({
      actions: ['secretsmanager:GetSecretValue'],
      resources: [props.databaseSecretArn],
    }));

    // Auto Scaling Group
    const asg = new autoscaling.AutoScalingGroup(this, 'ApplicationASG', {
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      securityGroup: appSg,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.SMALL),
      machineImage: new ec2.AmazonLinuxImage(),
      minCapacity: 2,
      maxCapacity: 4,
      desiredCapacity: 2,
      role: ec2Role,
      healthCheck: autoscaling.HealthCheck.elb({ grace: cdk.Duration.seconds(60) }),
    });

    // Add ASG to ALB target group
    listener.addTargets('ApplicationFleet', {
      port: 80,
      targets: [asg],
      healthCheck: {
        path: '/health',
        unhealthyThresholdCount: 2,
        healthyThresholdCount: 5,
        interval: cdk.Duration.seconds(30),
      },
    });

    // Auto Scaling Policies
    asg.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: 70,
      cooldown: cdk.Duration.seconds(300),
    });

    // Outputs
    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: alb.loadBalancerDnsName,
      description: 'Application Load Balancer DNS Name',
    });
  }
}
