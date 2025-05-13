import axios from "axios";

export async function uploadFileToS3(file) {
  console.log("Received Request to updlaoad file....");
  console.log(111, file);
  const { data } = await axios.post(
    "http://localhost:3000/api/media/generate-presigned-url",
    {
      fileName: file.name,
      fileType: file.type,
    }
  );

  const { url, key } = data;

  await axios.put(url, file, {
    headers: { "Content-Type": file.type },
  });

  return {
    key,
    url: `https://${import.meta.env.VITE_S3_BUCKET}.s3.${
      import.meta.env.VITE_AWS_REGION
    }.amazonaws.com/${key}`,
  };
}
