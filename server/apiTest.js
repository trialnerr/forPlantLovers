const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data"); // Readable "multipart/form-data" streams
require("dotenv").config();

const PROJECT = "all"; // try 'weurope' or 'canada'
const API_URL = "https://my-api.plantnet.org/v2/identify/";
// const API_PRIVATE_KEY = process.env.API_PRIVATE_KEY; // secret
// const API_SIMSEARCH_OPTION = "&include-related-images=true"; // optional: get most similar images

const apiReq = async (organTypes, imgUrls) => {
  const urlParams = new URLSearchParams();

  imgUrls.forEach((img) => {
    urlParams.append("images", img.url);
  });

  organTypes.forEach((organ) => {
    urlParams.append("organs", organ);
  });
  urlParams.append("include-related-images", true);
  urlParams.append("no-reject", false);
  urlParams.append("nb-results", 5);
  urlParams.append("type", "kt");
  urlParams.append("api-key", process.env.API_PRIVATE_KEY);

  // Construct the final URL
  const apiUrl = `https://my-api.plantnet.org/v2/identify/all?${urlParams.toString()}`;

  try {
    const { status, data } = await axios.get(
      // list of probable species
      // API_URL + API_PRIVATE_KEY,
      // list of probable species + most similar images
      apiUrl
      // list of probable species + french common names
      // API_URL + API_PRIVATE_KEY + API_LANG,
    );

    console.log("status", status); // should be: 200
    console.log("data", require("util").inspect(data, false, null, true));
  } catch (error) {
    console.error("error", error);
  }
};

module.exports = apiReq;
