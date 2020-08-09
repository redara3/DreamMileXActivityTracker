
// import { useRouter } from 'next/router'

// const User = () => {
//   const { query } = useRouter()
//   // console.log(query.id);
//   // return <a href='https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fuser_google&prompt=consent&response_type=code&client_id=22388002278-mk4alaek70jeh8qapqf9vnb7tec8uoo3.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.activity.read'>Login with Google</a>
    
// }

// export default User


import React from 'react';
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from 'next/link';
import Header from "../../components/Header/Header.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Parallax from "../../components/Parallax/Parallax.js";
import Table from "../../components/Table/Table.js";
import SnackbarContent from "../../components/Snackbar/SnackbarContent.js";
import Clearfix from "../../components/Clearfix/Clearfix.js";
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";
import useSWR from 'swr';
import { useRouter } from 'next/router'

const fetcher = (url) => fetch(url).then((res) => res.json())



import styles from "../../components/jss/nextjs-material-kit/pages/landingPage.js";

const useStyles = makeStyles(styles);

export default function User() {
  const classes = useStyles();
  const { query } = useRouter()
  const { data, error } = useSWR('/api/user_activity', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  console.log(data);
  return (
    <div>
      <Header
        color="transparent"
        brand="Vibha DreamMileX"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
      />
      <Parallax filter responsive image={'./images/running-bg.jpg'}>
        <div className={classes.container}>
      {query.action === 'revoke' ? <SnackbarContent
        message={
          <span>
            <b>SUCCESS ALERT:</b> You have successfully revoked your fitbit data tracking. Your data will be removed from the application.
          </span>
        }
        close
        color="success"
        icon={Check}
      /> : query.action === 'link' ? <SnackbarContent
      message={
        <span>
          <b>SUCCESS ALERT:</b> You have successfully linked your fitbit data tracking. Your id is {query.id}. Make a note of it.
        </span>
      }
      close
      color="success"
      icon={Check}
    />: ''}
      <Clearfix/>
      
        <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  {/* <ArrowUpward className={classes.upArrowCardCategory} /> 55% */}
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                {/* <AccessTime /> updated 4 minutes ago */}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                {/* <AccessTime /> campaign sent 2 days ago */}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                {/* <AccessTime /> campaign sent 2 days ago */}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
        </div>
      </Parallax>
       


    </div>
  );
  
}

