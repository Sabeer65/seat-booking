# Seat Booking Application

A simple single-page application for booking seats, built with the MERN stack (MongoDB, Express.js, React, Node.js) and styled with Tailwind CSS.

## Description

This application allows users to view a grid of seats, see their availability status (available, selected, booked), select multiple available seats, and book them. The booking status is persisted in a MongoDB database.

## Features

* **Visual Seat Grid:** Displays seats in a configurable grid layout.
* **Seat Statuses:**
    * Available (White/Default Icon Color)
    * Selected by User (Green Icon Color)
    * Booked (Grey Icon Color, non-interactive)
* **Multiple Seat Selection:** Users can select one or more available seats.
* **Booking Functionality:** Allows users to book their selected seats.
* **Booking Confirmation:** Displays a popup message confirming the booked seats.
* **Persistent Storage:** Seat booking status is saved in a MongoDB database.
* **Responsive Design:** The interface adapts to different screen sizes.
* **Minimal Design:** Focuses on functionality with a clean UI.

## Tech Stack

### Backend
* **Node.js:** JavaScript runtime environment.
* **Express.js:** Web application framework for Node.js.
* **MongoDB:** NoSQL document database.
* **Mongoose:** ODM library for MongoDB.
* **CORS:** Middleware for enabling Cross-Origin Resource Sharing.
* **dotenv:** Module for loading environment variables.

### Frontend
* **React:** JavaScript library for building user interfaces.
* **Axios:** Promise-based HTTP client for API calls.
* **Tailwind CSS:** Utility-first CSS framework.


If you want to run the code yourself:

* Create a `.env` file in the `backend` directory by copying `.env.example` (if you create one) or by creating it manually. Add the following environment variables:
        ```env
        MONGODB_URI=your_mongodb_connection_string_here
        PORT=5001
        ```
        Replace `your_mongodb_connection_string_here` with your actual MongoDB connection string.

