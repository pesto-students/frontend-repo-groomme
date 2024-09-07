import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { SalonInformationType } from "../../../../types/salon";
import { handleUploadToS3Service } from "../../../../services/uploadToS3";

const Input = styled("input")({
  display: "none",
});

const StaffProfileForm = ({
  openAddStaffForm,
  staffIndex,
  handleMainSalonInformationChange,
  mainSalonInformation,
  setSelectedStaffProfileIndex,
}: {
  openAddStaffForm: boolean;
  staffIndex: number;
  handleMainSalonInformationChange: any;
  mainSalonInformation: SalonInformationType;
  setSelectedStaffProfileIndex: Function;
}) => {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const uploadUrl = await handleUploadToS3Service(
        event.target.files[0],
        mainSalonInformation.userId,
        "salon"
      );

      const fileUrl = {
        target: {
          value: uploadUrl,
        },
      };
      handleMainSalonInformationChange(fileUrl, [
        "staff",
        staffIndex.toString(),
        "profilePic",
      ]);
    }
  };

  const handleSpecialtyChange = (specialtyIndex: number, value: string) => {
    // Create a new array with the updated specialty
    const updatedSpecialties = mainSalonInformation.staff[
      staffIndex
    ].specialties.map((specialty, spIndex) =>
      spIndex === specialtyIndex ? value : specialty
    );

    // Use the handleMainSalonInformationChange function to update the specific specialties array
    handleMainSalonInformationChange(
      { target: { value: updatedSpecialties } },
      ["staff", staffIndex.toString(), "specialties"]
    );
  };

  return (
    <Dialog open={openAddStaffForm}>
      <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Staff Profile
        </Typography>
        <Box sx={{ position: "relative", display: "inline-block", mb: 2 }}>
          <Avatar
            src={mainSalonInformation.staff[staffIndex].profilePic}
            sx={{ width: 100, height: 100 }}
          >
            {!mainSalonInformation.staff[staffIndex].profilePic && (
              <AccountCircleIcon sx={{ width: "100%", height: "100%" }} />
            )}
          </Avatar>
          <Tooltip title="Edit Profile Picture">
            <IconButton
              color="primary"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "#D4740F",
              }}
              size="small"
              component="label"
            >
              <EditIcon sx={{ color: "#FFF" }} />
              <Input accept="image/*" type="file" onChange={handleFileChange} />
            </IconButton>
          </Tooltip>
        </Box>

        <TextField
          size="small"
          InputLabelProps={{ shrink: true }}
          label="Full Name"
          name="fullname"
          value={mainSalonInformation.staff[staffIndex].fullname}
          onChange={(e) =>
            handleMainSalonInformationChange(e, [
              "staff",
              staffIndex.toString(),
              "fullname",
            ])
          }
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          size="small"
          InputLabelProps={{ shrink: true }}
          label="Description"
          name="description"
          value={mainSalonInformation.staff[staffIndex].description}
          onChange={(e) =>
            handleMainSalonInformationChange(e, [
              "staff",
              staffIndex.toString(),
              "description",
            ])
          }
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <Grid container spacing={2}>
          {mainSalonInformation.staff[staffIndex].specialties.map(
            (specialty, index) => (
              <Grid item md={6} xs={12} key={index}>
                <TextField
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  label={`Specialty ${index + 1}`}
                  value={specialty}
                  onChange={(e) => handleSpecialtyChange(index, e.target.value)}
                  fullWidth
                  // error={errors.specialties[index]}
                  // helperText={
                  //   errors.specialties[index]
                  //     ? `Specialty ${index + 1} is required.`
                  //     : ""
                  // }
                />
              </Grid>
            )
          )}
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "#D4740F" }}
            onClick={() => setSelectedStaffProfileIndex(-1)}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default StaffProfileForm;
