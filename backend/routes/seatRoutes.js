import express from "express";
import {
  getSeats,
  seatBook,
  seatInitialise,
} from "../controllers/seatController.js";

const router = express.Router();

router.get("/", getSeats);

router.post("/initialize", seatInitialise);

router.post("/book", seatBook);

export default router;
