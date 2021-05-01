// write.js

const fs = require("fs");
const protobuf = require("protobufjs");

protobuf.load("awesome.proto", function (err, root) {
  if (err) throw err;

  const AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");

  const payload = { num: 15, awesomeField: "ABC" };
  console.log("payload", payload);

  const errMsg = AwesomeMessage.verify(payload);
  if (errMsg) throw Error(errMsg);

  const message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary

  // Encode a message to an Uint8Array (browser) or Buffer (node)
  const buffer = AwesomeMessage.encode(message).finish();

  console.log(buffer);
  fs.writeFileSync("awesome.dat", buffer);
});