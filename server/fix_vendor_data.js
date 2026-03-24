require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModel.js');
const Package = require('./models/packageModel.js');
const Booking = require('./models/bookingModel.js');

async function fixVendorData() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected to MongoDB");

    const vendor = await User.findOne({ email: 'ram@rentals.com' });
    if (!vendor) {
        console.log("Ram Rentals not found, cannot assign data.");
        process.exit();
    }
    
    // Update location to Manali
    vendor.location = 'Manali';
    vendor.isApproved = true;
    await vendor.save();
    console.log("Vendor location set to Manali and approved.");

    // Find all unassigned or Manali bikes and assign them to Ram Rentals
    const packages = await Package.find({});
    let assignedCount = 0;
    for (let p of packages) {
        // Assign all "Manali" packages, or packages named Ram Rentals
        if (p.location === 'Manali' || p.vendorName === 'Ram Rentals' || !p.vendorId || p.vendorId === 'V1') {
            p.vendorId = vendor._id.toString();
            p.vendorName = 'Ram Rentals';
            await p.save();
            assignedCount++;
        }
    }
    console.log(`Assigned ${assignedCount} bikes to Ram Rentals.`);

    // Create some dummy bookings to show revenue
    const existingBookings = await Booking.find({ vendorId: vendor._id.toString() });
    
    // Only add bookings if there are none
    if (existingBookings.length === 0 && assignedCount > 0) {
        const vendorPkgs = await Package.find({ vendorId: vendor._id.toString() });
        for (let i = 0; i < 4; i++) {
            let p = vendorPkgs[i % vendorPkgs.length];
            if (!p) continue;
            const b = new Booking({
                packageId: p._id,
                userId: vendor._id, // reuse id to pass validation
                vendorId: vendor._id.toString(),
                vendorName: 'Ram Rentals',
                itemTitle: p.title,
                userName: 'Arjun ' + i,
                email: 'arjun' + i + '@mail.com',
                phone: '9876543210',
                travelDate: new Date(),
                guests: 1,
                totalPrice: (p.price || 1500) * 2,
                paymentMethod: 'Online',
                status: 'confirmed'
            });
            await b.save();
        }
        console.log("Added 4 confirmed bookings for Ram Rentals.");
    } else {
        console.log(`Found ${existingBookings.length} existing bookings.`);
    }

    console.log("DONE! Disconnecting.");
    await mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    console.error("Error migrating vendor data:", error.message);
    process.exit(1);
  }
}

fixVendorData();
