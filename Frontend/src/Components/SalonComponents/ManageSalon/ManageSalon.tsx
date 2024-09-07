import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import SalonLayout from "../../../shared/layout/SalonLayout";
import SalonForm from "./SalonDetailsForm/SalonForm";
import { useState } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import StaffList from "./ManageStaff/StaffList";
import {
  getSalonDetailsService,
  getServiceCategories,
  updateSalonDetailsService,
} from "../../../services/salons";
import { SalonInformationType } from "../../../types/salon";
import SalonGallery from "./ManageGallery/SalonGallery";
import { initialSalonInformationState } from "../../../constants/salon";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    centered
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    backgroundColor: "#D4740F",
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  "&.Mui-selected": {
    color: "#D4740F",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

function updateNestedState<T>(state: T, path: string[], value: any): T {
  if (path.length === 1) {
    return {
      ...state,
      [path[0]]: value,
    };
  }

  const [first, ...rest] = path;

  return {
    ...state,
    [first]: updateNestedState((state as any)[first], rest, value),
  };
}

function ManageSalon() {
  const [tabValue, setTabsValue] = useState(0);
  const [mainSalonInformation, setMainSalonInformation] =
    useState<SalonInformationType>(initialSalonInformationState);

  const handleTabsChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabsValue(newValue);
  };
  const [serviceCategories, setServiceCategories] = useState([]);

  async function getSalonInfoAndServiceCategories() {
    const salonInfo = await getSalonDetailsService();
    if (salonInfo) setMainSalonInformation(salonInfo);

    const serviceCategories = await getServiceCategories();
    if (serviceCategories) setServiceCategories(serviceCategories);
  }
  const handleMainSalonInformationChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    path: string | string[]
  ) => {
    const { value } = e.target;

    const pathArray = Array.isArray(path) ? path : [path];

    setMainSalonInformation((prevSalon) =>
      updateNestedState(prevSalon, pathArray, value)
    );
  };

  React.useEffect(() => {
    getSalonInfoAndServiceCategories();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateSalonDetailsService(mainSalonInformation);
  };
  return (
    <SalonLayout>
      <Typography variant="h5" sx={{ p: 2 }}>
        Manage Salon
      </Typography>
      <StyledTabs value={tabValue} onChange={handleTabsChange}>
        <StyledTab label="Salon" />
        <StyledTab label="Staff" />
        <StyledTab label="Gallery" />
      </StyledTabs>

      <Box component="form" onSubmit={handleSubmit}>
        <CustomTabPanel value={tabValue} index={0}>
          <SalonForm
            mainSalonInformation={mainSalonInformation}
            handleMainSalonInformationChange={handleMainSalonInformationChange}
            serviceCategories={serviceCategories}
          />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <StaffList
            mainSalonInformation={mainSalonInformation}
            handleMainSalonInformationChange={handleMainSalonInformationChange}
          />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          <SalonGallery
            mainSalonInformation={mainSalonInformation}
            handleMainSalonInformationChange={handleMainSalonInformationChange}
          />
        </CustomTabPanel>
        <Box
          sx={{
            mt: 3,
            mb: 3,
            display: "flex",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#d4740f", color: "#FFF" }}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            sx={{ border: "1px solid #d4740f", color: "#000" }}
            onClick={async () => {
              await getSalonInfoAndServiceCategories();
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </SalonLayout>
  );
}

export default ManageSalon;
