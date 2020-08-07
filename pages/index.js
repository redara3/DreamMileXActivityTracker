

import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from 'next/link';
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";

import styles from "../components/jss/nextjs-material-kit/pages/components.js";
const useStyles = makeStyles(styles);

export default function Index() {
  const classes = useStyles();
  return (
    <div>
      <Header
        brand="NextJS Material Kit"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
      />
    
    <Container maxWidth="sm">
      
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          DreamMileX Progress Information
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <a href='https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22BVL5&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fuser_fitbit&scope=activity&expires_in=604800'>Login with Fitbit</a>
       <br/>
      <a href='/api/user_fitbit?type=revoke'>Revoke Access to Fitbit</a>
       <br/>
       <a href='https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fuser_google&prompt=consent&response_type=code&client_id=22388002278-mk4alaek70jeh8qapqf9vnb7tec8uoo3.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.activity.read'>Login with Google</a>
       <br/>
        
      </Box>
    </Container>
    </div>
  );
}