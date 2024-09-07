import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function LocationDeniedModal({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: Function;
}) {
  return (
    <Dialog
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby="location-dialog-title"
      aria-describedby="location-dialog-description"
    >
      <DialogTitle id="location-dialog-title">
        {"Location Access Required"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="location-dialog-description">
          We need your location permission to find salons near you. Without it,
          we cannot provide this service.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setModalOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default LocationDeniedModal;
