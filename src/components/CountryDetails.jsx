import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const CountryPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        setCountry(response.data[0]);
      } catch (error) {
        console.error("Error fetching country details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [name]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!country) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography variant="h4">Country not found</Typography>
      </Box>
    );
  }

  const {
    flags,
    name: countryName,
    capital,
    region,
    population,
    languages,
  } = country;

  return (
    <Container sx={{ mt: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Button 
        variant="outlined" 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate("/")}
        sx={{ alignSelf: "flex-start", mb: 3, fontSize: "1.1rem", py: 1 }}
      >
        Back
      </Button>
      <Card sx={{ width: "100%", maxWidth: 800, boxShadow: 3 }}>
        <CardMedia 
          component="img" 
          height="400" 
          image={flags?.png} 
          alt={countryName?.common} 
        />
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: "bold" }}>
            {countryName?.common}
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Official Name: {countryName?.official}
          </Typography>
          <Typography variant="h5" sx={{ my: 1 }}>
            Capital: {capital?.[0]}
          </Typography>
          <Typography variant="h5" sx={{ my: 1 }}>
            Region: {region}
          </Typography>
          <Typography variant="h5" sx={{ my: 1 }}>
            Population: {population.toLocaleString()}
          </Typography>
          <Typography variant="h5" sx={{ my: 1 }}>
            Languages: {languages ? Object.values(languages).join(", ") : "N/A"}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CountryPage;