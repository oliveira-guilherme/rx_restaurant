# rx_restaurant

### Prerequisites
- Docker and Docker Compose

## Setup Instructions
1 - Copy file .env.example and rename to .env

2 - Run command docker compose up -d in terminal

## Run unit test:
docker exec -it <container_name> npm test

## Example of requests:


## POST: http://localhost:3000/menu

payload: {
    "name": "Orange juice",
    "price": "2.59",
    "category": "drink",
    "description": "No sugar"
}

description: Create an item in menu


## POST: http://localhost:3005/customers

payload: {
    "name": "John Doe",
    "phone": "551499999999",
    "email": "john@gmail.com"
}

description: Create an item in menu


## GET: http://localhost:3000/customers/orders/bcbda9d1-18e5-40e9-90a8-74148660f168?page=1&limit=5

description: List the orders for a specific customer


## POST: http://localhost:3000/orders

payload: {
    
    "customerId": "6c3add3d-6254-47cc-836d-749cdcf1ed49",

    "status": "pending",

    "items": [{
        "menu_item_id": "8f7ee1a2-d9ab-4847-ae01-22da20e9ddd1",
        "quantity": 2
    }]
}

description: Create an order with a list os dishes


## PATCH: http://localhost:3000/orders/modify/8f4909f7-6e26-4e50-8076-523e355fbdb6

payload: {

    "customerId": "6c3add3d-6254-47cc-836d-749cdcf1ed49",

    "status": "pending",

    "items": [{

        "menu_item_id": "8f7ee1a2-d9ab-4847-ae01-22da20e9ddd1",

        "quantity": 2

    }]
    
}
description: Create an order with a list os dishes
