// write.js

const fs = require("fs");
const protobuf = require("protobufjs");

protobuf.load("awesome-repeated-oneof.proto", function (err, root) {
  if (err) throw err;

  const AwesomeMessage = root.lookupType("awesomepackage.AllGenericMessages");

  //   const payload = { messageNumber: { a: 150 }};
  const payloads = {msgs: [
    { nameMessage: { name: "Peter" } },
    { numberMessage: { num: 150 } },
    { nameMessage: { name: "Paul" } },
    { nameMessage: { name: "Mary" } },
    { numberMessage: { num: 123 } },
  ]};
//   payloads.forEach((payload) => {
    console.log("payloads", payloads);

    const errMsg = AwesomeMessage.verify(payloads);
    if (errMsg) throw Error(errMsg);

    const message = AwesomeMessage.create(payloads); // or use .fromObject if conversion is necessary

    // Encode a message to an Uint8Array (browser) or Buffer (node)
    const buffer = AwesomeMessage.encode(message).finish();

    console.log(buffer);
    fs.writeFileSync("awesome-repeated-oneof.dat", buffer, { flag: "as" });
//   });
});
