const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: path.join(__dirname + "./../.env"),
});

const { PORT, HOST } = process.env;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

console.log(process.env.NODE_ENV);

app.listen(PORT, () => {
  console.log(`server listening on http://${HOST}:${PORT}`);
});

// < express | uWebSockets.js >

const uWs = require("uWebSockets.js");

uWs
  .App({})
  .ws("/uws", {
    idleTimeout: 32,
    maxBackpressure: 1024,
    maxPayloadLength: 512,
    compression: uWs.DEDICATED_COMPRESSOR_3KB,
    open: (ws, req) => {
      // console.log(ws);
      // console.log(req);
      console.log("open success");
    },
    message: (ws, message, isBinary) => {
      if (isBinary) {
        const decoder = new TextDecoder();
        const decodedText = decoder.decode(message);
        const parsedData = decodedText
          .split(",")
          .map((bi) => String.fromCharCode(parseInt(Number(bi), 2)))
          .join("");

        console.log(parsedData);
        ws.send(parsedData, isBinary);
      } else {
        ws.send(message, isBinary);
      }
    },
    drain: (ws) => {
      console.log("WebSocket backpressure: ", ws.getBufferedAmount());
    },
    close: (ws, code, message) => {
      // console.log(ws);
      // console.log(code);
      // console.log(message);
      console.log("WebSocket closed");
    },
  })
  .any("/uws", (res, req) => {
    console.log(res);
    res.writeStatus(200).writeHEader("test", "yes").end("Hello there!");
  })
  .listen(5001, (socket) => {
    if (socket) {
      console.log("server listening on ws://localhost:5001");
    }
  });
