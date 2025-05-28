import Seat from "../models/Seat.js";

export const seatInitialise = async (req, res) => {
  try {
    await Seat.deleteMany({});
    const seatsToCreate = [];
    const rows = 5;
    const cols = 10;
    for (let r = 1; r <= rows; r++) {
      for (let c = 1; c <= cols; c++) {
        seatsToCreate.push({
          seatNumber: `${String.fromCharCode(64 + r)}${c}`,
        }); // e.g., A1, A2, B1, B2
      }
    }
    await Seat.insertMany(seatsToCreate);
    res.status(201).send({
      message: "Seats initialized successfully",
      count: seatsToCreate.length,
    });
  } catch (error) {
    console.error("Error initializing seats:", error);
    res
      .status(500)
      .send({ message: "Error initializing seats", error: error.message });
  }
};

export const getSeats = async (req, res) => {
  try {
    const seats = await Seat.find().sort({ seatNumber: 1 });
    res.json(seats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching seats", error: error.message });
  }
};

export const seatBook = async (req, res) => {
  const { seatIds } = req.body;

  if (!seatIds || !Array.isArray(seatIds) || seatIds.length === 0) {
    return res
      .status(400)
      .json({ message: "Seat IDs are required and must be an array." });
  }

  try {
    const alreadyBookedSeats = await Seat.find({
      _id: { $in: seatIds },
      isBooked: true,
    });

    if (alreadyBookedSeats.length > 0) {
      const bookedSeatNumbers = alreadyBookedSeats
        .map((s) => s.seatNumber)
        .join(", ");
      return res.status(409).json({
        message: `Cannot book. The following seats are already booked: ${bookedSeatNumbers}. Please refresh and try again.`,
        bookedSeatNumbers: alreadyBookedSeats.map((s) => s.seatNumber),
      });
    }

    const result = await Seat.updateMany(
      { _id: { $in: seatIds }, isBooked: false },
      { $set: { isBooked: true } }
    );

    if (result.modifiedCount === 0 && result.matchedCount > 0) {
      return res
        .status(409)
        .json({ message: "Some seats were already booked. Please refresh." });
    }

    if (result.modifiedCount === 0 && result.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "No matching seats found to book." });
    }

    const bookedSeats = await Seat.find({ _id: { $in: seatIds } });
    res.status(200).json({
      message: "Seats booked successfully!",
      bookedSeats: bookedSeats.map((s) => s.seatNumber),
    });
  } catch (error) {
    console.error("Error booking seats:", error);
    res
      .status(500)
      .json({ message: "Error booking seats", error: error.message });
  }
};
