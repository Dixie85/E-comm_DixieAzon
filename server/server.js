import app from "./app.js";

// Server port
const HTTP_PORT = 8000;

// Start server
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
});

