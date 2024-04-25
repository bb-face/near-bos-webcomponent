import React, { useEffect, useState } from "react";

import { useStore } from "./state";

const ApiKey = (props) => {
  const { apiKey, setApiKey } = useStore();

  const [apiKeyValue, setApiKeyValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setApiKey(apiKeyValue);
  };

  useEffect(() => {
    if (!apiKey) setApiKey(props.apiKey);
  }, [props.apiKey]);

  if (props.automated) {
    return <></>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Api key:
        <input
          type="text"
          value={apiKeyValue}
          onChange={(event) => setApiKeyValue(event.target.value)}
        />
      </label>
      <button type="submit">Set api key</button>
    </form>
  );
};

export default ApiKey;
