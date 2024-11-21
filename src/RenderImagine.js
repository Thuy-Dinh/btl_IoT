import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách ảnh
    axios.get('http://localhost:5000/api/images')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  },[]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      <h1>Danh sách hình ảnh</h1>
      {images.length > 0 ? (
        images.map((image) => (
          <div key={image._id} style={{ width: '200px', textAlign: 'center' }}>
            <img src={image.imageUrl} alt={image.title} style={{ width: '100%', height: 'auto' }} />
            <p>{image.title}</p>
          </div>
        ))
      ) : (
        <p>Không có hình ảnh nào</p>
      )}
    </div>
  );
};

export default ImageGallery;