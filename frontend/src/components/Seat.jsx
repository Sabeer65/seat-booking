import SeatIcon from "../SeatIcon";

const Seat = ({ seat, onSelectSeat, isSelected }) => {
  const { seatNumber, isBooked } = seat;

  let seatColorClass = "text-slate-300";
  let cursorClass = "cursor-pointer";
  let hoverClass = "hover:text-green-300";

  if (isBooked) {
    seatColorClass = "text-gray-500";
    cursorClass = "cursor-not-allowed";
    hoverClass = "";
  } else if (isSelected) {
    seatColorClass = "text-green-500";
    hoverClass = "hover:text-green-600";
  }

  const handleClick = () => {
    if (!isBooked) {
      onSelectSeat(seat._id, seatNumber);
    }
  };

  return (
    <div
      className={`p-1 m-1 flex flex-col items-center ${cursorClass} ${seatColorClass} ${hoverClass} transition-colors duration-150`}
      onClick={handleClick}
      title={`Seat ${seatNumber}${
        isBooked ? " (Booked)" : isSelected ? " (Selected)" : " (Available)"
      }`}
    >
      <SeatIcon />
      <span className="text-xs mt-1 text-black dark:text-white">
        {seatNumber}
      </span>
    </div>
  );
};

export default Seat;
