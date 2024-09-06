import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  styled,
  tableCellClasses,
} from "@mui/material";

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
    backgroundColor: "#f5f5f5", // Changed to a more specific color
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function CheckoutDetails({
  selectedServiceRate,
  appointmentBookingFormState,
  salonDetails,
}: {
  selectedServiceRate: any;
  appointmentBookingFormState: any;
  salonDetails: any;
}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <StyledTableRow key={Math.random()}>
            <StyledTableCell align="left">{"Rate"}</StyledTableCell>
            <StyledTableCell align="left">
              {selectedServiceRate}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key={Math.random()}>
            <StyledTableCell align="left">{"Date"}</StyledTableCell>
            <StyledTableCell align="left">
              {appointmentBookingFormState.date}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key={Math.random()}>
            <StyledTableCell align="left">{"Service"}</StyledTableCell>
            <StyledTableCell align="left">
              {
                salonDetails.services.find(
                  (entry: any) =>
                    entry._id === appointmentBookingFormState.service
                )?.name
              }
              {}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key={Math.random()}>
            <StyledTableCell align="left">{"Time"}</StyledTableCell>
            <StyledTableCell align="left">
              {appointmentBookingFormState.timeSlot}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key={Math.random()}>
            <StyledTableCell align="left">{"Stylist"}</StyledTableCell>
            <StyledTableCell align="left">
              {
                salonDetails.staff.find(
                  (entry: any) =>
                    entry._id === appointmentBookingFormState.preference
                )?.fullname
              }
            </StyledTableCell>
          </StyledTableRow>{" "}
          <StyledTableRow key={Math.random()}>
            <StyledTableCell align="left">{"Salon Name"}</StyledTableCell>
            <StyledTableCell align="left">
              {salonDetails.salonName}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CheckoutDetails;
