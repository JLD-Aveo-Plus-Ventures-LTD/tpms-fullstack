import React, { useState } from "react";
import { addServiceToTicket } from "../services/apiService";

const TicketCard = ({ ticket, onUpdate }) => {
  const [newService, setNewService] = useState("");

  const handleAddService = async () => {
    if (!newService.trim()) return;
    try {
      await addServiceToTicket(ticket.ticket_id, newService);
      onUpdate(); // Refresh ticket list after service addition
      setNewService("");
    } catch (err) {
      console.error("Failed to add service", err);
    }
  };

  return React.createElement(
    "div",
    { className: "ticket-card" },
    React.createElement("h4", null, ticket.service_details),
    React.createElement("p", null, `Status: ${ticket.status}`),
    React.createElement("p", null, `Price: $${ticket.price}`),
    React.createElement(
      "div",
      null,
      React.createElement("input", {
        type: "text",
        placeholder: "Add a service",
        value: newService,
        onChange: (e) => setNewService(e.target.value),
      }),
      React.createElement(
        "button",
        { onClick: handleAddService },
        "Add Service"
      )
    )
  );
};

export default TicketCard;
