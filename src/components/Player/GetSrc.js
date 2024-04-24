import React from "react";
import { getSrc } from "@livepeer/react/external";
import { Livepeer } from "livepeer";

import { useStore } from "./state";

function createLivepeerInstance(apiKey) {
  const livepeerInstance = new Livepeer({
    apiKey,
  });

  return livepeerInstance;
}

const GetSrc = () => {
  const { setSrc, setError, playbackId, apiKey } = useStore();

  const API_KEY = apiKey || process.env.REACT_APP_LIVEPEER_STUDIO_API_KEY;

  const livepeerInstance = createLivepeerInstance(API_KEY);

  const getPlaybackSource = async (playbackId, livepeer = livepeerInstance) => {
    if (!livepeer) throw new Error("Livepeer instance not found");

    try {
      const playbackInfo = await livepeer.playback.get(playbackId);
      const src = getSrc(playbackInfo.playbackInfo);

      return src;
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchSrc = async () => {
    setError("");

    try {
      const fetchedSrc = await getPlaybackSource(playbackId);
      setSrc(fetchedSrc);
    } catch (error) {
      setError(erorr.message);
    }
  };

  return (
    <button type="button" onClick={fetchSrc}>
      get src
    </button>
  );
};

export default GetSrc;
