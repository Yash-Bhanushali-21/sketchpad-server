require("dotenv").config();
require("./auth/passport");

const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
///const crypto = require("node:crypto");
const api = require("./api");

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

/**
 * 
 * // Generate an RSA key pair
const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048, // key size
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

// Save the private key to a file (for simplicity)
fs.writeFileSync("private-key.pem", privateKey);

 */
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://3.111.40.16:3000"],
  },
});

//plugging in the socket config for draw app.
require("./sockets/drawingSocket")(io);

//v1 version of the api.
app.use("/api/v1", api);

//run node server on the port.
server.listen(PORT, () => {
  console.log(`listening on *${PORT}`);
});
