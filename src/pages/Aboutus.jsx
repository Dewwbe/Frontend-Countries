import React from 'react';
import { Container, Grid, Typography, Box, Paper } from '@mui/material';
import CountryRhymesNavbar from '../components/CountryRhymesNavbar';
import Earth from '../components/Earth'; // Import the globe component

const AboutUs = () => {
  return (
    <>
      <CountryRhymesNavbar />
      
      {/* Orange Banner Section */}
      <Box
        sx={{
          display: 'flex',
          minHeight: '400px',
          width: '100%',
          backgroundColor: '#FF5B00',
          position: 'relative',
          overflow: 'hidden',
          py: 10,
          px: { xs: 4, md: 8 },
        }}
      >
        {/* Content area */}
        <Box sx={{ 
          maxWidth: '60%', 
          zIndex: 2,
          alignSelf: 'center'
        }}>
          <Typography variant="h3" fontWeight={700} color="white" mb={4}>
            Bringing the World Closer to You
          </Typography>
          <Typography variant="body1" color="white" mb={2}>
            Explore countries, chat with fellow travelers, and save your favorites.
          </Typography>
        </Box>
        
        {/* Interactive Globe */}
        <Box
          sx={{
            position: 'absolute',
            right: { xs: '5%', md: '10%' },
            top: '50%',
            transform: 'translateY(-50%)',
            height: { xs: '200px', md: '300px' },
            width: { xs: '200px', md: '300px' },
            zIndex: 1,
            opacity: 0.95,
            pointerEvents: 'none',
            '& canvas': {
              borderRadius: '50%',
              boxShadow: '0 0 20px rgba(255, 91, 0, 0.4)',
            }
          }}
        >
          <Earth />
        </Box>
      </Box>

      {/* White Content Section */}
      <Container maxWidth="xl">
        <Box sx={{ mt: 8, mb: 4 }}>
          {/* App Overview - Light orange box */}
          <Paper
            elevation={2}
            sx={{
              p: 4,
              mb: 6,
              backgroundColor: '#FFF0E6',
              borderRadius: '16px',
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h5" fontWeight={600} mb={2}>
                  🌍 App Overview
                </Typography>
                <Typography variant="body1">
                  Our application is an interactive platform powered by the REST Countries API, designed to help users explore the world in a user-friendly and informative way. Whether you're a traveler, student, or simply curious about other countries, the app offers a seamless experience for discovering detailed country information, chatting about your interests, and managing personal favorites. Built using modern React components and a dynamic UI, the app ensures an engaging and responsive experience across devices.
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Feature Sections */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: 4,
            justifyContent: 'space-between'
          }}>
            {/* Search Country */}
            <Paper
              elevation={2}
              sx={{
                p: 4,
                flex: 1,
                backgroundColor: '#FFF0E6',
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px rgba(255, 91, 0, 0.2)',
                }
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  bgcolor: '#FF5B00',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  mb: 2,
                }}
              >
                🔍
              </Box>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Search Country
              </Typography>
              <Typography variant="body1">
                Easily search for any country in the world using our intuitive search bar. Simply type the country's name and get instant results, including key details like capital, population, region, languages, and the national flag. The dynamic interface ensures results are updated without page refreshes, making your exploration smooth and fast.
              </Typography>
            </Paper>

            {/* Chat About Country */}
            <Paper
              elevation={2}
              sx={{
                p: 4,
                flex: 1,
                backgroundColor: '#FFF0E6',
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px rgba(255, 91, 0, 0.2)',
                }
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  bgcolor: '#FF5B00',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  mb: 2,
                }}
              >
                💬
              </Box>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Chat About Country
              </Typography>
              <Typography variant="body1">
                Join in conversations and share your thoughts about different countries. This feature fosters user interaction by allowing people to comment, discuss, or ask questions about specific countries. It adds a social layer to the app, turning it into more than just a directory — it's a global community of explorers and learners.
              </Typography>
            </Paper>

            {/* Favorite Country */}
            <Paper
              elevation={2}
              sx={{
                p: 4,
                flex: 1,
                backgroundColor: '#FFF0E6',
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px rgba(255, 91, 0, 0.2)',
                }
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  bgcolor: '#FF5B00',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  mb: 2,
                }}
              >
                ⭐
              </Box>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Favorite Country
              </Typography>
              <Typography variant="body1">
                Create your own personalized list of favorite countries. By logging in, users can bookmark countries they love or want to revisit later. Whether you're planning a trip or studying geography, the favorite list makes it easy to keep track of the nations that matter most to you.
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AboutUs;