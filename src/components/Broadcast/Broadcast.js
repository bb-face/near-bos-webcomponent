import GenerateStream from "./GenerateStream";
import Player from "./Player";
import Debug from "./DebugState";
import ApiKey from "./ApiKey";

export const BroadcastComponent = ({ children }) => {};

BroadcastComponent.Player = Player;
BroadcastComponent.GenerateStream = GenerateStream;
BroadcastComponent.Debug = Debug;
BroadcastComponent.ApiKey = ApiKey;
