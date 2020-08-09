

import React from 'react';
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardFooter from "../components/Card/CardFooter.js";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from 'next/link';
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Parallax from "../components/Parallax/Parallax.js";
import Table from "../components/Table/Table.js";
import { makeStyles } from "@material-ui/core/styles";
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())



import styles from "../components/jss/nextjs-material-kit/pages/landingPage.js";

const useStyles = makeStyles(styles);

export default function Index() {
  const classes = useStyles();
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
       <GridContainer>
         
       <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardBody>
              <Table
                
                tableHead={[
                  // { title: "ID", field: "id" },
                  { title: "Name", field: "name" },
                  { title: "Team", field: "team" },
                  { title: "Challenge", field: "challenge" },
                  { title: "Total Distance", field: "totalDistance" },
                  { title: "Total Steps", field: "totalSteps" }
                  
                ]}
                tableData={data}
              />
            </CardBody>
          </Card>
        </GridItem>
        </GridContainer>


    </div>
  );
  
}