import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Grid,
} from "@mui/material";
import { handleUploadToS3Service } from "../../services/uploadToS3";
import { getUserDetailsService } from "../../services/user";
import axiosInstance from "../../config/axiosInstance";
import QueriesList from "./QueriesList";
import { helpAndSupportUrls } from "../../urls/urls";
import FaqAccordation from "./FaqAccordation";

const categories = [
  "Billing",
  "Technical Support",
  "General Inquiry",
  "Account Issues",
  "Appointment Scheduling",
  "Service Feedback",
  "Website Navigation",
  "Salon Registration",
  "Promotions and Offers",
  "Other",
];

const HelpSupportForm: React.FC = () => {
  const [subject, setSubject] = useState<string>("");
  const [category, setCategory] = useState<string>(categories[0]);
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];

      try {
        const details = await getUserDetailsService();
        const uploadUrl = await handleUploadToS3Service(
          selectedImage,
          details._id,
          details.userType
        );
        setImageUrl(uploadUrl);
      } catch (error) {
        console.error("Failed to upload image", error);
        setMessage("Failed to upload image. Please try again.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      subject,
      category,
      description,
      image: imageUrl,
    };

    try {
      const response = await axiosInstance.post(
        helpAndSupportUrls.createSupportQuery,
        formData
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      setMessage("Failed to submit the query. Please try again.");
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Help & Support
          </Typography>
          <TextField
            label="Subject"
            variant="outlined"
            fullWidth
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Category"
            variant="outlined"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            sx={{ mb: 2 }}
          >
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mb: 2, color: "#d4740f", borderColor: "#d4740f" }}
          >
            Upload Screenshot
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {imageUrl && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <img
                src={imageUrl}
                alt="Uploaded preview"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#d4740f" }}
            fullWidth
          >
            Submit
          </Button>

          {message && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box sx={{ mt: 3 }}>
          <FaqAccordation />
        </Box>
        <Box>
          <QueriesList />
        </Box>
      </Grid>
    </Grid>
  );
};

export default HelpSupportForm;
