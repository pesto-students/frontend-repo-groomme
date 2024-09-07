import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  Grid,
  Typography,
} from "@mui/material";

import {
  submitReviewService,
  updateReviewAndRatingService,
} from "../../../../services/reviewsRating";

export default function ReviewFormDialog({
  salonId,
  handleClose,
  open,
  reviewToUpdate,
}: {
  salonId: string;
  handleClose: () => void;
  open: boolean;
  reviewToUpdate?: any;
}) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { p: 2 },
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            if (reviewToUpdate) {
              await updateReviewAndRatingService(
                reviewToUpdate._id,
                formJson,
                reviewToUpdate
              );
            } else {
              await submitReviewService(salonId, formJson);
            }
            handleClose();
          },
        }}
      >
        <DialogTitle>Submit Your Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide your feedback on the salon services.
          </DialogContentText>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Typography>Overall Rating</Typography>
              <Rating
                name="rating"
                defaultValue={reviewToUpdate ? reviewToUpdate.rating : 5}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Services</Typography>
              <Rating
                name="services"
                defaultValue={reviewToUpdate ? reviewToUpdate.services : 5}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Staff</Typography>
              <Rating
                name="staff"
                defaultValue={reviewToUpdate ? reviewToUpdate.staff : 5}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Value for Money</Typography>
              <Rating
                name="valueForMoney"
                defaultValue={reviewToUpdate ? reviewToUpdate.valueForMoney : 5}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Cleanliness</Typography>
              <Rating
                name="cleanliness"
                defaultValue={reviewToUpdate ? reviewToUpdate.cleanliness : 5}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="comment"
                label="Comments"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                required
                defaultValue={reviewToUpdate ? reviewToUpdate.comment : ""}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#d4740f" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#d4740f" }}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
