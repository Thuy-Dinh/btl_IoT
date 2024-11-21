import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) return alert('Please select a file');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ABCDEFGH'); // Sử dụng upload preset "ABCDEFGH"

        try {
            // Upload file lên Cloudinary
            const res = await axios.post(
                'https://api.cloudinary.com/v1_1/dlxz97tpm/image/upload',
                formData
            );

            // Gửi URL về backend để lưu vào MongoDB
            const imageUrl = res.data.secure_url;
            await axios.post('http://localhost:5000/api/images', { title, imageUrl });

            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter image title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
            />
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadImage;