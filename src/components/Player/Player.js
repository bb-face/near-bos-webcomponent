import GetSrc from "./GetSrc";
import Display from "./Display";
import GetUploadUrl from "./GetUploadUrl";
import ResumableUploadAsset from "./ResumableUploadAsset";
import DirectUploadAsset from "./DirectUploadAsset";
import DebugState from "./DebugState";
import ApiKey from "./ApiKey";

export const VideoPlayer = ({ children }) => {};

VideoPlayer.Display = Display;
VideoPlayer.GetSrc = GetSrc;
VideoPlayer.GetUploadUrl = GetUploadUrl;
VideoPlayer.DirectUploadAsset = DirectUploadAsset;
VideoPlayer.ResumableUploadAsset = ResumableUploadAsset;
VideoPlayer.Debug = DebugState;
VideoPlayer.ApiKey = ApiKey;
