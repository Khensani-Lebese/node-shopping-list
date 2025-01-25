
# Node.js File Manager and Shopping List API

# Overview

This Node.js application serves as a basic File Manager and a Shopping List REST API. It utilizes Node.js' built-in fs and http modules to manage files and expose CRUD endpoints for interacting with a shopping list stored in a JSON file. This application provides functionality to create, read, update, and delete shopping list items via REST API endpoints while also showcasing file system interactions like creating directories and managing JSON files.

# Features

File Manager

Create a New Directory: Dynamically create a folder to store the JSON file.

Create a JSON File: Generate a shopping-list.json file to store shopping list data.

Read and Parse the JSON File: Read and display the data in the JSON file.

Update the JSON File: Add new items to the file or modify existing data.

# Shopping List API

GET: Retrieve all shopping list items.

POST: Add a new shopping list item.

PUT/PATCH: Update an existing shopping list item.

DELETE: Remove a shopping list item.

Error Handling: Handles invalid data, missing files, and incorrect HTTP requests gracefully.

# Testing

Thoroughly tested with tools like Postman.

Handles edge cases like malformed JSON input or missing fields.

# Prerequisites

Node.js: v14 or later

Postman (or any API testing tool)

Nodemon (optional, for auto-reloading during development)

# Installation

Clone the Repository

` git clone https://github.com/Khensani-Lebese/node-shopping-list.git `

`cd node-shopping-list`

Install Dependencies
If nodemon is not installed globally, install it:

`npm install nodemon --save-dev`

# Run the Application

With nodemon:

`npm start`

Without nodemon:

node server.js

# Access the Application
The server will run on http://localhost:3000. Use Postman or your browser to test the API endpoints.

# API Endpoints

Base URL

`http://localhost:3000/shopping-list`

# Endpoints

1. GET `/shopping-list`

Retrieve all shopping list items.

Request: No body required.

Response:

```[
  {
    "id": 1,
    "name": "Milk",
    "quantity": 2,
    "category": "Dairy"
  }
]```

2. POST `/shopping-list`

Add a new item to the shopping list.

Request:

```{
  "name": "Bread",
  "quantity": 1,
  "category": "Bakery"
}```

Response:

```{
  "message": "Item added successfully!"
}```

3. PUT /shopping-list/:id

Update an existing shopping list item by ID.

Request:

```{
  "name": "Eggs",
  "quantity": 12,
  "category": "Dairy"
}```

Response:

```{
  "message": "Item updated successfully!"
}```

4. DELETE `/shopping-list/:id`

Remove an item from the shopping list by ID.

Response:

```{
  "message": "Item deleted successfully!"
}```

File Structure

```node-shopping-list/
├── shopping-list/
│   └── shopping-list.json
├── server.js
└── package.json```

# Key Files

server.js: Main server file that implements the File Manager and Shopping List API.

shopping-list/shopping-list.json: JSON file to store shopping list data.

package.json: Contains project metadata and dependencies.

Error Handling

Handles cases where the JSON file is missing or corrupted.

Validates incoming request data to ensure required fields are present.

Returns meaningful error messages for invalid operations.

# Testing

Using Postman:

Test all CRUD operations by making requests to the respective endpoints.

# Edge Cases:

Add items with missing fields.

Update non-existent items.

Delete items with invalid IDs.

Future Improvements

Add authentication for secure access to the API.

Introduce categories or tags for better shopping list organization.

Add support for sorting and filtering items.

# Contributing

Feel free to fork the repository, make changes, and submit a pull request. Contributions are welcome!

# License

This project is licensed under the MIT License.





