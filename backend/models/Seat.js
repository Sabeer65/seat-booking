import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    required: true,
    unique: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const Seat = mongoose.model("Seat", seatSchema);

export default Seat;
