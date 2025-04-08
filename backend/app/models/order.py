# backend/app/models/order.py
from pydantic import BaseModel
from typing import List
from datetime import datetime
from decimal import Decimal

class OrderItem(BaseModel):
    product_id: int
    quantity: int
    price: Decimal

class OrderCreate(BaseModel):
    user_id: int
    items: List[OrderItem]
    shipping_address: str

class Order(BaseModel):
    id: int
    user_id: int
    items: List[OrderItem]
    total_amount: Decimal
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
