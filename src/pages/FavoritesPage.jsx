import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CountryRhymesNavbar from '../components/CountryRhymesNavbar';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const email = localStorage.getItem("email");

  // Fetch favorites from backend
  const fetchFavorites = async () => {
    if (!email) {
      setError("Please log in to view favorites");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`https://backend-countries-vl3u.onrender.com/api/favorites/${email}`);
      setFavorites(res.data.favorites || []);
    } catch (err) {
      console.error("Failed to load favorites", err);
      setError("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  // Remove favorite
  const removeFavorite = async (cca3) => {
    try {
      await axios.post("https://backend-countries-vl3u.onrender.com/api/favorites/remove", {
        email,
        cca3,
      });
      setFavorites(prev => prev.filter(fav => fav.country.cca3 !== cca3));
    } catch (err) {
      console.error("Error removing favorite", err);
      alert("Failed to remove favorite");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Show loading spinner
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Show error or empty state
  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!favorites.length) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          🌟 No Favorites Yet
        </Typography>
        <Typography align="center">
          Add countries to your favorites from the home page to see them here.
        </Typography>
      </Container>
    );
  }

  return (
    <>
    <CountryRhymesNavbar/>
    <Container sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        🌟 Your Favorite Countries
      </Typography>

      <Grid container spacing={3}>
        {favorites.map((fav) => {
          const country = fav.country;
          return (
            <Grid item xs={12} sm={6} md={4} key={country.cca3}>
              <Card sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                transition: "transform 0.3s",
                '&:hover': {
                  transform: "scale(1.02)",
                }
              }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={country.flags?.png || country.flags?.svg || ""}
                  alt={country.name?.common || "Flag"}
                  sx={{ objectFit: "contain" }}
                />
                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {country.name?.common || "Unknown"}
                  </Typography>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Region:</strong> {country.region || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Population:</strong> {country.population?.toLocaleString() || "N/A"}
                    </Typography>
                  </Box>
                </CardContent>
                <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton
                    color="error"
                    onClick={() => removeFavorite(country.cca3)}
                    sx={{ mr: 1 }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
    </>
  );
};

export default FavoritesPage;