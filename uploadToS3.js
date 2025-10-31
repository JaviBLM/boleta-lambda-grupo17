// uploadToS3.js
const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({ region: "us-east-1" });

async function uploadToS3(filePath, fileName) {
  const bucketName = "boletasproyectoarqui17";
  const fileContent = fs.readFileSync(filePath);

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
    ContentType: "application/pdf",
  });

  await s3.send(command);

  return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
}

module.exports = { uploadToS3 };
