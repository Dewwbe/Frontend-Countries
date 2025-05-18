import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Container,
  TextField,
  MenuItem,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import CountryRhymesNavbar from '../components/CountryRhymesNavbar';
import CountryCard from "../components/CountryCard";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filterType, setFilterType] = useState("region");
  const [filterValue, setFilterValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const email = localStorage.getItem("email");

  // Region and language lists
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const languages = [
    "Spanish", "English", "French", "German", "Italian", "Portuguese", "Russian",
    "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Urdu", "Bengali", "Turkish",
    "Persian", "Greek", "Polish", "Dutch", "Swahili", "Coptic"
  ];

  // --- API Fetch Functions ---
  const fetchAllCountries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all ");
      setCountries(response.data);
    } catch (err) {
      console.error("Failed to load countries", err);
      setError("Failed to load country data");
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountriesByName = async (name) => {
    if (!name.trim()) return fetchAllCountries();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
      setCountries(response.data);
    } catch (err) {
      console.error("Failed to search by name", err);
      setError("No matching country found");
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountriesByRegion = async (region) => {
    if (!region) return fetchAllCountries();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
      setCountries(response.data);
    } catch (err) {
      console.error("Failed to filter by region", err);
      setError("Failed to load region data");
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountriesByLanguage = async (lang) => {
    if (!lang) return fetchAllCountries();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/lang/${lang}`);
      setCountries(response.data);
    } catch (err) {
      console.error("Failed to filter by language", err);
      setError("Failed to load language data");
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    if (!email) return;
    try {
      const res = await axios.get(`http://localhost:5555/api/favorites/${email}`);
      const favCodes = res.data.favorites.map(f => f.country.cca3);
      setFavorites(favCodes);
    } catch (err) {
      console.error("Failed to load favorites", err);
    }
  };

  const toggleFavorite = async (country) => {
    if (!email) {
      alert("Please log in to add favorites");
      return;
    }

    const isFav = favorites.includes(country.cca3);

    try {
      if (isFav) {
        await axios.post("http://localhost:5555/api/favorites/remove", {
          email,
          cca3: country.cca3,
        });
        setFavorites(prev => prev.filter(code => code !== country.cca3));
      } else {
        const sanitizedCountry = {
          name: country.name.common,
          cca3: country.cca3,
          capital: country.capital || [],
          region: country.region || "",
          population: country.population || 0,
          languages: country.languages || {},
          flags: country.flags || {},
        };

        await axios.post("http://localhost:5555/api/favorites/add", {
          email,
          country: sanitizedCountry,
        });
        setFavorites(prev => [...prev, country.cca3]);
      }
    } catch (err) {
      console.error("Error updating favorite", err);
    }
  };

  // --- UI Events ---
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);

    if (!value) return fetchAllCountries();

    filterType === "region"
      ? fetchCountriesByRegion(value)
      : fetchCountriesByLanguage(value);
  };

  // Reset filterValue when filterType changes
  useEffect(() => {
    setFilterValue("");
  }, [filterType]);

  // Initial fetch
  useEffect(() => {
    fetchAllCountries();
    fetchFavorites();
  }, []);

  return (
    <>
      <CountryRhymesNavbar />
      <Container sx={{ mt: 4 }}>
        {/* Search Bar */}
        <TextField
          label="Search by name"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => fetchCountriesByName(e.target.value)}
        />

        {/* Filter Type Selector */}
        <TextField
          select
          label="Filter Type"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          sx={{ mb: 2 }}
          fullWidth
        >
          <MenuItem value="region">Region</MenuItem>
          <MenuItem value="language">Language</MenuItem>
        </TextField>

        {/* Dynamic Filter Dropdown */}
        <TextField
          select
          label={filterType === "region" ? "Select Region" : "Select Language"}
          value={filterValue}
          onChange={handleFilterChange}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="">All {filterType === "region" ? "Regions" : "Languages"}</MenuItem>
          {(filterType === "region" ? regions : languages).map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        {/* Country Cards */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center" sx={{ mt: 4 }}>
            {error}
          </Typography>
        ) : countries.length === 0 ? (
          <Typography align="center" sx={{ mt: 4 }}>
            No countries found.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {countries.map((country) => (
              <Grid item xs={12} sm={6} md={4} key={country.cca3}>
                <CountryCard
                  country={country}
                  isFavorite={favorites.includes(country.cca3)}
                  onToggleFavorite={() => toggleFavorite(country)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Home;