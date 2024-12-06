import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { getTickets, createTicket } from "../services/apiService";
import "../styles/OperationStaffDashboard.css";

const OperationStaffDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [tasks, setTasks] = useState([{ id: 1, collapsed: false, services: [] }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getTickets();
      setTickets(data);
    } catch (err) {
      setError("Failed to fetch tickets");
      console.error("Fetch Tickets Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      collapsed: false,
      services: [],
      clientName: "",
      clientPhone: "",
      serviceName: "",
      servicePrice: "",
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCollapse = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, collapsed: !task.collapsed } : task
      )
    );
  };

  const handleAddService = (id, serviceName, servicePrice) => {
    if (!serviceName || !servicePrice) {
      alert("Both service name and price are required.");
      return;
    }
    const newService = { name: serviceName, price: parseFloat(servicePrice) };
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, services: [...task.services, newService], serviceName: "", servicePrice: "" }
          : task
      )
    );
  };

  const handleRemoveService = (taskId, index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, services: task.services.filter((_, i) => i !== index) }
          : task
      )
    );
  };

  const calculateTotalPrice = (services) => {
    return services.reduce((total, service) => total + service.price, 0).toFixed(2);
  };

  const handleCreateTicket = async (task) => {
    setError("");
    setMessage("");

    if (task.services.length === 0) {
      setError("You must add at least one service.");
      return;
    }

    try {
      const ticketData = {
        client_name: task.clientName || null,
        client_phone: task.clientPhone || null,
        services: task.services,
      };
      await createTicket(ticketData);
      setMessage(`Ticket created successfully for Task ${task.id}`);
      fetchTickets();
    } catch (err) {
      setError("Failed to create ticket");
      console.error("Create Ticket Error:", err.response?.data || err.message || err);
    }
  };

  const renderTickets = () => {
    if (loading) return <p>Loading tickets...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (tickets.length === 0) return <p>No tickets found</p>;

    return tickets.map((ticket) => (
      <div key={ticket.ticket_id} className="ticket-card">
        <h4>{ticket.service_details}</h4>
        <p>Total Price: ₦{ticket.price}</p>
        <p>Status: {ticket.status}</p>
      </div>
    ));
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Operation Staff Dashboard</h2>

        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <h4>Task {task.id}</h4>
              {!task.collapsed ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateTicket(task);
                  }}
                >
                  <div className="form-group-container">
                    <div className="form-group-left">
                      <div className="form-group">
                        <label>Client Name (Optional)</label>
                        <input
                          type="text"
                          placeholder="Enter Client Name"
                          value={task.clientName}
                          onChange={(e) =>
                            setTasks((prevTasks) =>
                              prevTasks.map((t) =>
                                t.id === task.id ? { ...t, clientName: e.target.value } : t
                              )
                            )
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="text"
                          placeholder="Enter Phone Number"
                          value={task.clientPhone}
                          onChange={(e) =>
                            setTasks((prevTasks) =>
                              prevTasks.map((t) =>
                                t.id === task.id ? { ...t, clientPhone: e.target.value } : t
                              )
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group-right">
                      <div className="form-group">
                        <label>Service Name</label>
                        <input
                          type="text"
                          placeholder="Enter Service Name"
                          value={task.serviceName || ""}
                          onChange={(e) =>
                            setTasks((prevTasks) =>
                              prevTasks.map((t) =>
                                t.id === task.id ? { ...t, serviceName: e.target.value } : t
                              )
                            )
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>Service Price</label>
                        <input
                          type="number"
                          placeholder="Enter Service Price"
                          value={task.servicePrice || ""}
                          onChange={(e) =>
                            setTasks((prevTasks) =>
                              prevTasks.map((t) =>
                                t.id === task.id ? { ...t, servicePrice: e.target.value } : t
                              )
                            )
                          }
                        />
                      </div>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() =>
                          handleAddService(task.id, task.serviceName, task.servicePrice)
                        }
                      >
                        Add Service
                      </button>
                    </div>
                  </div>

                  <ul>
                    {task.services.map((service, index) => (
                      <li key={index}>
                        {service.name} - ₦{service.price}{" "}
                        <button
                          type="button"
                          onClick={() => handleRemoveService(task.id, index)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p>Total Price: ₦{calculateTotalPrice(task.services)}</p>

                  <div className="task-actions">
                    <button type="submit" className="btn-primary">
                      Create Ticket
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => toggleCollapse(task.id)}
                    >
                      Minimize
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => removeTask(task.id)}
                    >
                      Remove Task
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => toggleCollapse(task.id)}
                >
                  Expand Task
                </button>
              )}
            </div>
          ))}
          <button className="btn-primary" onClick={addTask}>
            Add Task
          </button>
        </div>

        <div className="tickets-list">
          <h3>Existing Tickets</h3>
          {renderTickets()}
        </div>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default OperationStaffDashboard;
