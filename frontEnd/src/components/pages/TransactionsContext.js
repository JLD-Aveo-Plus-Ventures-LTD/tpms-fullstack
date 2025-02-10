import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../config";

const TransactionsContext = createContext();

export const useTransactions = () => useContext(TransactionsContext);

export const TransactionsProvider = ({ children }) => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [approvedTasks, setApprovedTasks] = useState([]);
  const [suspendedTasks, setSuspendedTasks] = useState([]);
  const [queriedTasks, setQueriedTasks] = useState([]);

  const isAuthenticated = !!localStorage.getItem("authToken");

  useEffect(() => {
    if (!isAuthenticated || window.location.pathname === "/") {
      return;
    }

    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${API_URL}/tickets`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Raw API Response:", response.data); // Debugging: Check what API returns

        const formattedTasks = response.data.map((task) => {
          console.log("Processing Task:", task); // Debugging: Check individual tasks
          return {
            client: task.client_name || "Unknown Client",
            taskId: task.ticket_code || "No Task ID",
            phone: task.client_phone || "No Phone",
            services: task.service_details || "No Services",
            amount: task.price ? `₦${task.price}` : "No Amount",
            status: task.status || "Unknown",
          };
        });

        console.log("Formatted Tasks:", formattedTasks); // Debugging: Check final structure

        setPendingTasks(formattedTasks.filter((t) => t.status === "Pending"));
        setApprovedTasks(formattedTasks.filter((t) => t.status === "Completed"));
        setSuspendedTasks(formattedTasks.filter((t) => t.status === "Suspended"));
        setQueriedTasks(formattedTasks.filter((t) => t.status === "Queried"));

      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [isAuthenticated]);

  return (
    <TransactionsContext.Provider
      value={{
        pendingTasks,
        approvedTasks,
        suspendedTasks,
        queriedTasks,
        setPendingTasks,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
