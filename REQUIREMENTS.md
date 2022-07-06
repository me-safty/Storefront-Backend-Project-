# API Endpoints

## Users

### Create [token required]

return json data of the created user

- URL `/api/users`
- Method `post`
- URL params `none`

- Request Body

  ```
  {
    "first_name": "mohamed",
    "last_name": "atef",
    "password": "123safty"
  }
  ```

- Sucsses Response

  Code: 200

  ```
  {
    "id": 1,
    "first_name": "mohamed",
    "last_name": "atef"
  }
  ```

### Index [token required]

return json data of array of users

- URL `/api/users`
- Method `get`
- URL params `none`
- Request Body `none`

- Sucsses Response

  Code: 200

  ```
  [
    {
      "id": 1,
      "first_name": "mohamed",
      "last_name": "atef"
    },
    {
      "id": 2,
      "first_name": "ahmed",
      "last_name": "atef"
    }
  ]
  ```

### Show [token required] (args: user id)

return json data of user by id

- URL `/api/users`
- Method `get`
- URL params `id=[the user id]`
- Request Body `none`

- Sucsses Response

  Code: 200

  ```
  {
    "id": 1,
    "first_name": "mohamed",
    "last_name": "atef"
  }
  ```

### Update [token required]

return json data of updated user

- URL `/api/users`
- Method `put`
- URL params `none`

- Request Body

  ```
  {
    "first_name": "ahmed",
    "last_name": "atef",
    "password": "123safty"
  }
  ```

- Sucsses Response

  Code: 200

  ```
  {
    "id": 1,
    "first_name": "ahmed",
    "last_name": "atef"
  }
  ```

### Delete [token required] (args: user id)

return json data of deleted user

- URL `/api/users`
- Method `delete`
- URL params `id=[the user id]`
- Request Body `none`

- Sucsses Response

  Code: 200

  ```
  {
    "id": 1,
    "first_name": "ahmed",
    "last_name": "atef"
  }
  ```

## Products

### Create [token required]

return json data of the created product

- URL `/api/products`
- Method `post`
- URL params `none`

- Request Body

  ```
  {
    "name": "ipad 2020 pro",
    "price": 10,
    "category": "phones"
  }
  ```

- Sucsses Response

  Code: 200

  ```
  {
    "id": 1,
    "name": "ipad 2020 pro",
    "price": 10,
    "category": "phones"
  }
  ```

### Index

return json data of array of products

- URL `/api/products`
- Method `get`
- URL params `none`
- Request Body `none`

- Sucsses Response

  Code: 200

  ```
  [
    {
      "id": 1,
      "name": "ipad 2020 pro",
      "price": 10,
      "category": "phones"
    },
    {
      "id": 2,
      "name": "iphone pro",
      "price": 10,
      "category": "phones"
    }
  ]
  ```

### Show (args: product id)

return json data of producr by id

- URL `/api/products`
- Method `get`
- URL params `id=[the products id]`
- Request Body `none`

- Sucsses Response

  Code: 200

  ```
  {
    "id": 1,
    "name": "ipad 2020 pro",
    "price": 10,
    "category": "phones"
  }
  ```

### Update [token required]

return json data of updated product

- URL `/api/products`
- Method `put`
- URL params `none`

- Request Body

  ```
  {
    "id": 1,
    "name": "iphone pro",
    "price": 10,
    "category": "phones"
  }
  ```

- Sucsses Response

  Code: 200

  ```
  {
    "id": 1,
    "name": "iphone pro",
    "price": 10,
    "category": "phones"
  }
  ```

### Delete [token required] (args: product id)

return json data of deleted product

- URL `/api/products`
- Method `delete`
- URL params `id=[the product id]`
- Request Body `none`

- Sucsses Response

  Code: 200

  ```
  {
    "id": 1,
    "name": "iphone pro",
    "price": 10,
    "category": "phones"
  }
  ```

### Get Product By Category (args: category)

return json data of product by category

- URL `/api/products/category`
- Method `get`
- URL params `category=[the category name]`
- Request Body `none`

- Sucsses Response

  Code: 200

  ```
  {
    "id": 1,
    "name": "iphone pro",
    "price": 10,
    "category": "phones"
  }
  ```

## Orders

### Create [token required]

return json data of the created order

- URL `/api/orders`
- Method `post`
- URL params `none`

- Request Body

  ```
  {
    "user_id": 1
  }
  ```

- Sucsses Response

  Code: 200

  ```
  {
    "id": 1,
    "user_id": 1,
    "status": "active"
  }
  ```

### Index

return json data of array of orders

- URL `/api/orders`
- Method `get`
- URL params `none`
- Request Body `none`

- Sucsses Response

  Code: 200

  ```
  [
    {
      "id": 1,
      "user_id": 1,
      "status": "active"
    },
    {
      "id": 2,
      "user_id": 1,
      "status": "active"
    }
  ]
  ```

### Show (args: product id)

return json data of order by id

- URL `/api/orders`
- Method `get`
- URL params `id=[the order id]`
- Request Body `none`

- Sucsses Response

  Code: 200

  ```
  {
    "id": 1,
    "user_id": 2,
    "status": "active",
    "products": [
      {
        "id": 1,
        "name": "iphone 13 pro max",
        "price": 1600,
        "category": "phones",
        "quantity": 1
      }
    ]
  }
  ```

### Update [token required]

return json data of updated order

- URL `/api/orders`
- Method `put`
- URL params `none`

- Request Body

  ```
  {
    "id": 1,
    "user_id": 2,
    "status": "complete"
  }
  ```

- Sucsses Response

  Code: 200

  ```
  {
    "id": 1,
    "user_id": 2,
    "status": "complete"
  }
  ```

### Delete [token required] (args: order id)

return json data of deleted order

- URL `/api/orders`
- Method `delete`
- URL params `id=[the order id]`
- Request Body `none`

- Sucsses Response

  Code: 200

  ```
  {
    "id": 1,
    "user_id": 2,
    "status": "complete"
  }
  ```

### Current_Order_By_User [token required] (args: user id)

return json data of order by user id

- URL `/api/orders/Current_Order_By_User`
- Method `get`
- URL params `id=[the user id]`
- Request Body `none`

- Sucsses Response

  Code: 200

  ```
  {
    "id": 1,
    "user_id": 2,
    "status": "active",
    "products": [
      {
        "id": 1,
        "name": "iphone 13 pro max",
        "price": 1600,
        "category": "phones",
        "quantity": 1
      }
    ]
  }
  ```

### Completed_Order_By_User [token required] (args: user id)

return json data of complete order by user id

- URL `/api/orders/Completed_Order_By_User`
- Method `get`
- URL params `id=[the user id]`
- Request Body `none`

- Sucsses Response

  Code: 200

  ```
  {
    "id": 1,
    "user_id": 2,
    "status": "complete",
    "products": [
      {
        "id": 1,
        "name": "iphone 13 pro max",
        "price": 1600,
        "category": "phones",
        "quantity": 1
      }
    ]
  }
  ```

### product_order [token required]

return json data of product_order

- URL `/api/orders/addProduct`
- Method `post`
- URL params `none`

- Request Body

  ```
  {
    "order_id": 3,
    "product_id": 2,
    "quantity": 3
  }
  ```

- Sucsses Response

  Code: 200

  ```
  {
    "id": 1,
    "order_id": 3,
    "product_id": 2,
    "quantity": 3
  }
  ```

### delete product_order [token required]

return json data of deleted product_order

- URL `/api/orders/addProduct`
- Method `post`
- URL params `none`

- Request Body

  ```
  {
    "product_id": 2
    "order_id": 3,
  }
  ```

- Sucsses Response

  Code: 200

  ```
  {
    "id": 1,
    "order_id": 3,
    "product_id": 2,
    "quantity": 3
  }
  ```

# Data Shapes

### User

- id
- firstName
- lastName
- password

```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

### Product

- id
- name
- price
- category

```
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(50) NOT NULL
);
```

### Orders

- id
- user_id `foreign key to user table`
- status of order (active or complete)
- id of each product in the order `foreign key to product table`
- quantity of each product in the order

```
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  status VARCHAR(50) NOT NULL
);
```

### product_order

- id
- order_id `foreign key to order table`
- product_id `foreign key to product table`
- quantity

```
CREATE TABLE prouduct_order (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) NOT NULL,
  product_id INTEGER REFERENCES products(id) NOT NULL,
  quantity INTEGER NOT NULL
);
```
