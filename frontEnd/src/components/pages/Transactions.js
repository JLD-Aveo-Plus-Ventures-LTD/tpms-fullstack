import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../stylings/Transactions.css";
import { useTransactions } from "./TransactionsContext";

const Transactions = () => {
  const generateTaskId = () =>
    Math.random().toString(36).substr(2, 7).toUpperCase();
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
  const [services, setServices] = useState([{ name: "", amount: "" }]);
  const [currentTime, setCurrentTime] = useState("");
  const { pendingTasks, setPendingTasks } = useTransactions();

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

    return () => clearInterval(interval);
  }, []);

  const calculateTotal = () =>
    services.reduce(
      (total, service) => total + (parseFloat(service.amount) || 0),
      0
    );

  const submitTransaction = (client, phone) => {
    const totalAmount = calculateTotal();
    const servicesSummary = services
      .filter((service) => service.name)
      .map((service) => service.name)
      .join(", ");

    if (!client.trim()) {
      alert("Client name cannot be empty.");
      return;
    }
    if (!phone.trim() || isNaN(phone) || phone.length < 10) {
      alert("Enter a valid phone number.");
      return;
    }
    if (!servicesSummary) {
      alert("Please add at least one valid service.");
      return;
    }
    if (totalAmount <= 0) {
      alert("Total amount must be greater than zero.");
      return;
    }

    const currentTask = tasks[0]; // Use the current task ID from the first card

    const newPendingTask = {
      client,
      taskId: currentTask.taskId, // Use the current task ID
      phone,
      services: servicesSummary,
      amount: totalAmount,
      status: "Pending",
    };

    // Add the task to the pendingTasks table
    setPendingTasks([...pendingTasks, newPendingTask]);

    // Reset the current task with a new ID and clear the form
    setTasks((prevTasks) => [
      {
        ...prevTasks[0],
        taskId: generateTaskId(), // Generate a new task ID
        client: "",
        phone: "",
      },
    ]);

    // Reset services for the new task
    setServices([{ name: "", amount: "" }]);
  };

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

        {/* Render Pending Tasks Table */}
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
