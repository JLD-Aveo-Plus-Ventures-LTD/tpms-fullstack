import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create an axios instance with a base URL
const api = axios.create({ baseURL: API_URL });

// Attach Authorization token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  console.log('Auth Token Sent:', token); // Debugging token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Authentication APIs ---
export const loginUser = (username, password) =>
  api.post('/auth/login', { username, password });

export const getUsers = () =>
  api.get('/auth/users')
    .then((res) => res.data)
    .catch((err) => {
      console.error('Error in getUsers API Call:', err.response?.data || err.message);
      throw err;
    });

export const createUser = (data) =>
  api.post('/auth/register', data);

export const updateUserRole = (userId, role) =>
  api.put('/auth/users/role', { user_id: userId, role });

export const deleteUser = (userId) =>
  api.delete(`/auth/users/${userId}`);

// --- Ticket Management APIs ---
export const createTicket = (ticketData) =>
  api.post('/tickets', ticketData)
    .then((res) => res.data)
    .catch((err) => {
      console.error('Error creating ticket:', err.response?.data || err.message);
      throw err;
    });

    export const getTickets = (filter = "") =>
      api
        .get(`/tickets${filter ? `?status=${filter}` : ""}`) // Properly append query parameters
        .then((response) => response.data)
        .catch((err) => {
          console.error("Error fetching tickets:", err.response?.data || err.message);
          throw err;
        });
    

export const updateTicketStatus = (ticketId, status) =>
  api.put('/tickets/status', { ticket_id: ticketId, status })
    .then((res) => res.data)
    .catch((err) => {
      console.error('Error updating ticket status:', err.response?.data || err.message);
      throw err;
    });

// --- Payment Management APIs ---
export const createPayment = (paymentData) =>
  api.post('/payments', paymentData);

export const getPayments = () =>
  api.get('/payments');

// --- Admin Ticket Management ---
export const getTicketsForAdmin = () =>
  api.get('/tickets/admin')
    .then((res) => {
      console.log('Admin Tickets Response:', res.data); // Debugging response
      return res.data;
    })
    .catch((err) => {
      console.error('Error fetching tickets for admin:', err.response?.data || err.message); // Debugging error
      throw err;
    });

export const updateTicketStatusForAdmin = (ticket_id, status) =>
  api.put('/tickets/admin/status', { ticket_id, status })
    .then((res) => res.data)
    .catch((err) => {
      console.error('Error updating ticket status for admin:', err.response?.data || err.message);
      throw err;
    });

// --- Services Management ---
export const addServiceToTicket = (ticketId, serviceName) =>
  api.post('/tickets/service', { ticket_id: ticketId, service_name: serviceName })
    .then((res) => res.data)
    .catch((err) => {
      console.error('Error adding service to ticket:', err.response || err);
      throw err;
    });

export const getServicesForTicket = (ticketId) =>
  api.get(`/tickets/${ticketId}/services`)
    .then((res) => res.data)
    .catch((err) => {
      console.error('Error fetching services for ticket:', err.response || err);
      throw err;
    });
