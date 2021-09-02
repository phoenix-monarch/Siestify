import axios from "axios";
import crypto from "crypto";

const instance = axios.create({
  baseURL: "https://zingmp3.vn/api/v2",
});

const getHash256 = (a) =>
  crypto
    .createHash("sha256")
    .update(a)
    .digest("hex");

const getHmac512 = (str, key) => {
  const hmac = crypto.createHmac("sha512", key);
  return hmac.update(Buffer.from(str, "utf8")).digest("hex");
};

const toQuery = (object) =>
  Object.keys(object)
    .map((key) => `${key}=${encodeURIComponent(object[key])}`)
    .join("&");

const toZingQuery = (object) => {
  const sorted = {};
  Object.keys(object)
    .sort()
    .forEach((n) => {
      sorted[n] = object[n];
    });

  return Object.keys(sorted)
    .map((key) => `${key}=${encodeURIComponent(sorted[key])}`)
    .join("");
};

const generateSig = (path, params) => {
  const query = toZingQuery(params);

  const sha256 = getHash256(query);
  const sig = getHmac512(path + sha256, "2aa2d1c561e809b267f3638c4a307aab");

  return sig;
};

instance.interceptors.request.use(
  (config) => {
    const path = `/api/v2${config.url}`;
    const apiKey = "88265e23d4284f25963e6eedac8fbfa3";
    const version = "1.3.5";
    const timestamp = Math.floor(new Date() / 1000);

    const sig = generateSig(path, {
      ...config.params,
      ctime: timestamp,
      version,
    });

    const totalParams = {
      ...config.params,
      ctime: timestamp,
      version,
      sig,
      apiKey,
    };

    const query = toQuery(totalParams);

    config.url = `${config.url}?${query}`;

    return config;
  },
  (error) =>
    // Do something with request error
    Promise.reject(error)
);

export default instance;
