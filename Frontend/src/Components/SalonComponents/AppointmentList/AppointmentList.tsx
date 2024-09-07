import { useState, useEffect } from "react";
import { getBookingListService } from "../../../services/salons";
import SalonLayout from "../../../shared/layout/SalonLayout";
import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axiosInstance from "../../../config/axiosInstance";
import { toast } from "react-toastify";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#D4740F",
    color: "#FFF",
    height: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: " theme.palette.action.hover,",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function AppointmentList() {
  const [appointmentBookingList, setAppointmentBookingList] = useState([]);
  async function getBookings() {
    const list = await getBookingListService();
    setAppointmentBookingList(list.appointments);
  }
  useEffect(() => {
    getBookings();
  }, []);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null); // State to hold the selected row

  const open = Boolean(anchorEl);

  const handleApprove = async (appointmentId: string) => {
    if (selectedRow.status === "pending") {
      try {
        const response = await axiosInstance.patch(`/${appointmentId}/approve`);

        if (response.data.message) {
          toast.success(response.data.message);
          await getBookings();
        }
      } catch (error) {
        console.error("Failed to approve appointment", error);
      }
      handleClose();
    } else {
      toast.error(
        "Appointment cannot be approved as the status is not pending."
      );
    }
  };
  const handleCancel = async (appointmentId: string) => {
    if (selectedRow.status === "pending") {
      try {
        const response = await axiosInstance.patch(`/${appointmentId}/cancel`);

        if (response.data.message) {
          toast.warn(response.data.message);
          await getBookings();
        }
      } catch (error) {
        console.error("Failed to cancel appointment", error);
      }
      handleClose();
    } else if (selectedRow.status === "cancelled") {
      toast.warn("Appointment is already in cancel status");
    } else {
      toast.error(
        "Appointment cannot be cancel at this time. Please contact support"
      );
    }
  };
  const handleComplete = async (appointmentId: string) => {
    if (selectedRow.status === "approved") {
      try {
        const response = await axiosInstance.patch(
          `/${appointmentId}/complete`
        );

        if (response.data.message) {
          toast.success(response.data.message);
          await getBookings();
        }
      } catch (error) {
        console.error("Failed to complete appointment", error);
      }
      handleClose();
    } else {
      toast.error(
        "Appointment cannot be complete as the status is not approved."
      );
    }
  };

  const menuItems = [
    {
      label: "Approve",
      action: (appointmentId: string) => handleApprove(appointmentId),
    },
    {
      label: "Cancel",
      action: (appointmentId: string) => handleCancel(appointmentId),
    },
    {
      label: "Complete",
      action: (appointmentId: string) => handleComplete(appointmentId),
    },
  ];

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  return (
    <SalonLayout>
      <Typography variant="h5" sx={{ p: 2 }}>
        Appointment List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Time</StyledTableCell>
              <StyledTableCell align="center">
                Service Requested
              </StyledTableCell>
              {sessionStorage.getItem("userType") === "customer" && (
                <StyledTableCell align="center">Salon Name</StyledTableCell>
              )}
              {sessionStorage.getItem("userType") === "salon" && (
                <StyledTableCell align="center">Customer Name</StyledTableCell>
              )}
              <StyledTableCell align="center">Stylist name</StyledTableCell>{" "}
              <StyledTableCell align="center">Rate</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Notes</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentBookingList.length > 0 &&
              appointmentBookingList.map((row: any) => {
                return (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell align="center">
                      {new Date(row.date).toLocaleDateString("en-US")}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.time}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.serviceRequestedDetails.name}
                    </StyledTableCell>
                    {sessionStorage.getItem("userType") === "customer" && (
                      <StyledTableCell align="center">
                        {row.salonDetails.salonName}
                      </StyledTableCell>
                    )}
                    {sessionStorage.getItem("userType") === "salon" && (
                      <StyledTableCell align="center">
                        {`${row.userDetails.firstName} ${row.userDetails.lastName}`}
                      </StyledTableCell>
                    )}
                    <StyledTableCell align="center">
                      {row.stylistDetails.fullname}
                    </StyledTableCell>{" "}
                    <StyledTableCell align="center">
                      {row.serviceRequestedDetails.rate}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.status}
                    </StyledTableCell>{" "}
                    <StyledTableCell align="center">
                      {row.notes}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton onClick={(event) => handleClick(event, row)}>
                        <MoreVertIcon sx={{ color: "#D4740F" }} />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>{" "}
      {appointmentBookingList.length === 0 && (
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            p: 3,
          }}
        >
          No Data Found
        </Typography>
      )}
      <Menu
        id="approval-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.action(selectedRow._id);
              handleClose();
            }}
          >
            {item.label}
          </MenuItem>
        ))}{" "}
      </Menu>
    </SalonLayout>
  );
}

export default AppointmentList;
