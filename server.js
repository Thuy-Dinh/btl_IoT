const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Image = require('./models/Image');

const app = express();

app.use(cors());
app.use(bodyParser.json());

//Kết nối Cloudinary
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dlxz97tpm',
  api_key: '522334272865792',
  api_secret: 'SIY6ype2zhwjGOAq3IbhNEpTwmc',
});

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/cloudinary-demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API lấy danh sách ảnh
app.get('/api/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API thêm ảnh mới (lưu URL Cloudinary vào MongoDB)
app.post('/api/images', async (req, res) => {
  const { title, imageUrl } = req.body;

  try {
    // Upload ảnh lên Cloudinary với upload preset là "ABCD"
    const uploadedImage = await cloudinary.uploader.upload(imageUrl, { upload_preset: 'ABCDEFGH' });

    // Lưu URL Cloudinary vào MongoDB
    const newImage = new Image({ title, imageUrl: uploadedImage.secure_url });
    await newImage.save();

    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
