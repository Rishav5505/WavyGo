require('dotenv').config();
const mongoose = require('mongoose');
const Booking = require('./models/bookingModel.js');

async function fixDates() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const bookings = await Booking.find({});
    for (let i = 0; i < bookings.length; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (i * 2 + 1)); // staggered past dates
        bookings[i].createdAt = date;
        await bookings[i].save();
    }
    console.log("Updated booking dates to look realistic.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
fixDates();
