import { toast } from "react-toastify";
import axiosInstance from "../config/axiosInstance";
import { uploadToS3 } from "../urls/urls";

export const handleUploadToS3Service = async (
  file: File,
  userId: string,
  userType: string
) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("userId", userId);
  formData.append("userType", userType);

  try {
    const response = await axiosInstance.post(uploadToS3, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data) {
      toast.success("File Uploaded Successfully");
      return response.data.data.Location;
    } else return null;
  } catch (error) {
    console.error(
      "An error occurred while uploading the file to aws s3.",
      error
    );
  }
};
