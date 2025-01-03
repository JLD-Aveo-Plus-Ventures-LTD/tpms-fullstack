import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Transactions.css";
import axios from "axios";
import API_URL from "../config";

const Transactions = () => {
  // Helper function to generate random Task IDs (used for frontend-only purposes)
  const generateTaskId = () => Math.random().toString(36).substr(2, 7).toUpperCase();

  // State to manage tasks for creating new tickets
  const [tasks, setTasks] = useState([
    {
      id: 1,
      minimized: false,
      taskId: generateTaskId(),
      client: "",
      phone: "",
      date: new Date().toDateString(),
    },
  ]);

  // State to manage services for a task
  const [services, setServices] = useState([{ name: "", amount: "" }]);

  // State to store tickets fetched from the backend
  const [submittedTasks, setSubmittedTasks] = useState([]);

  // State to manage and display the current time
  const [currentTime, setCurrentTime] = useState("");

  // Effect to update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };

    const interval = setInterval(updateTime, 1000);
    updateTime();

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Fetch submitted tickets from the backend
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Authorization token for API requests
        const response = await axios.get(`${API_URL}/tickets`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubmittedTasks(response.data); // Populate table with fetched tickets
      } catch (err) {
        console.error("Error fetching tickets:", err);
        alert("Failed to fetch tickets. Please try again.");
      }
    };

    fetchTickets();
  }, []);

  // Handle changes in the service table (used to dynamically update service rows)
  const handleServiceChange = (index, field, value) => {
    setServices((prev) => {
      const updatedServices = [...prev];
      updatedServices[index][field] = value;
      return updatedServices;
    });
  };

  // Add a new service row to the service list
  const addServiceRow = () => setServices([...services, { name: "", amount: "" }]);

  // Calculate the total price of services
  const calculateTotal = () =>
    services.reduce((total, service) => total + (parseFloat(service.amount) || 0), 0);

  // Submit transaction to the backend
  const submitTransaction = async (taskId, client, phone) => {
    // Validate inputs
    const filteredServices = services.filter((s) => s.name && s.amount);
    if (!client || !phone || filteredServices.length === 0) {
      alert("All fields are required, including at least one valid service.");
      return;
    }

    // Ensure all amounts are valid numbers
    const isValidAmount = filteredServices.every((service) => !isNaN(parseFloat(service.amount))); // 🆕 Validates that service amounts are numeric
    if (!isValidAmount) {
      alert("Please enter valid numeric values for service amounts."); // 🆕 Alerts user if service amounts are not valid numbers
      return;
    }

    // Log payload before sending
    console.log("Submitting Ticket with Payload:", {
      client_name: client,
      client_phone: phone,
      services: filteredServices.map((s) => ({
        name: s.name,
        price: parseFloat(s.amount), // 🆕 Ensure service amount is sent as a number
      })),
    });

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${API_URL}/tickets`,
        {
          client_name: client,
          client_phone: phone,
          services: filteredServices.map((s) => ({
            name: s.name,
            price: parseFloat(s.amount), // 🆕 Sending properly formatted service data to the backend
          })),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Add the newly created ticket to the submittedTasks table
      const { ticket_code, total_price } = response.data;
      setSubmittedTasks((prev) => [
        ...prev,
        {
          client,
          ticket_code, // Use ticket_code as Task ID
          phone,
          service_details: filteredServices
            .map((s) => `${s.name} (${s.amount})`)
            .join(", "),
          price: total_price,
          status: "Pending",
        },
      ]);

      // Reset services after submission
      setServices([{ name: "", amount: "" }]);
      alert("Ticket created successfully!");
    } catch (err) {
      console.error("Error submitting transaction:", err); // 🆕 Log error details for debugging
      alert("Failed to create ticket. Please try again."); // 🆕 Inform user of failure to submit ticket
    }
  };

  return (
    <div className="transactions-container">
      <Sidebar /> {/* Sidebar for navigation */}
      <div className="transactions-content">
        <header className="header">
          <h6>
            Transaction &gt; <span className="activeStatus"> Task </span>
          </h6>
          <div className="time-display">Time: {currentTime}</div>
        </header>
        <h2>Transactions</h2>

        {/* Render tasks for input */}
        {tasks.map((task) => (
          <div key={task.id} className={`transactions ${task.minimized ? "collapsed" : "expanded"}`}>
            <h5>{`Task ${task.id}`}</h5>
            {!task.minimized && (
              <form>
                <div className="form-group-container">
                  <div className="form-group-left">
                    <div className="form-group">
                      <label>Client's Name</label>
                      <input
                        type="text"
                        placeholder="Enter Client Name"
                        onChange={(e) =>
                          setTasks((prev) =>
                            prev.map((t) =>
                              t.id === task.id ? { ...t, client: e.target.value } : t
                            )
                          )
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Task ID</label>
                      <p>{task.taskId}</p>
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        placeholder="Enter Client's Phone Number"
                        onChange={(e) =>
                          setTasks((prev) =>
                            prev.map((t) =>
                              t.id === task.id ? { ...t, phone: e.target.value } : t
                            )
                          )
                        }
                      />
                    </div>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() =>
                        submitTransaction(task.taskId, task.client, task.phone)
                      }
                    >
                      Send
                    </button>
                  </div>

                  <div className="form-group-right">
                    <table>
                      <thead>
                        <tr>
                          <th>Service</th>
                          <th>Amount (₦)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.map((service, index) => (
                          <tr key={`${task.taskId}-${index}`}>
                            <td>
                              <input
                                type="text"
                                value={service.name}
                                placeholder="Enter Service"
                                onChange={(e) =>
                                  handleServiceChange(index, "name", e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                value={service.amount}
                                placeholder="Enter Amount"
                                onChange={(e) =>
                                  handleServiceChange(index, "amount", e.target.value)
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="service-total-container">
                      <button type="button" onClick={addServiceRow} className="btn-important">
                        Add Service
                      </button>
                      <p>Total (₦): <span className="total-amount">{calculateTotal()}</span></p>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        ))}
        <button className="btn-primary addTask" onClick={() => setTasks((prev) => [...prev, { id: prev.length + 1 }])}>
          Add Task
        </button>

        {/* Render Submitted Tasks */}
        <div>
          <h3>Submitted Tasks</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Task ID</th>
                <th>Phone</th>
                <th>Services</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {submittedTasks.map((submittedTask, index) => (
                <tr key={index}>
                  <td>{submittedTask.client_name || "N/A"}</td>
                  <td>{submittedTask.ticket_code || "N/A"}</td>
                  <td>{submittedTask.client_phone || "N/A"}</td>
                  <td>{submittedTask.service_details || "N/A"}</td>
                  <td>{submittedTask.price ? `₦${submittedTask.price}` : "N/A"}</td>
                  <td>{submittedTask.status || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
