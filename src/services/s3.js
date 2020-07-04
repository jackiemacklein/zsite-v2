import AWS from "aws-sdk";
import { getTypeByName, validURL } from "./functions";

/**
 * Digital Ocean Spaces Connection
 */
export const digitalOceanSpaces = "https://zukt-3s.nyc3.digitaloceanspaces.com/";
export const bucketName = "zukt-3s";
const spacesEndpoint = new AWS.Endpoint("nyc3.digitaloceanspaces.com");

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.REACT_APP_DIG_OCE_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_DIG_OCE_ACCESS_SECRET_KEY,
});

export default async function upload(client_id, site_id, files) {
  const progress = [];

  if (files) {
    await Promise.all(
      files.map(async file => {
        if (!validURL(file.file)) {
          const blob = file.file;
          const newName = `${client_id}/${site_id}/${Date.now()}.${getTypeByName(blob.name)}`;
          const params = {
            Body: blob,
            Bucket: bucketName,
            Key: newName,
          };
          try {
            var putObjectPromise = await s3
              .putObject(params)
              .on("build", request => {
                request.httpRequest.headers.Host = `${digitalOceanSpaces}`;
                request.httpRequest.headers["Content-Length"] = blob.size;
                request.httpRequest.headers["Content-Type"] = blob.type;
                request.httpRequest.headers["x-amz-acl"] = "public-read";
              })
              .promise();

            const fileUrl = `${digitalOceanSpaces}` + newName;
            progress.push({ name: blob.name, newName: newName, fileUrl: fileUrl, success: true, error: false });
          } catch (error) {
            progress.push({ name: blob.name, newName: newName, fileUrl: "", success: false, error: true });
            console.log("error", error);
          }
        } else {
          progress.push({ name: "", newName: "", fileUrl: file.file, success: false, error: true });
        }
      }),
    );
  }

  return progress;
}

export async function remove(file, callback = () => {}, errorCallback = () => {}) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucketName,
      Delete: {
        Objects: [{ Key: file }],
      },
    };
    // Sending the file to the Spaces
    s3.deleteObject(params).send((err, data) => {
      console.log(data);
    });
  });
}
