// write.js

const fs = require("fs");
const protobuf = require("protobufjs");

protobuf.load("awesome2.proto", function (err, root) {
  if (err) throw err;

  const AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");

  const payload = { a: 150, awesomeField: "ABC" };
  console.log("payload", payload);

  const errMsg = AwesomeMessage.verify(payload);
  if (errMsg) throw Error(errMsg);

  const message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary

  // Encode a message to an Uint8Array (browser) or Buffer (node)
  const buffer = AwesomeMessage.encode(message).finish();

  console.log(buffer);
  fs.writeFileSync("awesome.dat", buffer);

  
  const AwesomeNameMessage = root.lookupType("awesomepackage.AwesomeNameMessage");

  const payload2= { awesomeString: "Peter" };
  console.log("payload2", payload2);

  const errMsg2 = AwesomeNameMessage.verify(payload2);
  if (errMsg2) throw Error(errMsg2);

  const message2 = AwesomeNameMessage.create(payload2); // or use .fromObject if conversion is necessary

  // Encode a message to an Uint8Array (browser) or Buffer (node)
  const buffer2 = AwesomeNameMessage.encode(message2).finish();

  console.log(buffer2);
  fs.writeFileSync("awesome.dat", buffer2, {flag: "as"});

  
});