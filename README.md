# Storefront Backend API

## Gitting Strted

These instructions will make you gitting started wwith the project and running on your local machine for developing and testing propses.

### Installing 

Run the following commaned to install the project dependincies:

```
npm init
```

### Setup environment

create the `.env` file and the required environment variables:

```
PORT=3000
PG_HOST=127.0.0.1 
DB_PORT=5432
PG_DB=database_dev 
PG_DB_TEST=database_test
PG_USER=database_user 
PG_PASS=database_password 
ENV=developement
BCRYPT_PASS=your_secret_password
SALT_ROUND=10
TOKEN_SECRET=your_secret_token
```

### Running the application 

1. **Create user**
  ```
  CREATE USER user_name WITH PASSWORD 'pass1234';
  ```

2. **Create database for dev and test**
  ```
  # via SQL qurey
  CREATE DATABASE storefront_backend_db;
  CREATE DATABASE storefront_backend_test_db;
  ```

3. **Run the migrations**
  ```
  npx db-migrate up
  ```

4. **Run the server**
  ```
  npm run server
  ```

5. **Run the api endpoint**
  ```
  See the REQUIREMENTS file to know how to use them
  ```

### Running the unit tests

Run the following commaned to start testing the api modles and endpinets:

```
npm run test:db
```