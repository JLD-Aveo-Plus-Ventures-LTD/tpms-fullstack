import React, { createContext, useContext, useState } from "react";

const TransactionsContext = createContext();

export const useTransactions = () => useContext(TransactionsContext);

export const TransactionsProvider = ({ children }) => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [approvedTasks, setApprovedTasks] = useState([]);
  const [suspendedTasks, setSuspendedTasks] = useState([]);
  const [queriedTasks, setQueriedTasks] = useState([]);

  const handleProcess = (taskId, status) => {
    setPendingTasks((prev) =>
      prev.filter((task) => {
        if (task.taskId === taskId) {
          const updatedTask = { ...task, status };
          if (status === "Approved") {
            setApprovedTasks((prev) => [...prev, updatedTask]);
          } else if (status === "Suspended") {
            setSuspendedTasks((prev) => [...prev, updatedTask]);
          } else if (status === "Queried") {
            setQueriedTasks((prev) => [...prev, updatedTask]);
          }
          return false; // Remove the task with this taskId from pending tasks
        }
        return true; // Retain all other tasks
      })
    );
  };

  return (
    <TransactionsContext.Provider
      value={{
        pendingTasks,
        approvedTasks,
        suspendedTasks,
        queriedTasks,
        setPendingTasks,
        handleProcess,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
