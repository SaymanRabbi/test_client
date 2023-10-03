// import event from './components/event'

// function App() {

//   return (
//     <>
//       <h1>Hello From Front end</h1>
//       <div className="container">
//         <div className="form">
//           <form action="">
//             <input type="text" />
//             <input type="date" />
//             <input type="text" />
//             <button type="submit" className="button">
//               Submit
//             </button>
//           </form>
//         </div>
//         <div className="result">
//           <event></event>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App


// src/components/EventBookingForm.js

import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [dateArray, setDateArray] = useState([] as any)
  // not best practice to use this
  const [count, setCount] = useState(0);
  // not best practice to use this
  console.log(dateArray,"dateArray");
  useEffect(() => {
    async function getAllData() {
    try {
      const response = await axios("http://localhost:4000/api/events/allEvents");
      setDateArray(response.data.eventDates)
    } catch (error) {
      
    }
   }
   getAllData();
  },[ count])
  const handleEventNameChange = (e: any) => {
    setEventName(e.target.value);
  };

  const handleEventDateChange = (e: any) => {
    setEventDate(e.target.value);
  };

  const handleEventVenueChange = (e: any) => {
    setEventVenue(e.target.value);
  };

  const handleBookingSubmit = async (e: any) => {
    console.log('Hello World');
    e.preventDefault();
    const newEvent = { title:eventName, date:eventDate, venue:eventVenue };

    try {
      const response = await axios.post("http://localhost:4000/api/events/create", newEvent);
      if(response.status===201){
        console.log("Event booked successfully");
        setCount(count+1)
      }
      // if (response.ok) {
      //   console.log("Event booked successfully");
      //   // You can clear the form or show a success message here
      // } else {
      //   console.error("Failed to book the event");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Event Booking Form</h2>
      <form onSubmit={handleBookingSubmit}>
        <div>
          <label>Event Name:</label>
          <input type="text" value={eventName} onChange={handleEventNameChange} />
        </div>
        <div>
          <label>Event Date:</label>
          <input type="date" value={eventDate} onChange={handleEventDateChange} />
        </div>
        <div>
          <label>Event Venue:</label>
          <input type="text" value={eventVenue} onChange={handleEventVenueChange} />
        </div>
        <button type="submit">Book Event</button>
      </form>
      <div>
         {
            dateArray?.map((item: any) => {
              return (
                <div>
                  <h1>{item}</h1>
                </div>
              )
            })
         }
      </div>
    </div>
  );
}

export default App;
