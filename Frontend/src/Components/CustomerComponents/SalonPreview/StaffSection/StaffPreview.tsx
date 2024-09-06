import {
  Box,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { StaffType } from "../../../../types/salon";
import StarIcon from "@mui/icons-material/Star";

const StaffPreview = ({
  staffDetail,
  handleCloseStaffPreviewDetail,
}: {
  staffDetail: StaffType;
  handleCloseStaffPreviewDetail: () => void;
}) => {
  return (
    <Dialog
      open={staffDetail._id !== ""}
      onClose={handleCloseStaffPreviewDetail}
    >
      <DialogTitle>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleCloseStaffPreviewDetail}
          aria-label="close"
          sx={{ position: "absolute", right: 20, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          minHeight: "200px",
          p: 5,
        }}
      >
        <Typography variant="h5">Staff Profile</Typography>
        <Avatar src={staffDetail.profilePic} sx={{ width: 150, height: 150 }}>
          {!staffDetail.profilePic && (
            <AccountCircleIcon sx={{ width: "100%", height: "100%" }} />
          )}
        </Avatar>
        <Typography variant="h4">{staffDetail.fullname}</Typography>
        <Typography variant="subtitle2" sx={{ textAlign: "justify" }}>
          {staffDetail.description}
        </Typography>
        <Grid container spacing={4}>
          {staffDetail.specialties.map((specialty, index) => (
            <Grid item md={6} xs={12} key={index}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <StarIcon sx={{ color: "#d4740f" }} />
                <Typography>{specialty}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default StaffPreview;
