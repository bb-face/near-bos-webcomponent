import React, { useState } from "react";
import { useStore } from "./state";

function DirectUploadAsset() {
  const { uploadUrl, setError } = useStore();

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    // event.preventDefault();

    if (!file) {
      setError("Please select a file first!");
      return;
    }

    try {
      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": "video/mp4",
        },
      });

      if (response.ok) {
        alert("Upload successful");
      } else {
        setError("Upload failed");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <label>
        Upload file:
        <input type="file" onChange={handleFileChange} />
      </label>
      <button type="submit" onClick={handleSubmit}>
        Upload
      </button>
    </>
  );
}

export default DirectUploadAsset;
