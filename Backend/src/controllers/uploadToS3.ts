import { Request, Response } from "express";
import fs from "fs";
import { awsS3 } from "../config/awsConfig";
interface MulterFile extends Express.Multer.File {
  path: string;
}

export const uploadToS3 = async (req: Request, res: Response) => {
  const { userId, userType } = req.body;
  if (!userId) {
    return res.status(400).send("User ID is required");
  }
  const file = req.file as MulterFile;
  if (!file) {
    return res.status(400).send("No file uploaded");
  }
  const filePath = file.path;
  const fileName = file.originalname;
  const userFolder = `${userType}/${userId}/`;

  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file");
    }

    const params = {
      Bucket: process.env["AWS_S3_BUCKET"] ?? "",
      Key: `${userFolder}${fileName}`,
      Body: fileContent,
      ContentType: file.mimetype,
    };

    const s3 = awsS3;
    s3.upload(params, (err: any, data: any) => {
      fs.unlinkSync(filePath);
      if (err) {
        console.error(err);
        return res.status(500).send("Error uploading file");
      }

      res.status(200).json({
        message: "File Uploaded successfully",
        data,
      });
    });
  });
};
