import axios from "axios";
import { env } from "process";
import { HttpCode, Images } from "./types/types";
import { createServerError } from "./utils/createServerError";

const apiReq = async (organTypes: string[], imgUrls: Images[])  => {
  const urlParams = new URLSearchParams();
  imgUrls.forEach((img) => {
    urlParams.append("images", img.url);
  });

  organTypes.forEach((organ) => {
    urlParams.append("organs", organ);
  });
  urlParams.append("include-related-images", 'true');
  urlParams.append("no-reject", 'false');
  urlParams.append("nb-results", '5');
  urlParams.append("type", "kt");
  urlParams.append("api-key", env.API_PRIVATE_KEY);

  // Construct the final URL
  const apiUrl = `https://my-api.plantnet.org/v2/identify/all?${urlParams.toString()}`;

  try {
    const result = await axios.get(apiUrl);
    return result; 

  } catch (error) {
    return createServerError('error identifying image', HttpCode.INTERNAL_SERVER_ERROR, `error in apiReq, ${error}`);
  }
};

export default apiReq; 
