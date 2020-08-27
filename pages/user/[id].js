


import React from 'react';
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from 'next/link';

import ChartistGraph from "react-chartist";
import Button from "../../components/CustomButtons/Button.js";
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
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import List from "@material-ui/icons/List";

// core components
import NavPills from "../../components/NavPills/NavPills.js";
import { makeStyles } from "@material-ui/core/styles";
import useSWR from 'swr';
import { useRouter } from 'next/router'
import _ from 'lodash';
import {
  dailyStepsChart,
  dailyDistanceChart
} from "../../lib/charts.js";

const fetcher = (url) => fetch(url).then((res) => res.json())



import styles from "../../components/jss/nextjs-material-kit/pages/landingPage.js";

const useStyles = makeStyles(styles);

export default function User() {
  const classes = useStyles();


  const onSync = async (e) => {
    const response = await fetch(`/api/user_fitbit/${fitbit_id}?type=sync`);
      
  }

  const { query } = useRouter()
  const { data, error } = useSWR(`/api/user_fitbit/${query.id}`, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  const fitbit_id = data.fitbit_id;
  const stepsData = {
    labels: !_.isEmpty(data.activities_steps) && data.activities_steps.length > 0 ? data.activities_steps.map(_.values):[],
    series: [_.values(data.activities_steps)]
  };
  const distanceData = {
    labels: !_.isEmpty(data.activities_distance) && data.activities_distance.length > 0 ? data.activities_distance.map(_.values): [],
    series:  [_.values(data.activities_distance)]
  }
  
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
      <Parallax filter responsive image={'/images/running-bg.jpg'}>
        <div className={classes.container}>
      {query.action === 'link' ? <SnackbarContent
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
            <GridItem xs={12} sm={12} md={12} lg={12} align='right'>
            <Button round color='info' onClick={onSync}>
                Sync Now
              </Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <Card>
              <NavPills
                color="info"
                tabs={[
                  {
                    tabButton: "Information",
                    tabIcon: Dashboard,
                    tabContent: (
                      <Card>
                      <CardHeader color="info">
                        <ul>
                          <li>Name: {data.displayName}</li>
                          <li>Team Name: {data.teamName}</li>
                          <li>Chalenge Type: {data.challengeType}</li>
                        </ul>
                     </CardHeader>
                     </Card> 
                    )
                  },
                  {
                    tabButton: "Distance",
                    tabIcon: Schedule,
                    tabContent: (
                      <Card>
            <CardHeader color="info">
            <ChartistGraph
                className="ct-chart"
                data={distanceData}
                type="Line"
                options={dailyDistanceChart.options}
                listener={dailyDistanceChart.animation}
              />
            </CardHeader>
            <CardBody color="success">
            <h4 className={classes.cardTitle}>Daily Distance</h4>
              <p className={classes.cardCategory}>Performance</p>
            </CardBody>
            
          </Card>
                    )
                  },
                  {
                    tabButton: "Steps",
                    tabIcon: List,
                    tabContent: (
                      <Card>
            <CardHeader color="info">
              <ChartistGraph
                className="ct-chart"
                data={stepsData}
                type="Bar"
                options={dailyStepsChart.options}
                listener={dailyStepsChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Steps</h4>
              <p className={classes.cardCategory}>Performance</p>
            </CardBody>
            
          </Card>
                    )
                  }
                ]}
              />
              </Card>
            </GridItem>
            
          </GridContainer>
        </div>
      </Parallax>
       


    </div>
  );
  
}

