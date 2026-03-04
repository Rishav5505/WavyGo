const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const Package = require('./models/packageModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Package.deleteMany();
        await User.deleteMany();

        const createdUser = await User.create({
            name: 'Admin User',
            email: 'admin@wavygo.com',
            password: 'password123',
            isAdmin: true,
        });

        const samplePackages = [
            {
                _id: "65e5a2e1f1a2b3c4d5e6f001",
                title: "Royal Enfield Himalayan",
                description: "The ultimate adventure tourer for Himalayan trails.",
                location: "Delhi / Manali",
                price: 1200,
                duration: "Per Day",
                rating: 4.9,
                image: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=800",
                category: "Cruiser",
                isFeatured: true,
                tag: "Bestseller"
            },
            {
                _id: "65e5a2e1f1a2b3c4d5e6f002",
                title: "KTM Duke 390",
                location: "Delhi / Pune",
                description: "Corner rocket for high-speed street performance.",
                price: 1500,
                duration: "Per Day",
                rating: 4.9,
                image: "https://images.unsplash.com/photo-1622185135505-2d795003994a?q=80&w=800",
                category: "Sports",
                isFeatured: true,
                tag: "Trending"
            },
            {
                _id: "65e5a2e1f1a2b3c4d5e6f003",
                title: "Honda Activa 6G",
                location: "Goa / Jaipur",
                description: "Convenient and smooth for city rides and local trips.",
                price: 400,
                duration: "Per Day",
                rating: 5.0,
                image: "https://images.unsplash.com/photo-1449495169669-7b118f960237?q=80&w=800",
                category: "Commuter",
                isFeatured: true,
                tag: "Economical"
            },
            {
                _id: "65e5a2e1f1a2b3c4d5e6f004",
                title: "Triumph Speed 400",
                location: "Bangalore",
                description: "Modern classic with refined performance.",
                price: 1800,
                duration: "Per Day",
                rating: 4.7,
                image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=800",
                category: "Premium",
                isFeatured: false,
                tag: "Top Rated"
            }
        ];

        await Package.insertMany(samplePackages);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
