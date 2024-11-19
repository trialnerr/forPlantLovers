const fs = require("fs"); 
const axios = require("axios");
const FormData = require("form-data"); // Readable "multipart/form-data" streams
require("dotenv").config();
console.log(process.env.API_PRIVATE_KEY); 


const PROJECT = "all"; // try 'weurope' or 'canada'
const API_URL =
  "https://my-api.plantnet.org/v2/identify/" + PROJECT + "?api-key=";
const API_PRIVATE_KEY = process.env.API_PRIVATE_KEY; // secret
const API_SIMSEARCH_OPTION = "&include-related-images=true"; // optional: get most similar images
// const API_LANG = "&lang=fr"; // default: en

const IMAGE_1 = './photos/img1.png';
const ORGAN_1 = "flower";
const IMAGE_2 = "./photos/img3.png";
const ORGAN_2 = "leaf";

const apiReq = async () => {
  let form = new FormData();

  form.append("organs", ORGAN_1);
  form.append("images", fs.createReadStream(IMAGE_1));

  form.append("organs", ORGAN_2);
  form.append("images", fs.createReadStream(IMAGE_2));

  try {
    const { status, data } = await axios.post(
      // list of probable species
      // API_URL + API_PRIVATE_KEY,
      // list of probable species + most similar images
      API_URL + API_PRIVATE_KEY + API_SIMSEARCH_OPTION,
      // list of probable species + french common names
      // API_URL + API_PRIVATE_KEY + API_LANG,
      form,
      {
        headers: form.getHeaders(),
      },
    );

    console.log("status", status); // should be: 200
    console.log("data", require("util").inspect(data, false, null, true));
  } catch (error) {
    console.error("error", error);
  }
};

module.exports = apiReq; 


