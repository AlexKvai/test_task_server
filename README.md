# API Documentation

## Categories API

### Создание новой категории

- **URL:** `/categories/create`
- **Method:** `POST`
- **Description:** Creates a new category.
- **Request Body:**
  ```json
  {
  	"name": "string"
  }
  ```
- **Response::**
  ```json
  {
  	"id": "number",
  	"name": "string"
  }
  ```
