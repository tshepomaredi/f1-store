# backend/app/api/products.py
from fastapi import APIRouter, HTTPException
from typing import List
from app.models.product import Product

router = APIRouter()

# Temporary product data (replace with database)
products = [
    {
        "id": 1,
        "name": "Red Bull Racing Cap",
        "description": "Official 2023 Team Cap",
        "price": 39.99,
        "imageUrl": "https://example.com/cap.jpg",
        "category": "accessories"
    },
    {
        "id": 2,
        "name": "Ferrari Team Shirt",
        "description": "Official Ferrari F1 Team Shirt 2023",
        "price": 89.99,
        "imageUrl": "https://example.com/shirt.jpg",
        "category": "clothing"
    }
]

@router.get("/")
async def get_products() -> List[dict]:
    return products

@router.get("/{product_id}")
async def get_product(product_id: int) -> dict:
    product = next((p for p in products if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
