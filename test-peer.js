var raptoreumcore = require("@socialruins/raptoreumcore-lib");
var _ = raptoreumcore.deps._;
var P2P = require("./");
var Peer = P2P.Peer;
var EventEmitter = require("events").EventEmitter;
var Messages = P2P.Messages;
var messages = new Messages();
var Networks = raptoreumcore.Networks;

var peer = new Peer({
  host: "localhost",
  port: 10226,
  network: Networks.mainnet,
});

peer.on("ready", function () {
  // peer info
  console.log(peer.version, peer.subversion, peer.bestHeight);
});
peer.on("disconnect", function () {
  console.log("connection closed");
});
peer.connect();
