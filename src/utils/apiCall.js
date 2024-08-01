import axios from "axios";

export const APIHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
};

export const API = axios.create({
    baseURL: "https://api.nasa.gov/mars-photos/api/v1/rovers",
    timeout: 6000,
    headers: APIHeaders,
});

