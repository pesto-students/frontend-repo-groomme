import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";
import CustomerLayout from "../../../shared/layout/CustomerLayout";
import { useEffect, useState } from "react";
import { getSalonsListService } from "../../../services/salons";
import SalonCard from "./SalonCard";
import FilterBox from "./FilterBox";
import { getCustomerLocation } from "../../../helpers/getCustomerLocation";
import LocationDeniedModal from "./LocationDeniedModal";
import { SalonInformationType } from "../../../types/salon";

type SortDirection = "asc" | "desc";
function SalonsList() {
  const [salonList, setSalonList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [distanceRange, setDistanceRange] = useState<any>([0, 0]);
  const [rateRange, setRateRange] = useState<any>([0, 0]);
  const [sortBy, setSortBy] = useState("distance");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  useEffect(() => {
    if (salonList.length > 0) {
      const maxDistance = Math.max(
        ...salonList.map((salon) => (salon as any).distance)
      );
      const maxRate = Math.max(
        ...salonList.flatMap((salon: SalonInformationType) =>
          salon.services.map((service) => service.rate)
        )
      );

      setDistanceRange([0, maxDistance]);
      setRateRange([0, maxRate]);
    }
  }, [salonList]);

  const cities = [
    ...new Set(
      salonList.map((salon: SalonInformationType) => salon.address.city)
    ),
  ];
  const categories = [
    ...new Set(
      salonList.flatMap((salon: SalonInformationType) =>
        salon.services.map((service) => service.category)
      )
    ),
  ];
  const clearFilters = () => {
    setCity("");
    setCategory("");

    setSortBy("distance");
    setSortDirection("asc");
    const maxDistance = Math.max(
      ...salonList.map((salon) => (salon as any).distance)
    );
    const maxRate = Math.max(
      ...salonList.flatMap((salon: SalonInformationType) =>
        salon.services.map((service) => service.rate)
      )
    );

    setDistanceRange([0, maxDistance]);
    setRateRange([0, maxRate]);
  };

  const applyFiltersAndSorting = () => {
    let filteredSalons = salonList;

    if (city) {
      filteredSalons = filteredSalons.filter((salon: SalonInformationType) =>
        salon.address.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (category) {
      filteredSalons = filteredSalons.filter((salon: SalonInformationType) =>
        salon.services.some((service) =>
          service.category.toLowerCase().includes(category.toLowerCase())
        )
      );
    }

    filteredSalons = filteredSalons.filter(
      (salon: any) =>
        salon.distance >= distanceRange[0] && salon.distance <= distanceRange[1]
    );

    filteredSalons = filteredSalons.filter((salon: SalonInformationType) =>
      salon.services.some(
        (service) =>
          service.rate >= rateRange[0] && service.rate <= rateRange[1]
      )
    );

    const sortMultiplier = sortDirection === "desc" ? -1 : 1;

    if (sortBy === "city") {
      filteredSalons.sort(
        (a: SalonInformationType, b: SalonInformationType) =>
          a.address.city.localeCompare(b.address.city) * sortMultiplier
      );
    } else if (sortBy === "distance") {
      filteredSalons.sort(
        (a: any, b: any) => (a.distance - b.distance) * sortMultiplier
      );
    } else if (sortBy === "rate") {
      filteredSalons.sort(
        (a: SalonInformationType, b: SalonInformationType) => {
          const minRateA = Math.min(
            ...a.services.map((service) => service.rate)
          );
          const minRateB = Math.min(
            ...b.services.map((service) => service.rate)
          );
          return (minRateA - minRateB) * sortMultiplier;
        }
      );
    }

    return filteredSalons;
  };

  async function getSalonList() {
    try {
      const userPosition = await getCustomerLocation();
      const { longitude, latitude } = userPosition.coords;
      const customerPosition: {
        longitude: number;
        latitude: number;
      } = {
        longitude,
        latitude,
      };

      const list = await getSalonsListService(customerPosition);

      setSalonList(list);
    } catch (error: any) {
      console.error("error getSalonList", error);

      setModalOpen(true);
    }
  }
  useEffect(() => {
    getSalonList();
  }, []);

  return (
    <CustomerLayout>
      <Box padding={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}></Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          m: 2,
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4">Find Your Perfect Salon</Typography>
          <Typography variant="body1">{`${
            applyFiltersAndSorting().length
          } Salons Found`}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">Sort by: </Typography>
          <TextField
            size="small"
            select
            fullWidth
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            variant="outlined"
            sx={{ width: 200 }}
          >
            <MenuItem value="city">City Name</MenuItem>
            <MenuItem value="distance">Distance</MenuItem>
            <MenuItem value="rate">Rate</MenuItem>
          </TextField>{" "}
          <TextField
            size="small"
            select
            fullWidth
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value as SortDirection)}
            variant="outlined"
            sx={{ width: 200 }}
          >
            <MenuItem value="asc">
              {sortBy === "city"
                ? "A - Z"
                : sortBy === "rate"
                ? "Low to High"
                : sortBy === "distance"
                ? "Min to Max"
                : "Asc"}
            </MenuItem>
            <MenuItem value="desc">
              {sortBy === "city"
                ? "Z - A"
                : sortBy === "rate"
                ? "High to Low"
                : sortBy === "distance"
                ? "Max to Min"
                : "Desc"}
            </MenuItem>
          </TextField>
        </Box>
      </Box>
      <Box
        sx={{
          minHeight: "90vh",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          p: 2,
          gap: 1,
        }}
      >
        <Box sx={{ width: "20%", height: "100%" }}>
          <FilterBox
            city={city}
            setCity={setCity}
            cities={cities}
            category={category}
            setCategory={setCategory}
            categories={categories}
            distanceRange={distanceRange}
            setDistanceRange={setDistanceRange}
            salonList={salonList}
            rateRange={rateRange}
            setRateRange={setRateRange}
            clearFilters={clearFilters}
          />
        </Box>
        <Box sx={{ width: "80%", height: "100%" }}>
          {applyFiltersAndSorting().length > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
              }}
            >
              {applyFiltersAndSorting().map((salon: SalonInformationType) => {
                return <SalonCard key={salon._id} salon={salon} />;
              })}
            </Box>
          ) : (
            <Typography sx={{ textAlign: "center", mt: 3 }}>
              No Salons Found at your Location. Please try another location.
            </Typography>
          )}
        </Box>
      </Box>
      {modalOpen && (
        <LocationDeniedModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
    </CustomerLayout>
  );
}

export default SalonsList;
