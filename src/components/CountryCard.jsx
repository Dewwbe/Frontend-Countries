import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CardActions from "@mui/material/CardActions";
import { useNavigate } from "react-router-dom";

const CountryCard = ({ country, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Skip rendering if cca3 is missing
  if (!country?.cca3) return null;

  const commonName = country.name?.common || "Unknown";
  const population = country.population || 0;
  const region = country.region || "N/A";
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";
  const flag = country.flags?.png || country.flags?.svg || "";
  const capital = country.capital?.[0] || "N/A";

  const handleFavoriteClick = async (e) => {
    e.stopPropagation(); // Prevent card click from triggering
    await onToggleFavorite(country); // Await the API call
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        maxWidth: "340px",
        margin: "0 auto",
        justifyContent: "space-between",
        cursor: "pointer",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
      onClick={() => navigate(`/country/${country.cca3}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      elevation={3}
    >
      <CardMedia
        component="img"
        image={flag}
        alt={commonName}
        sx={{ 
          height: 140, 
          objectFit: "contain",
          transition: "transform 0.5s",
          "&:hover": {
            transform: "scale(1.05)"
          }
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "background-color 0.3s",
          backgroundColor: isHovered ? "rgba(0, 0, 0, 0.02)" : "transparent"
        }}
      >
        <Box>
          <Typography
            variant="h6"
            component="div"
            fontWeight={isHovered ? 700 : "bold"}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              transition: "font-weight 0.3s"
            }}
          >
            {commonName}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Population:</strong> {new Intl.NumberFormat().format(population)}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Region:</strong> {region}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Languages:</strong> {languages}
          </Typography>
          <Typography variant="body2">
            <strong>Capital:</strong> {capital}
          </Typography>
        </Box>
      </CardContent>
      
      {onToggleFavorite && (
        <CardActions disableSpacing sx={{ justifyContent: "flex-end", pt: 0 }}>
          <IconButton
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            onClick={handleFavoriteClick}
            color={isFavorite ? "error" : "default"}
            sx={{
              transition: "transform 0.2s, background 0.2s",
              "&:hover": {
                transform: "scale(1.2)",
                background: "rgba(255, 0, 0, 0.1)"
              }
            }}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default CountryCard;