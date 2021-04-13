//imports needed for this function
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

export const pinFileToIPFS = (pinataApiKey, pinataSecretApiKey) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //we gather a local file from the API for this example, but you can gather the file from anywhere
  let data = new FormData();
  data.append("file", fs.createReadStream("./yourfile.png"));
  return axios
    .post(url, data, {
      headers: {
        "Content-Type": `multipart/form-data; boundary= ${data._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    })
    .then(function (response) {
      //handle response here
    })
    .catch(function (error) {
      //handle error here
    });
};
