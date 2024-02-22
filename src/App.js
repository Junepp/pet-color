import React, { useState, Component } from 'react';
import axios from 'axios';

import "./App.css";
import Nav from "./Nav/Nav";
// import Intro from "./Intro/Intro";

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

      const response = await axios.post('https://pet-color-api.com/upload', formData, {
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
    <main style={{ textAlign: 'center', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <Nav />
      </div>

      <div style={{ marginBottom: '20px'}}>
        <h1 style={{ marginBottom: '30px'}}>반려동물 색상 추출기</h1>
        <p>강아지 또는 고양이의 전신사진을 입력해주세요.</p>
        <p>(저성능 aws freetier 인스턴스를 사용해서 응답시간 3-5초가량 소요)</p>
        <p>
          made by&nbsp;
          <a href="https://github.com/Junepp" target="_blank" rel="noopener noreferrer">ryanheart</a>
        </p>
        <hr className="hrcss"></hr>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <input type="file" accept="image/*" onChange={handleImageChange}/>
        <button onClick={handleApiCall} style={{marginLeft: '20px'}}>업로드</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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

      {apiResponse && (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
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
