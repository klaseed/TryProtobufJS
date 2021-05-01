// read.js

const fs = require("fs");
const protobuf = require("protobufjs");

protobuf.load("awesome.proto", function (err, root) {
  if (err) throw err;

  const AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");

  const buffer = fs.readFileSync("awesome.dat");
  console.log(buffer);

  // Decode an Uint8Array (browser) or Buffer (node) to a message
  const message = AwesomeMessage.decode(buffer);

  // Convert the message back to a plain object
  const object = AwesomeMessage.toObject(message, {
    longs: String,
    enums: String,
    bytes: String,
    // see ConversionOptions
  });
  console.log("object", object);
});