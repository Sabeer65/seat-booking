import { useState, useEffect } from "react";
import axios from "axios";
import Seat from "./Seat";
import SeatIcon from "../SeatIcon";

const API_URL = "http://localhost:5001/api/seats";

const SeatGrid = ({ onBookingSuccess }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setSeats(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching seats:", err);
      setError("Failed to load seats. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSeat = (seatId, seatNum) => {
    const seat = seats.find((s) => s._id === seatId);
    if (seat && seat.isBooked) return;

    setSelectedSeatIds((prevSelected) =>
      prevSelected.includes(seatId)
        ? prevSelected.filter((id) => id !== seatId)
        : [...prevSelected, seatId]
    );
    setSelectedSeatNumbers((prevSelectedNums) =>
      prevSelectedNums.includes(seatNum)
        ? prevSelectedNums.filter((num) => num !== seatNum)
        : [...prevSelectedNums, seatNum]
    );
  };

  const handleBookSeats = async () => {
    if (selectedSeatIds.length === 0) {
      alert("Please select at least one seat to book.");
      return;
    }
    setError("");
    try {
      const response = await axios.post(`${API_URL}/book`, {
        seatIds: selectedSeatIds,
      });
      alert(
        `Seats booked successfully: ${response.data.bookedSeats.join(", ")}`
      );
      onBookingSuccess(response.data.bookedSeats);
      fetchSeats();
      setSelectedSeatIds([]);
      setSelectedSeatNumbers([]);
    } catch (err) {
      console.error(
        "Error booking seats:",
        err.response ? err.response.data : err.message
      );
      const errorMsg =
        err.response?.data?.msg ||
        "Failed to book seats. Some seats might have been booked by others. Please refresh.";
      setError(errorMsg);
      alert(`Error: ${errorMsg}`);
      fetchSeats();
      setSelectedSeatIds([]);
      setSelectedSeatNumbers([]);
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading seats...</p>;
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-8">Book Your Seats</h1>

      {error && (
        <p className="text-red-500 text-center mb-4 bg-red-100 p-3 rounded">
          {error}
        </p>
      )}

      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-1 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
        {seats.map((seat) => (
          <Seat
            key={seat._id}
            seat={seat}
            onSelectSeat={handleSelectSeat}
            isSelected={selectedSeatIds.includes(seat._id)}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        {selectedSeatNumbers.length > 0 && (
          <p className="mb-4 text-lg">
            Selected Seats:{" "}
            <span className="font-semibold">
              {selectedSeatNumbers.join(", ")}
            </span>
          </p>
        )}
        <button
          onClick={handleBookSeats}
          disabled={selectedSeatIds.length === 0}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
        >
          Book Selected Seats ({selectedSeatIds.length})
        </button>
      </div>

      <div className="mt-8 flex justify-center space-x-6 items-center text-sm">
        <div className="flex items-center">
          <SeatIcon className="text-slate-300 mr-2" /> Available
        </div>
        <div className="flex items-center">
          <SeatIcon className="text-green-500 mr-2" /> Selected
        </div>
        <div className="flex items-center">
          <SeatIcon className="text-gray-500 mr-2" /> Booked
        </div>
      </div>
    </div>
  );
};

export default SeatGrid;
