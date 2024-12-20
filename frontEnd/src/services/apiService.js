import axios from "axios"; // Importing axios to simplify HTTP requests.
import API_URL from "../config"; // Importing the base URL from the config file to ensure centralized API management.

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: API_URL, // Set the base URL for all API requests to point to your backend.
});

// Attach Authorization token to every request if available
api.interceptors.request.use((config) => {
  // Retrieve the authentication token from localStorage.
  const token = localStorage.getItem("authToken");
  if (token) {
    // If a token exists, add it to the Authorization header of every request.
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config; // Return the modified config object for the request.
});

// Login Function
export const loginUser = (email, password) =>
  // Sends a POST request to the /auth/login endpoint with the user's email and password.
  api.post("/auth/login", { email, password });

// Export the axios instance
export default api; // Exporting the pre-configured axios instance for use in other parts of the application.
