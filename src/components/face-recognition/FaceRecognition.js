import React from 'react';

const FaceRecognition = ({ imageURL }) => {
  return (
    <div className="ma4 mt4">
      <img src={imageURL} alt="subject" />
    </div>
  );
};

export default FaceRecognition;
