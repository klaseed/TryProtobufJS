// write.js

const fs = require("fs");
const protobuf = require("protobufjs");

protobuf.load("awesome-oneof.proto", function (err, root) {
  if (err) throw err;

  const AwesomeMessage = root.lookupType("awesomepackage.GenericMessage");

  //   const payload = { messageNumber: { a: 150 }};
  const payloads = [
    { nameMessage: { name: "Peter" } },
    { numberMessage: { num: 150 } },
  ];
  payloads.forEach((payload) => {
    console.log("payload", payload);

    const errMsg = AwesomeMessage.verify(payload);
    if (errMsg) throw Error(errMsg);

    const message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary

    // Encode a message to an Uint8Array (browser) or Buffer (node)
    const buffer = AwesomeMessage.encode(message).finish();

    console.log(buffer);
    fs.writeFileSync("awesome-oneof.dat", buffer, { flag: "as" });
  });
});
