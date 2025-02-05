import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../stylings/Transactions.css";
import axios from "axios"; // Import axios for making HTTP requests
import API_URL from "../../config"; // Import the API URL from your config file

const Transactions = () => {
  // Helper function to generate random Task IDs (used for frontend-only purposes)
  const generateTaskId = () =>
    Math.random().toString(36).substr(2, 7).toUpperCase();

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

  // State to store pending tasks fetched from the backend
  const [pendingTasks, setPendingTasks] = useState([]);

  // State to manage and display the current time
  const [currentTime, setCurrentTime] = useState("");

  // Fetch pending tasks from the backend when the component mounts
  useEffect(() => {
    const fetchPendingTasks = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Get the authentication token
        const response = await axios.get(`${API_URL}/tickets`, {
          headers: { Authorization: `Bearer ${token}` }, // Include the token in the request headers
        });

        // Map the backend response to the frontend's expected structure
        const formattedTasks = response.data.map((task) => ({
          client: task.client_name || "N/A", // Map client_name to client
          taskId: task.ticket_code || "N/A", // Map ticket_code to taskId
          phone: task.client_phone || "N/A", // Map client_phone to phone
          services: task.service_details || "N/A", // Map service_details to services
          amount: task.price ? `₦${task.price}` : "N/A", // Format price as currency
          status: task.status || "N/A", // Keep status as is
        }));

        setPendingTasks(formattedTasks); // Update the state with formatted tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
        alert("Failed to fetch tasks. Please try again.");
      }
    };

    fetchPendingTasks();
  }, []);

  // Effect to update the current time every second
  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(formattedTime);
    };

    const interval = setInterval(updateCurrentTime, 1000);
    updateCurrentTime();

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Calculate the total price of services
  const calculateTotal = () =>
    services.reduce(
      (total, service) => total + (parseFloat(service.amount) || 0),
      0
    );

  // Submit transaction to the backend
  const submitTransaction = async (client, phone) => {
    const totalAmount = calculateTotal();
    const filteredServices = services.filter(
      (service) => service.name && service.amount
    );

    // Input validation
    if (!client.trim()) {
      alert("Client name cannot be empty.");
      return;
    }
    if (!phone.trim() || isNaN(phone) || phone.length < 10) {
      alert("Enter a valid phone number.");
      return;
    }
    if (filteredServices.length === 0) {
      alert("Please add at least one valid service.");
      return;
    }
    if (totalAmount <= 0) {
      alert("Total amount must be greater than zero.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken"); // Get the authentication token
      const response = await axios.post(
        `${API_URL}/tickets`,
        {
          client_name: client,
          client_phone: phone,
          services: filteredServices.map((service) => ({
            name: service.name,
            price: parseFloat(service.amount), // Ensure the amount is a number
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );

      // Update the local state with the response from the backend
      const newTask = {
        client: client,
        taskId: response.data.ticket_code, // Use the ticket_code from the backend
        phone: phone,
        services: filteredServices.map((s) => s.name).join(", "), // Join services for display
        amount: response.data.total_price, // Use the total_price from the backend
        status: "Pending",
      };

      setPendingTasks([...pendingTasks, newTask]); // Add the new task to the pending tasks list

      // Reset the form for the next task
      setTasks((prevTasks) => [
        {
          ...prevTasks[0],
          taskId: generateTaskId(),
          client: "",
          phone: "",
        },
      ]);

      setServices([{ name: "", amount: "" }]); // Reset services
      alert("Transaction submitted successfully!");
    } catch (error) {
      console.error("Error submitting transaction:", error);
      alert("Failed to submit transaction. Please try again.");
    }
  };

  // Keep all your existing UI-related functions and state management
  const toggleMinimize = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, minimized: !task.minimized } : task
      )
    );
  };

  const handleServiceChange = (index, field, value) => {
    setServices((prevServices) => {
      const updatedServices = [...prevServices];
      updatedServices[index][field] = value;
      return updatedServices;
    });
  };

  const addServiceRow = () => {
    setServices([...services, { name: "", amount: "" }]);
  };

  const removeTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
  };

  const addTask = () => {
    const newTaskId = generateTaskId();
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: prevTasks.length + 1,
        minimized: false,
        taskId: newTaskId,
        client: "",
        phone: "",
        date: new Date().toDateString(),
      },
    ]);
    setServices([{ name: "", amount: "" }]);
  };

  // Render the UI (no changes here except for the pendingTasks table)
  return (
    <div className="transactions-container">
      <Sidebar />
      <div className="transactions-content">
        <header className="header">
          <h6>
            Transaction &gt; <span className="activeStatus"> Task </span>
          </h6>
          <div className="time-display">
            <span>Time:</span>
            {currentTime}
          </div>
          <div className="notification-bell">
            <i className="fas fa-bell"></i>
          </div>
        </header>
        <h2>Transactions</h2>

        {/* Render Multiple Tasks */}
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`transactions ${
              task.minimized ? "collapsed" : "expanded"
            }`}
          >
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
                        value={task.client}
                        onChange={(e) =>
                          setTasks((prevTasks) =>
                            prevTasks.map((t) =>
                              t.id === task.id
                                ? { ...t, client: e.target.value }
                                : t
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
                        value={task.phone}
                        onChange={(e) =>
                          setTasks((prevTasks) =>
                            prevTasks.map((t) =>
                              t.id === task.id
                                ? { ...t, phone: e.target.value }
                                : t
                            )
                          )
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Date</label>
                      <p>{task.date}</p>
                    </div>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => submitTransaction(task.client, task.phone)}
                    >
                      Send
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => toggleMinimize(task.id)}
                    >
                      Minimize
                    </button>
                    <button type="button" className="btn-secondary">
                      Cancel
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
                                onChange={(e) =>
                                  handleServiceChange(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter Service"
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                value={service.amount}
                                onChange={(e) =>
                                  handleServiceChange(
                                    index,
                                    "amount",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter Amount"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="service-total-container">
                      <button
                        type="button"
                        onClick={addServiceRow}
                        className="btn-important"
                      >
                        Add Service
                      </button>
                      <p>
                        Total (₦):
                        <span className="total-amount">{calculateTotal()}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            )}
            {task.minimized && (
              <button
                className="btn-secondary"
                onClick={() => toggleMinimize(task.id)}
              >
                Expand
              </button>
            )}
            {tasks.length > 1 && (
              <button
                className="btn-danger removeTask"
                onClick={() => removeTask(task.taskId)}
              >
                Remove Task
              </button>
            )}
          </div>
        ))}
        <button className="btn-primary addTask" onClick={addTask}>
          Add Task
        </button>

        {/* Display pending tasks fetched from the backend */}
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Task ID</th>
                <th>Phone Number</th>
                <th>Services</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingTasks.map((pendingTask, index) => (
                <tr key={index}>
                  <td>{pendingTask.client}</td>
                  <td>{pendingTask.taskId}</td>
                  <td>{pendingTask.phone}</td>
                  <td>{pendingTask.services}</td>
                  <td>{pendingTask.amount}</td>
                  <td>{pendingTask.status}</td>
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