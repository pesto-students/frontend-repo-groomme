import { Box, Grid, Typography, Paper, IconButton } from "@mui/material";
import signUpConstants from "../../../constants/SignUp";
import CustomerIcon from "../../../assets/icons/SignUp/CustomerIcon";
import ProprietorIcon from "../../../assets/icons/SignUp/ProprietorIcon";

function AccountTypeSelection({
  setUserTypeFormvalue,
}: {
  setUserTypeFormvalue: (val: string) => void;
}) {
  const accountTypes = [
    {
      id: 1,
      accountType: "Salon",
      Icon: <ProprietorIcon />,
      val: "salon",
    },
    {
      id: 2,
      accountType: "Customer",
      Icon: <CustomerIcon />,
      val: "customer",
    },
  ];
  return (
    <Box
      sx={{
        height: { xs: "auto", md: "50vh" },
        width: "90%",
        maxWidth: "1200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 3,
      }}
    >
      <Grid container spacing={3} padding={2}>
        <Grid item xs={12}>
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", lg: "3rem" },
            }}
          >
            {signUpConstants.selectAccountType}
          </Typography>
        </Grid>

        <Grid item xs={12} container spacing={4} justifyContent="center">
          {accountTypes.map((type) => (
            <Grid
              item
              xs={12}
              sm={8}
              md={4}
              lg={3}
              display="flex"
              justifyContent="center"
              key={type.id}
            >
              <Paper
                elevation={3}
                sx={{
                  padding: 5,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  width: { xs: "100%", sm: "80%", md: "60%" },
                  height: "auto",
                  cursor: "pointer",
                }}
              >
                <IconButton
                  onClick={() => {
                    setUserTypeFormvalue(type.val);
                  }}
                >
                  {type.Icon}
                </IconButton>
                <Typography
                  variant="h5"
                  sx={{
                    mt: 2,
                    fontSize: {
                      xs: "1.25rem",
                      sm: "1.5rem",
                      lg: "1.75rem",
                    },
                  }}
                >
                  {type.accountType}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default AccountTypeSelection;
