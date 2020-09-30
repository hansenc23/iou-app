import React, { useState, createContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import CONFIG from '../config';

export const ImageContext = createContext();

export const ImageProvider = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const uploadImage = async () => {
    let responseMsg;
    const data = new FormData();
    // If file selected
    if (selectedImage) {
      data.append('imageProof', selectedImage, selectedImage.name);

      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/image/imageUpload`, data, {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          },
        });

        if (res.status === 200) {
          if (res.data.error) {
            if (res.data.error.code === 'LIMIT_FILE_SIZE') {
              // responseMsg = 'Max size 2MB';
              // return responseMsg;
              //   setErrorMsg('Max size 2MB');
              //   console.log(errorMsg);
              return res.data;
            } else {
              // responseMsg = 'Invalid file type';
              // return responseMsg;
              setErrorMsg('Invalid file type, please uplaod images only!');
              console.log(errorMsg);
              return res.data;
            }
          } else {
            setSuccessMsg('Image uploaded successfully!');
            setUploadedImageUrl(res.data.location);
            return res.data;
          }
        }

        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrorMsg('Please upload an image');
      console.log(errorMsg);
    }
  };

  return (
    <ImageContext.Provider value={{ selectedImage, setSelectedImage, uploadImage, errorMsg, successMsg, setUploadedImageUrl, uploadedImageUrl }}>
      {props.children}
    </ImageContext.Provider>
  );
};
