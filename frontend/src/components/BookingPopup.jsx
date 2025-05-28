const BookingPopup = ({ bookedSeats, onClose }) => {
  if (!bookedSeats || bookedSeats.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
          Booking Succesful!
        </h2>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          You have booked the following seats:
        </p>
        <p className="mb-6 font-semibold text-lg text-gray-800 dark:text-gray-100">
          {bookedSeats.join(", ")}
        </p>
        <button
          onClick={onClose}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-150"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingPopup;
