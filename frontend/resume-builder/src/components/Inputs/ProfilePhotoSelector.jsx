import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Hidden input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* If no image selected */}
      {!image ? (
        <div className="flex flex-col items-center justify-center w-28 h-28 rounded-full bg-gray-100 border border-gray-300 text-gray-500 relative">
          <LuUser className="text-4xl" />
          <button
            type="button"
            onClick={onChooseFile}
            className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full shadow-md hover:bg-primary/80"
          >
            <LuUpload className="text-sm" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile"
            className="w-20 h-20 object-cover rounded-full border border-gray-300"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute bottom-0 right-0 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
          >
            <LuTrash className="text-sm" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
