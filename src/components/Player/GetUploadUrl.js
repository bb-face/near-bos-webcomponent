import React, { useState } from "react";
import { Livepeer } from "livepeer";

import { useStore } from "./state";

function createLivepeerInstance(apiKey) {
  const livepeerInstance = new Livepeer({
    apiKey,
  });

  return livepeerInstance;
}

const GetUploadUrl = () => {
  const {
    setAssetName,
    setPlaybackId,
    setResumableUploadUrl,
    setUploadUrl,
    apiKey,
  } = useStore();

  const [name, setName] = useState("");

  const API_KEY = apiKey || process.env.REACT_APP_LIVEPEER_STUDIO_API_KEY;

  const livepeerInstance = createLivepeerInstance(API_KEY);

  const handleSubmit = (event) => {
    event.preventDefault();
    generateUploadLink();
    setAssetName(name);
  };

  const generateUploadLink = async () => {
    const result = await livepeerInstance.asset.create({
      name,
    });

    setUploadUrl(result.object.url);
    setResumableUploadUrl(result.object.tusEndpoint);
    setPlaybackId(result.object.asset.playbackId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Asset name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <button type="submit">Generate link</button>
    </form>
  );
};

export default GetUploadUrl;
