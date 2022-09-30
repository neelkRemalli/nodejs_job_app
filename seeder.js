import mongoose from 'mongoose';
import Product from './models/productModel.js';
import fs from 'fs'
const productData = JSON.parse(fs.readFileSync('./products.json'))

// import productData from './products.json' assert { type: 'json' };


import dotenv from 'dotenv';
dotenv.config();

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI);
    await Product.create(productData);
    console.log('Data created successfully!!!!');
  } catch (error) {
    console.log(error.message);
  }
  process.exit(1);
};

const deleteData = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI);
    await Product.deleteMany();
    console.log('Data deleted successfully!!!!');
  } catch (error) {
    console.log(error.message);
  }
  process.exit(1);
};

if (process.argv[2] === '__i') {
  importData();
} else if (process.argv[2] === '__d') {
  deleteData();
}
