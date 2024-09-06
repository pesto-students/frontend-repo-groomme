import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
interface Query {
  image?: string;
  _id: string;
  userId: string;
  subject: string;
  category: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function QueryPreview({
  selectedQuery,
  handleClose,
}: {
  selectedQuery: Query | null;
  handleClose: () => void;
}) {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={Boolean(selectedQuery)}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Ticket Details
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="h2">
              {selectedQuery && selectedQuery.subject}
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              <strong>Category:</strong>{" "}
              {selectedQuery && selectedQuery.category}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong>{" "}
              {selectedQuery && selectedQuery.description}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {selectedQuery && selectedQuery.status}
            </Typography>
            <Typography variant="body1">
              <strong>Created At:</strong>{" "}
              {selectedQuery &&
                new Date(selectedQuery.createdAt).toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <img
              src={selectedQuery && (selectedQuery.image as any)}
              alt="Detail"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Box>
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
}

export default QueryPreview;
