const http = require("http");
const fs = require("fs");
const path = require("path");

// File path for the shopping list JSON file
const FILE_PATH = path.join(__dirname, "data", "shopping-list.json");

// Helper function to read the JSON file
const readFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(data || "[]")); // Parse JSON or default to an empty array
    });
  });
};

// Helper function to write to the JSON file
const writeFile = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), "utf8", (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

// Create the server
const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  if (url.startsWith("/shopping-list")) {
    // Handle GET request
    if (method === "GET") {
      try {
        const shoppingList = await readFile();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(shoppingList));
      } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Failed to read the shopping list.");
      }
    }

    // Handle POST request
    else if (method === "POST") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", async () => {
        try {
          const newItem = JSON.parse(body);
          if (!newItem.name || !newItem.quantity) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            return res.end("Invalid item. 'name' and 'quantity' are required.");
          }

          const shoppingList = await readFile();
          newItem.id = shoppingList.length
            ? shoppingList[shoppingList.length - 1].id + 1
            : 1; // Auto-increment ID
          shoppingList.push(newItem);
          await writeFile(shoppingList);

          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(newItem));
        } catch (error) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Failed to add the item.");
        }
      });
    }

    // Handle PUT request
    else if (method === "PUT" || method === "PATCH") {
      const id = parseInt(url.split("/").pop()); // Extract ID from URL
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", async () => {
        try {
          const updates = JSON.parse(body);
          const shoppingList = await readFile();

          const itemIndex = shoppingList.findIndex((item) => item.id === id);
          if (itemIndex === -1) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            return res.end("Item not found.");
          }

          const updatedItem = { ...shoppingList[itemIndex], ...updates };
          shoppingList[itemIndex] = updatedItem;
          await writeFile(shoppingList);

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(updatedItem));
        } catch (error) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Failed to update the item.");
        }
      });
    }

    // Handle DELETE request
    else if (method === "DELETE") {
      const id = parseInt(url.split("/").pop()); // Extract ID from URL
      try {
        const shoppingList = await readFile();
        const filteredList = shoppingList.filter((item) => item.id !== id);

        if (shoppingList.length === filteredList.length) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          return res.end("Item not found.");
        }

        await writeFile(filteredList);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Item deleted successfully.");
      } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Failed to delete the item.");
      }
    }

    // Handle unsupported methods
    else {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("Method Not Allowed.");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found.");
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
