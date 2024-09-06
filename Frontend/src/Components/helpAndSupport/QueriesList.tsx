import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  styled,
  TableCell,
  tableCellClasses,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axiosInstance from "../../config/axiosInstance";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import QueryPreview from "./QueryPreview";
import { helpAndSupportUrls } from "../../urls/urls";

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

interface Query {
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

const QueriesList: React.FC = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [error, setError] = useState<string>("");
  function handleCloseQueryPreview() {
    setSelectedQuery(null);
  }
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axiosInstance.get(
          helpAndSupportUrls.getSupportQueriesList
        );

        setQueries(response.data);
      } catch (error) {
        console.error("Error fetching queries:", error);
        setError("Failed to fetch queries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Your Support Queries
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ height: 20 }}>
            <TableRow sx={{ height: 20 }}>
              <StyledTableCell align="center">Id</StyledTableCell>
              <StyledTableCell align="center"> Subject</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queries.length > 0
              ? queries.map((query, index) => {
                  return (
                    <StyledTableRow key={query._id}>
                      <StyledTableCell align="center">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {query.subject}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {query.status}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <IconButton
                          onClick={() => {
                            setSelectedQuery(query);
                          }}
                        >
                          <RemoveRedEyeOutlinedIcon sx={{ color: "#D4740F" }} />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
        {queries.length <= 0 && (
          <Typography
            sx={{
              textAlign: "center",
              width: "100%",
              mt: 2,
              mb: 2,
            }}
          >
            No Queries Found
          </Typography>
        )}
      </TableContainer>
      {selectedQuery && (
        <QueryPreview
          selectedQuery={selectedQuery}
          handleClose={handleCloseQueryPreview}
        />
      )}
    </Box>
  );
};

export default QueriesList;
