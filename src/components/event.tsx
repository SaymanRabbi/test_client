// src/components/EventDataDisplay.js

import { useEffect, useState } from "react";

function EventDataDisplay() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/events/allEvents");
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    // You can set up a WebSocket or use another real-time mechanism to
    // trigger a data refresh when a new event is added to the database.
    // Here, I'll use a simple polling approach.
    const interval = setInterval(fetchEvents, 1000); // Fetch data every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Event Data</h2>
      <div>
        {events.map((event) => (
          <div key={event?._id}>
            <h3>{event?.title}</h3>
            <p>Date: {event?.date}</p>
            <p>Venue: {event?.venue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventDataDisplay;
