// read.js

const fs = require("fs");
const protobuf = require("protobufjs");

protobuf.load("awesome-repeated-oneof.proto", function (err, root) {
  if (err) throw err;

  const AwesomeMessage = root.lookupType("awesomepackage.AllGenericMessages");

  const buffer = fs.readFileSync("awesome-repeated-oneof.dat");
  console.log(buffer);

  // Decode an Uint8Array (browser) or Buffer (node) to a message
  let message = AwesomeMessage.decode(buffer);

  // Convert the message back to a plain object
  let object = AwesomeMessage.toObject(message, {
    longs: String,
    enums: String,
    bytes: String,
    // see ConversionOptions
  });
  console.log("object", object);
  console.log("object JSON", JSON.stringify(object, null, 2));

//    message = AwesomeMessage.decode(buffer);

//   // Convert the message back to a plain object
//    object = AwesomeMessage.toObject(message, {
//     longs: String,
//     enums: String,
//     bytes: String,
//     // see ConversionOptions
//   });
//   console.log("object", object);
});