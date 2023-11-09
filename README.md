# TRGST Store - E-commerce Platform
TRGST Store is a modern e-commerce platform built with React and Vite, utilizing API endpoints from a Django backend.  
It provides a seamless shopping experience for users and efficient management tools for administrators.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#usage)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#configuration)
- [Configuration](#configuration)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features
- Browse a wide range of products categorized by type, brand, and price range.
  - Search for specific products using keywords or filters.
  - View detailed product information, including images, descriptions, and prices.
- Create an account for personalized shopping experience and order tracking.
  - User authentication and authorization.
- Add products to your shopping cart for easy checkout.
  - Integration with external payment systems.
  - Order processing and status tracking.
- Admin dashboard for managing products, orders, and user accounts.
  - Product management with support for preferences, categories, sizes, and colors.


## Prerequisites
Before running the project, make sure you have the following installed:
- Python 3.8+
- Django 4.2.5+
- SQLite3 database

## Installation
1. Clone the repository:

    ```
    git clone https://github.com/110nard0/store.git
    ```
2. Navigate to the project directory:

    ```
    cd store
    ```
3. Install dependencies:

    ```
    pip install -r requirements.txt
    npm install
    ```
4. Use Django's default SQLite3 database by applying migrations.  
Alternatively, Create a PostgreSQL database and configure the database settings in settings.py.

    ```
    python3 manage.py migrate
    ```
5. In another terminal go to the same directory and start the frontend development server.

    ```
    npm run dev
    ```

   You may also use Vite to build static files and serve the SPA assets using Django.

    ```
    npm run build
    python3 manage.py collect static
    ```

   Open your browser and go to `http://localhost:5173`.
6. Start the backend development server:

    ```
    python3 manage.py runserver
    ```
   Open your browser and go to `http://localhost:8000`.


## Usage
The backend provides APIs for managing products, preferences, categories, sizes, colors, shopping carts, and orders.  

Refer to the API documentation for detailed information on how to use each endpoint.

### API Endpoints
#### Create Waitlist User:

**Request:**
  > POST /api

```http
POST /api/v1/waitlist
Content-Type: application/json

{
  "name": "agu dike",
  "email": "test@gmail.com"
}
```

**Response:**

```json
Status: 200 OK
Content-Type: application/json

{
  "id": "59a1f652-7542-4a86-983c-f3568a490670",
  "name": "agu dike",
  "email": "test@gmail.com"
}
```

## Authentication
The backend uses JWT-based authentication.

To authenticate, obtain a JWT token by sending a POST request to `/api/token/` with valid credentials (email and password).

The server returns a token pair(access and refresh) that you can use to authenticate and perform user actions.

## Configuration
Environment variables or configuration settings required for the project can be found in the .env.example file.

## Testing
The API was extensively tested using Postman. 

The collection of the test requests and with included scripts can be found here:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/29693336-a0568c7e-b5ca-4531-8182-2508360e715b?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D29693336-a0568c7e-b5ca-4531-8182-2508360e715b%26entityType%3Dcollection%26workspaceId%3Dcd72bb88-007e-4363-9897-43a495118034)

## Contributing
If you'd like to contribute to this project, please follow these steps:

- Fork the repository
- Create a new branch (git checkout -b feature/your-feature)
- Commit your changes (git commit -m 'Add some feature')
- Push to the branch (git push origin feature/your-feature)
- Create a new Pull Request

## License
The Django framework is open-source software licensed under the [BSD3 license](https://opensource.org/license/bsd-3-clause/).

[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
>>>>>>> dev
