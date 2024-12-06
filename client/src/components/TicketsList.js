import React from "react";
import TicketCard from "./TicketCard";

const TicketsList = ({ tickets, onUpdate, loading }) => {
  if (loading) {
    return React.createElement("p", null, "Loading tickets...");
  }

  return React.createElement(
    "div",
    { className: "tickets-list" },
    React.createElement("h3", null, "Your Tickets"),
    tickets.map((ticket) =>
      React.createElement(TicketCard, {
        key: ticket.ticket_id,
        ticket,
        onUpdate,
      })
    )
  );
};

export default TicketsList;
