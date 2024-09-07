import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { SalonInformationType } from "../../../../types/salon";
import { ChangeEvent, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import StaffProfileForm from "./AddStaffForm";

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

function StaffList({
  mainSalonInformation,
  handleMainSalonInformationChange,
}: {
  mainSalonInformation: SalonInformationType;
  handleMainSalonInformationChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    path: string | string[]
  ) => void;
}) {
  const [selectedStaffProfileIndex, setSelectedStaffProfileIndex] =
    useState<number>(-1);
  const handleEdit = (index: number) => {
    setSelectedStaffProfileIndex(index);
  };

  const handleDelete = (index: number) => {
    setSelectedStaffProfileIndex(index);
  };

  return (
    <Box>
      {
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            disabled={mainSalonInformation.staff.length >= 4}
            onClick={() => {
              const e: any = {
                target: {
                  value: "hiii",
                },
              };
              handleMainSalonInformationChange(e, ["staff", "0", "fullname"]);
            }}
          >
            Add Staff
          </Button>
        </Box>
      }
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ height: 20 }}>
            <TableRow sx={{ height: 20 }}>
              <StyledTableCell>Avatar</StyledTableCell>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Specialties</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[0, 1, 2, 3].map((staff) => (
              <StyledTableRow key={staff}>
                <StyledTableCell>
                  <Avatar
                    src={mainSalonInformation.staff[staff].profilePic}
                    alt={mainSalonInformation.staff[staff].fullname}
                    // sx={{ width: 40, height: 40 }}
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {mainSalonInformation.staff[staff].fullname}
                </StyledTableCell>
                <StyledTableCell>
                  {mainSalonInformation.staff[staff].description}
                </StyledTableCell>
                <StyledTableCell>
                  <List dense>
                    {mainSalonInformation.staff[staff].specialties.map(
                      (specialty, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={specialty} />
                        </ListItem>
                        // <ListItem key={index}>{specialty}</ListItem>
                      )
                    )}
                  </List>
                </StyledTableCell>
                <StyledTableCell>
                  <Box sx={{ display: "flex" }}>
                    <IconButton
                      onClick={() => {
                        handleEdit(staff);
                      }}
                    >
                      <EditOutlinedIcon sx={{ color: "#D4740F" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handleDelete(staff);
                      }}
                    >
                      <DeleteOutlinedIcon sx={{ color: "#D4740F" }} />
                    </IconButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedStaffProfileIndex !== -1 && (
        <StaffProfileForm
          openAddStaffForm={selectedStaffProfileIndex !== -1}
          staffIndex={selectedStaffProfileIndex}
          handleMainSalonInformationChange={handleMainSalonInformationChange}
          mainSalonInformation={mainSalonInformation}
          setSelectedStaffProfileIndex={setSelectedStaffProfileIndex}
        />
      )}
    </Box>
  );
}

export default StaffList;
