import axios from "axios";

const axiosInstance = axios.create({
  // local instance of firebase functions
  // baseURL: "http://127.0.0.1:5001/clone-109d8/us-central1/api",
  // deployed version of amazon server on renderMatches.com
  // baseURL: "https://amazon-api-deploy-pcij.onrender.com",
  baseURL: "https://amazon-api-deploy-pcij.onrender.com",
  // baseURL: "https://amazon-api-deploy-pcij.onrender.com",
  // baseURL: "http://127.0.0.1:5001/clone-56a66/us-central1/api",
});

export {axiosInstance}