import React, { useState } from "react";
import { useStore } from "./state";

const GenerateStream = () => {
  const { setStreamKey, setError, apiKey } = useStore();

  const API_KEY = apiKey || process.env.REACT_APP_LIVEPEER_STUDIO_API_KEY;

  const [name, setName] = useState("");

  const createStream = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://livepeer.studio/api/stream", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });

      if (!response.ok) {
        setError("Network response was not ok");
        return;
      }

      const data = await response.json();
      console.log("Stream created:", data);

      setStreamKey(data.streamKey);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={createStream}>
        <label>
          Stream name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <button type="submit">Start stream</button>
      </form>
    </>
  );
};

export default GenerateStream;
