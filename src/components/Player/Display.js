import React, { forwardRef, useEffect, useState } from "react";
import * as Player from "@livepeer/react/player";
import {
  MuteIcon,
  PauseIcon,
  LoadingIcon,
  PlayIcon,
  UnmuteIcon,
} from "@livepeer/react/assets";
import { getSrc } from "@livepeer/react/external";

import { useStore } from "./state";
import Settings from "./Settings";

import { Livepeer } from "livepeer";

const livepeerInstance = new Livepeer({
  apiKey: process.env.REACT_APP_LIVEPEER_STUDIO_API_KEY,
});

const Display = (props) => {
  const { src, setSrc, setPlaybackId, setError } = useStore();

  const [s, setS] = useState();

  const { playbackId } = props;

  const getPlaybackSource = async (playbackId, livepeer = livepeerInstance) => {
    if (!livepeer) throw new Error("Livepeer instance not found");

    try {
      const playbackInfo = await livepeer.playback.get(playbackId);
      // const a = "9bc9jzmv6rdt1gqr";
      // const playbackInfo = await livepeer.playback.get(a);

      const src = getSrc(playbackInfo.playbackInfo);

      return src;
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchSrc = async () => {
    // const fetchedSrc = await getPlaybackSource(_, livepeer);
    try {
      const fetchedSrc = await getPlaybackSource(playbackId);
      setSrc(fetchedSrc);
      setS(fetchedSrc);
    } catch (error) {
      setError(erorr.message);
    }
  };

  useEffect(() => {
    if (src) {
      setS(src);
    }
  }, [src]);

  useEffect(() => {
    if (playbackId) {
      setPlaybackId(playbackId);
      fetchSrc();
    }
  }, [playbackId]);

  if (!s) {
    return <p>Loading</p>;
  }

  if (!playbackId) {
    <button type="button" onClick={fetchSrc}>
      get src
    </button>;
  }

  return (
    <Player.Root src={s}>
      <Player.Container>
        <Player.Video title="Live stream" />

        <Player.LoadingIndicator asChild>
          <Loading />
        </Player.LoadingIndicator>

        <Player.ErrorIndicator matcher="all" asChild>
          <Loading />
        </Player.ErrorIndicator>

        <Player.Controls
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6))",
            padding: "0.5rem 1rem",
            display: "flex",
            flexDirection: "column-reverse",
            gap: 5,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "between",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                gap: 10,
              }}
            >
              <Player.PlayPauseTrigger
                style={{
                  width: 25,
                  height: 25,
                }}
              >
                <Player.PlayingIndicator asChild matcher={false}>
                  <PlayIcon />
                </Player.PlayingIndicator>
                <Player.PlayingIndicator asChild>
                  <PauseIcon />
                </Player.PlayingIndicator>
              </Player.PlayPauseTrigger>

              <Player.LiveIndicator
                style={{ display: "flex", alignItems: "center", gap: 5 }}
              >
                <div
                  style={{
                    backgroundColor: "#ef4444",
                    height: 8,
                    width: 8,
                    borderRadius: 9999,
                  }}
                />
                <span style={{ fontSize: 12, userSelect: "none" }}>LIVE</span>
              </Player.LiveIndicator>

              <Player.MuteTrigger
                style={{
                  width: 25,
                  height: 25,
                }}
              >
                <Player.VolumeIndicator asChild matcher={false}>
                  <MuteIcon />
                </Player.VolumeIndicator>
                <Player.VolumeIndicator asChild matcher={true}>
                  <UnmuteIcon />
                </Player.VolumeIndicator>
              </Player.MuteTrigger>
              <Player.Volume
                style={{
                  position: "relative",
                  display: "flex",
                  flexGrow: 1,
                  height: 25,
                  alignItems: "center",
                  maxWidth: 120,
                  touchAction: "none",
                  userSelect: "none",
                }}
              >
                <Player.Track
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    position: "relative",
                    flexGrow: 1,
                    borderRadius: 9999,
                    height: "2px",
                  }}
                >
                  <Player.Range
                    style={{
                      position: "absolute",
                      backgroundColor: "white",
                      borderRadius: 9999,
                      height: "100%",
                    }}
                  />
                </Player.Track>
                <Player.Thumb
                  style={{
                    display: "block",
                    width: 12,
                    height: 12,
                    backgroundColor: "white",
                    borderRadius: 9999,
                  }}
                />
              </Player.Volume>
            </div>
            <Settings />
          </div>
          <Seek
            style={{
              position: "relative",
              height: 20,
              display: "flex",
              alignItems: "center",
              userSelect: "none",
              touchAction: "none",
            }}
          />
        </Player.Controls>

        {/*
<Player.Controls className="flex items-center justify-center">
					<Player.PlayPauseTrigger className="w-10 h-10">
						<Player.PlayingIndicator asChild matcher={false}>
							<PlayIcon />
						</Player.PlayingIndicator>
						<Player.PlayingIndicator asChild>
							<PauseIcon />
						</Player.PlayingIndicator>
					</Player.PlayPauseTrigger>
				</Player.Controls>
					*/}
      </Player.Container>
    </Player.Root>
  );
};

const Seek = forwardRef(({ children, ...props }, forwardedRef) => (
  <Player.Seek ref={forwardedRef} {...props}>
    <Player.Track
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        position: "relative",
        flexGrow: 1,
        borderRadius: 9999,
        height: 2,
      }}
    >
      <Player.SeekBuffer
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: 9999,
          height: "100%",
        }}
      />
      <Player.Range
        style={{
          position: "absolute",
          backgroundColor: "white",
          borderRadius: 9999,
          height: "100%",
        }}
      />
    </Player.Track>
    <Player.Thumb
      style={{
        display: "block",
        width: 12,
        height: 12,
        backgroundColor: "white",
        borderRadius: 9999,
      }}
    />
  </Player.Seek>
));

const Loading = forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <div
      {...props}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        backgroundColor: "black",
        backdropFilter: "blur(10px)",
        textAlign: "center",
      }}
      ref={forwardedRef}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <LoadingIcon
          style={{
            width: "32px",
            height: "32px",
            animation: "spin infinite 1s linear",
          }}
        />
      </div>
    </div>
  );
});

export default Display;
