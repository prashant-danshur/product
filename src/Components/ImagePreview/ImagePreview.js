import React from "react";

export default function ImagePreview({ imageData,style }) {
  return (

    <div>
      <img
        src={imageData}
        alt=""
        style={style}
      />
    </div>
  );
}
