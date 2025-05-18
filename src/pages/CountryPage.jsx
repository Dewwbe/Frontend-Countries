import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const CountryPage = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/alpha/${code}`
        );
        if (response.data && response.data.length > 0) {
          setCountry(response.data[0]);
        } else {
          setError("Country not found.");
        }
      } catch (err) {
        setError("Failed to fetch country data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchCountry();
    }
  }, [code]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!country) return <Typography>No country data found.</Typography>;

  const flagUrl = country.flags?.png || country.flags?.svg || "";

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        {/* Flag Image */}
        {flagUrl && (
          <CardMedia
            component="img"
            height="200"
            image={flagUrl}
            alt={`${country.name?.common} flag`}
            sx={{ objectFit: "contain", backgroundColor: "#f5f5f5" }}
          />
        )}

        {/* Country Details */}
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {country.name?.common || "Unknown"}
          </Typography>
          <Typography>
            <strong>Official Name:</strong>{" "}
            {country.name?.official || "N/A"}
          </Typography>
          <Typography>
            <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
          </Typography>
          <Typography>
            <strong>Region:</strong> {country.region || "N/A"}
          </Typography>
          <Typography>
            <strong>Subregion:</strong> {country.subregion || "N/A"}
          </Typography>
          <Typography>
            <strong>Population:</strong>{" "}
            {country.population?.toLocaleString() || "N/A"}
          </Typography>
          <Typography>
            <strong>Languages:</strong>{" "}
            {Object.values(country.languages || {}).join(", ") || "N/A"}
          </Typography>
          <Typography>
            <strong>Currencies:</strong>{" "}
            {Object.keys(country.currencies || {}).join(", ") || "N/A"}
          </Typography>
          <Typography>
            <strong>Area:</strong> {country.area || "N/A"} km²
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CountryPage;