const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://ishanaryan:890bba6b@cluster0.z7ac7fm.mongodb.net/food-delivery?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log('db connected ')).catch((err)=>console.log(err));
}

module.exports = connectDB;

// mongodb+srv://ishanaryan:890bba6b@cluster0.z7ac7fm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0