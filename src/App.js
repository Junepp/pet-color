import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [apiImage, setApiImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setApiImage(null); // previewImage가 변경될 때 apiImage 초기화
      setApiResponse(null);
    };

    if (file) {
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  const handleApiCall = async () => {
    try {
      if (!selectedImage) {
        console.error('No image selected');
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedImage);

      const response = await axios.post('http://15.164.224.151:9797/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setApiResponse(response.data);  // 서버 응답을 상태에 저장
      setApiImage(response.data.imageBase64);
      console.log(response.data);
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  return (
    <main style={{ textAlign: 'center', margin: 'auto', paddingTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input type="file" accept="image/*" onChange={handleImageChange}/>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        {previewImage && (
          <div style={{ marginRight: '20px' }}>
            <h2>Preview:</h2>
            <img src={previewImage} alt="Preview" style={{ maxWidth: '350px' }} />
          </div>
        )}

        {apiImage && (
          <div>
            <h2>Detected Area:</h2>
            <img src={`data:image/jpeg;base64,${apiImage}`} alt="API Image" style={{ maxWidth: '350px' }} />
          </div>
        )}
      </div>

      <button onClick={handleApiCall} style={{ marginTop: '20px' }}>Upload Image</button>

      {apiResponse && (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '20px' }}>
          <div>
            <h2>Extracted Colors:</h2>
            <div>
              {Object.entries(apiResponse.colors).map(([color, percent], index) => (
                <div key={index} style={{ backgroundColor: color, width: '80px', height: '80px', display: 'inline-block', margin: '5px', textAlign: 'center' }}>
                  <p>{color}</p>
                  <p>{percent}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ImageUpload;
