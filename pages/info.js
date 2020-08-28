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
        brand="Home"
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
            <GridItem xs={12} sm={6} md={8} lg={6}>
            <h1 className={classes.title}>Your DreamMile X Journey Starts With Us.</h1>
              <h4>
                Get motivated to give your best! It will take just a few moments to get started. <br/>
                <ul>
                  <li>Download the Fitbit app on your phone.</li>
                  <li>If you have a Fitbit tracker, you can link your device to this app right now. <a className={classes.linkWhite} href="/link"> Link Now</a></li>
                  <li>If you dont have a Fitbit device or tracker, you can still join us. <br/>In the Fitbit app, click on your avatar at the top left hand corner.
                On the next screen, Select "Set up a Device". Pick MobileTrack. Now, if you have your phone in your hand, the steps and distance will be automatically tracked.</li>
                <li>Follow the same steps as any other fitbit user by clicking here <a className={classes.linkWhite} href="/link"> Link </a></li>
                  </ul>
                  
                  <h2 className={classes.title}>Disclaimer</h2>
                  <p>
                  <h3 className={classes.title}>PROMOTE SAFETY AND SECURITY </h3>

                    We use the information we collect to help motivate Vibha DreamMile X participants only. We do not save any personal information or authentication information.
                    The tracker application collects activity data for the time period specified only. We will not personally contact you via email or other means of advertising.
                    Stay safe and active!
                  </p>
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
