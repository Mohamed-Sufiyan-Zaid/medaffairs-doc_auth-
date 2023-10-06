import axios from "axios";

export default axios.create({
  baseURL: process.env.API_URL || "http://localhost:5101/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});
