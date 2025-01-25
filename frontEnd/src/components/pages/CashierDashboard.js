/* import React, { useState, useEffect } from "react";
import CashierSideBar from "./CashierSideBar";
import "../stylings/Transactions.css";
import CashierMenu from "./CashierMenu";
import "../stylings/CashierDashboard.css";
import { useTransactions } from "./TransactionsContext";
const CashierDashboard = () => {
  const { submittedTasks, setSubmittedTasks } = useTransactions();
  const [currentTime, setCurrentTime] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

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

  useEffect(() => {
    const currentTab = window.location.pathname.split("/")[1];
    switch (currentTab) {
      case "CashierApproved":
        setFilteredTransactions(
          submittedTasks.filter((task) => task.status === "Approved")
        );
        break;
      case "CashierSuspended":
        setFilteredTransactions(
          submittedTasks.filter((task) => task.status === "Suspended")
        );
        break;
      case "CashierQueried":
        setFilteredTransactions(
          submittedTasks.filter((task) => task.status === "Queried")
        );
        break;
      default:
        setFilteredTransactions(
          submittedTasks.filter((task) => task.status === "Pending")
        );
        break;
    }
  }, [submittedTasks]);

  const handleProcess = (transaction, action) => {
    setSubmittedTasks((prev) =>
      prev.map((task) =>
        task.taskId === transaction.taskId ? { ...task, status: action } : task
      )
    );
  };

  return (
    <div className="transactions-container">
      <CashierSideBar />
      <div className="transactions-content">
        <header className="header">
          <h6>
            Transaction &gt;{" "}
            <span className="activeStatus">
              {window.location.pathname.split("/")[1].replace("Cashier", "")}
            </span>
          </h6>

          <div className="time-display">
            <span>Time:</span>
            {currentTime}
          </div>
          <div className="notification-bell">
            <i className="fas fa-bell"></i>
          </div>
        </header>
        <h2>Tasks</h2> */

{
  /* Search Bar */
}
{
  /* <div className="search-bar">
          <input type="text" placeholder="Enter name or task ID" />
          <i className="fas fa-search"></i>
        </div> */
}

{
  /* Tabs */
}
{
  /* <CashierMenu /> */
}

{
  /* Transactions Table */
}
{
  /* <div className="transactions-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Task ID</th>
                <th>Phone Number</th>
                <th>Services</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.client}</td>
                  <td>{transaction.taskId}</td>
                  <td>{transaction.phone}</td>
                  <td>{transaction.services}</td>
                  <td>{transaction.amount}</td>
                  <td>
                    {window.location.pathname.includes("CashierIncoming") && (
                      <>
                        <button
                          className="btn-primary"
                          onClick={() => handleProcess(transaction, "Approved")}
                        >
                          Approve
                        </button>

                        <button
                          className="btn-warning"
                          onClick={() =>
                            handleProcess(transaction, "Suspended")
                          }
                        >
                          Suspend
                        </button>

                        <button
                          className="btn-danger"
                          onClick={() => handleProcess(transaction, "Queried")}
                        >
                          Query
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */
}

{
  /* Pagination */
}
{
  /*  <div className="pagination">
          <button>&laquo;</button>
          <button className="active-page">1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>...</button>
          <button>10</button>
          <button>&raquo;</button>
        </div>
      </div>
    </div>
  );
};

export default CashierDashboard; */
}
