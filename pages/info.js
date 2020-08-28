import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import Footer from "../components/Footer/Footer.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";

import styles from "../components/jss/nextjs-material-kit/pages/loginPage.js";


const useStyles = makeStyles(styles);

export default function InfoPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
   setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

  
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="DreamMile X Tracker Home"
        rightLinks={<HeaderLinks />}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('./images/running-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
            <h1 className={classes.title}>Your Monthlong DreamMile X Journey Starts With Us.</h1>
              <h4>
                Get motivated to give your best! Download the Fitbit app on your phone. 
                If you have a Fitbit tracker, you can link your device to this app <a href="/link"> Link Now</a>
                <br/>If you dont have a Fitbit device or tracker, you can still join us. In the Fitbit app, click on your avatar at the top left hand corner.
                On the next screen, Select "Set up a Device". Pick MobileTrack. Now, if you have your phone in your hand, the steps and distance will be automatically tracked.
                Follow the same steps as any other fitbit user by clicking here <a href="/link"> Link </a>
              </h4>
              <br />
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
