const express = require("express");

const Booking = require("../models/booking");

async function handleCreateBookingById(req, res) {
  try {
    const { User, From, Destination, DateOfDeparture } = req.body;

    // Create a new booking instance
    const newBooking = new Booking({
      user: User,
      from: From,
      to: Destination,
      date: DateOfDeparture,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Save the booking to the database
    await newBooking.save();

    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Failed to create booking" });
  }
}

async function handleUpdateBookingById(req, res) {
  try {
    const { id } = req.params; // Assuming id is passed in URL parameter
    const { From, To, DateOfDeparture } = req.body;

    // Find the booking by ID and update its fields
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      {
        from: From,
        to: To,
        date: DateOfDeparture,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res
      .status(200)
      .json({
        message: "Booking updated successfully",
        booking: updatedBooking,
      });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Failed to update booking" });
  }
}

async function handleDeleteBookingById(req, res) {
  try {
    const { id } = req.params; // Assuming id is passed in URL parameter

    // Find the booking by ID and delete it
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res
      .status(200)
      .json({
        message: "Booking deleted successfully",
        booking: deletedBooking,
      });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Failed to delete booking" });
  }
}

module.exports = {
  handleCreateBookingById,
  handleUpdateBookingById,
  handleDeleteBookingById,
};
