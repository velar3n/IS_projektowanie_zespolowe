
# Application Backend

## Overview

This project is a backend application built with Spring Boot. It provides various endpoints for user authentication, registration, and information retrieval.

## Technologies Used

- Java 17
- Spring Boot 3.4.3
- Spring Security
- Spring Data JPA
- SQLite
- Maven

## Prerequisites

- Java 17
- Maven
- SQLite

## Setup

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd applicationBackend
   ```

2. **Build the project:**
   ```sh
   mvn clean install
   ```

3. **Run the application:**
   ```sh
   mvn spring-boot:run
   ```

## Endpoints

### Authentication

- **Login:**
  ```http
  POST /login
  ```
  **Request Body:**
  ```json
  {
    "username": "your-username",
    "password": "your-password"
  }
  ```

- **Register:**
  ```http
  POST /register
  ```
  **Request Body:**
  ```json
  {
    "username": "your-username",
    "password": "your-password",
    "email": "your-email"
  }
  ```

### User Information

- **Get User:**
  ```http
  GET /user
  ```
  **Query Parameters:**
    - `username`: The username of the user.

- **Get User Roles:**
  ```http
  GET /user/roles
  ```
  **Query Parameters:**
    - `username`: The username of the user.

- **Get User Information:**
  ```http
  GET /user/information
  ```
  **Query Parameters:**
    - `username`: The username of the user.

