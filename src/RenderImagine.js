import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client'; // Thêm thư viện socket.io-client

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const socketRef = useRef(null); // Dùng useRef để giữ kết nối duy nhất

  useEffect(() => {
    // Kiểm tra nếu socket chưa được tạo
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:5000'); // Kết nối tới server Socket.IO
    }

    // Gọi API để lấy danh sách ảnh khi component được mount
    axios.get('http://localhost:5000/api/images')
      .then(response => {
        console.log(response.data);
        setImages(response.data);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });

    // Lắng nghe sự kiện "newImage" từ server
    socketRef.current.on('newImage', (newImage) => {
      setImages((prevImages) => [...prevImages, newImage]); // Thêm ảnh mới vào danh sách
    });

    // Dọn dẹp lắng nghe sự kiện khi component unmount
    return () => {
      socketRef.current.off('newImage');
    };
  }, []); // Mảng dependency rỗng để chỉ gọi khi component mount và unmount

  const lastImage = images.length > 0 ? images[images.length - 1] : null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {lastImage ? (
        <div key={lastImage._id} style={{ width: '600px', textAlign: 'center' }}>
          <img src={lastImage.imageUrl} alt={lastImage.title} style={{ width: '100%', height: 'auto' }} />
          <p>{lastImage.title}</p>
        </div>
      ) : (
        <p>Không có hình ảnh nào</p>
      )}
    </div>
  );
};

export default ImageGallery;