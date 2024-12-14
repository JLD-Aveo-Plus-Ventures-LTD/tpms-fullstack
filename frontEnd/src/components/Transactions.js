import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Transactions.css";

const Transactions = () => {
  // Helper function to generate random Task IDs
  const generateTaskId = () => {
    return Math.random().toString(36).substr(2, 7).toUpperCase();
  };

  const [tasks, setTasks] = useState([
    {
      id: 1,
      minimized: false,
      taskId: generateTaskId(),
      client: "",
      phone: "",
      date: new Date().toDateString(),
    },
  ]); // Array to store multiple tasks

  const [services, setServices] = useState([{ name: "", amount: "" }]);
  const [currentTime, setCurrentTime] = useState("");
  const [submittedTasks, setSubmittedTasks] = useState([]); // State for submitted tasks

  // Update time every second
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

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  // Format date for each task
  const formatDate = () => {
    const now = new Date();
    const options = {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return now.toLocaleDateString(undefined, options);
  };

  // Handle changes in the service table
  const handleServiceChange = (index, field, value) => {
    setServices((prevServices) => {
      const updatedServices = [...prevServices];
      updatedServices[index][field] = value;
      return updatedServices;
    });
  };

  // Add a new service row
  const addServiceRow = () => {
    setServices([...services, { name: "", amount: "" }]);
  };

  // Calculate the total amount
  const calculateTotal = () => {
    return services.reduce(
      (total, service) => total + (parseFloat(service.amount) || 0),
      0
    );
  };

  // Add a new task
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
        date: formatDate(),
      },
    ]);
    setServices([{ name: "", amount: "" }]);
  };

  // Remove a task
  const removeTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
  };

  // Minimize or expand a task
  const toggleMinimize = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, minimized: !task.minimized } : task
      )
    );
  };

  // Submit the transaction
  const submitTransaction = (taskId, client, phone) => {
    const totalAmount = calculateTotal();
    const servicesSummary = services
      .filter((service) => service.name && service.amount)
      .map((service) => `${service.name} (${service.amount})`)
      .join(", ");

    if (!client || !phone || !servicesSummary || totalAmount <= 0) {
      alert("Please fill in all fields and add at least one valid service.");
      return;
    }

    const newSubmittedTask = {
      client,
      taskId,
      phone,
      services: servicesSummary,
      amount: totalAmount,
      status: "Pending", //Ensure to target this to show status of transactions.
    };

    setSubmittedTasks((prevSubmittedTasks) => [
      ...prevSubmittedTasks,
      newSubmittedTask,
    ]);
    setServices([{ name: "", amount: "" }]);
  };

  return (
    <div className="transactions-container">
      <Sidebar />
      <div className="transactions-content">
        {/* Header Section */}
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
        {tasks.map((task, index) => (
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
                  {/* Left Section */}
                  <div className="form-group-left">
                    <div className="form-group">
                      <label>Client's Name</label>
                      <input
                        type="text"
                        placeholder="Enter Client Name"
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
                      onClick={() =>
                        submitTransaction(task.taskId, task.client, task.phone)
                      }
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

                  {/* Right Section */}
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

        {/* Render Submitted Tasks Table */}
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
              {submittedTasks.map((submittedTask, index) => (
                <tr key={index}>
                  <td>{submittedTask.client}</td>
                  <td>{submittedTask.taskId}</td>
                  <td>{submittedTask.phone}</td>
                  <td>{submittedTask.services}</td>
                  <td>{submittedTask.amount}</td>
                  <td>{submittedTask.status}</td>
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
