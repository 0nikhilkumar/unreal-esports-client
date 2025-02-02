import { useState } from "react";
import { FaCamera } from "react-icons/fa"; // Camera icon from react-icons

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="flex items-center justify-center mb-5">
      <label
        htmlFor="fileInput"
        className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-gray-300 transition-all duration-300"
      >
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <FaCamera className="text-gray-600 text-2xl" />
        )}
      </label>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
