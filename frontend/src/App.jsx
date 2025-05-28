import { useState } from "react";
import SeatGrid from "./components/SeatGrid";
import BookingPopup from "./components/BookingPopup";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [bookedSeatsForPopup, setBookedSeatsForPopup] = useState([]);

  const handleBookingSuccess = (confirmedSeats) => {
    setBookedSeatsForPopup(confirmedSeats);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setBookedSeatsForPopup([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8">
      <SeatGrid onBookingSuccess={handleBookingSuccess} />
      {showPopup && (
        <BookingPopup
          bookedSeats={bookedSeatsForPopup}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default App;
