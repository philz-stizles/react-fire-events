import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const PhotoWidgetCropper = ({ setImage, imagePreview }) => {
  const cropperRef = useRef(null);
  const cropImage = () => {
    // if(typeof cropperRef.current.getCroppedCanvas() === 'undefined') {
    //   return;
    // }

    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;

    cropper.getCroppedCanvas().toBlob(blob => {
      setImage(blob);
    }, 'image/jpeg');
    
    // console.log(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <Cropper
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      // Cropper.js options
      // aspectRatio={1}
      initialAspectRatio={16 / 9}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      dragMode="move"
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={cropImage}
      ref={cropperRef}
    />
  );
};

export default PhotoWidgetCropper;