// frontend/src/mock/data.js
export const mockProducts = [
  {
    id: 1,
    name: "Red Bull Racing 2023 Team Cap",
    description: "Official Red Bull Racing Team Cap for the 2023 F1 season",
    price: 39.99,
    imageUrl: "https://grandprixstore.co.za/wp-content/uploads/2025/04/GPImage_60357191OSFM_1-7.webp",
    category: "accessories"
  },
  {
    id: 2,
    name: "Ferrari Team Shirt",
    description: "Official Ferrari F1 Team Shirt 2023",
    price: 89.99,
    imageUrl: "https://grandprixstore.co.za/wp-content/uploads/2025/04/GPImage_763944013XL_1-7.webp",
    category: "clothing"
  },
  {
    id: 3,
    name: "Mercedes AMG Team Jacket",
    description: "Official Mercedes AMG Petronas F1 Team Jacket 2023",
    price: 129.99,
    imageUrl: "https://grandprixstore.co.za/wp-content/uploads/2025/04/GPImage_701227952001220_1-7.webp",
    category: "clothing"
  }
];

export const mockRaceData = {
  monaco: [
    { lap: 1, driver1Time: 80.5, driver2Time: 81.2 },
    { lap: 2, driver1Time: 79.8, driver2Time: 80.1 },
    { lap: 3, driver1Time: 79.6, driver2Time: 79.9 },
    // Add more lap data as needed
  ]
};
