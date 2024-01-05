var raptoreumcore = require("@socialruins/raptoreumcore-lib");
var Networks = raptoreumcore.Networks;
var P2P = require("./");
var Pool = P2P.Pool;
var Messages = P2P.Messages;
var Peer = P2P.Peer;

var peer = new Peer({ host: "127.0.0.1", port: 8484 });

peer.on("ready", function () {
  console.log("Connected " + peer.version, peer.subversion, peer.bestHeight);
});
peer.on("disconnect", function () {
  console.log("disconnected");
});

peer.on("connect", function () {
  console.log("Connected " + peer.version, peer.subversion, peer.bestHeight);
});

//loop through peer notifications
peer.on("inv", function (message) {
  var nodeMsg = message.inventory;
  var nodeMsgLen = nodeMsg.length;
  for (var i = 0; i < nodeMsgLen; i++) {
    console.log(nodeMsg[i].hash);
  }
});
//connect
peer.connect();
