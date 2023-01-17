import { Buffer } from "buffer";

const readImg = (imgBuffer) => {
  return new Buffer(imgBuffer, "base64").toString("binary");
};

export default readImg