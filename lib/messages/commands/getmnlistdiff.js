'use strict';

var Message = require('../message');
var inherits = require('util').inherits;
var raptoreumcore = require("@socialruins/raptoreumcore-lib");
var BufferReader = raptoreumcore.encoding.BufferReader;
var BufferWriter = raptoreumcore.encoding.BufferWriter;
var $ = raptoreumcore.util.preconditions;

function GetMnListDiffMessage(args, options) {
  Message.call(this, options);
  this.command = 'getmnlistdiff';
  if (!args) {
    args = {};
  }

  this.baseBlockHash = args.baseBlockHash;
  this.blockHash = args.blockHash;
}
inherits(GetMnListDiffMessage, Message);

GetMnListDiffMessage.prototype.setPayload = function (payload) {
  var parser = new BufferReader(payload);
  $.checkArgument(!parser.finished(), 'No data received in payload');

  this.baseBlockHash = parser.read(32).toString('hex');
  this.blockHash = parser.read(32).toString('hex');
};

GetMnListDiffMessage.prototype.getPayload = function () {
  var bw = new BufferWriter();
  bw.write(Buffer.from(this.baseBlockHash, 'hex'));
  bw.write(Buffer.from(this.blockHash, 'hex'));
  return bw.concat();
};

module.exports = GetMnListDiffMessage;
