


import React, {useState} from 'react';
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
import Badge from "../../components/Badge/Badge.js";
import Header from "../../components/Header/Header.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Parallax from "../../components/Parallax/Parallax.js";
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import InfoIcon from '@material-ui/icons/Info';
import Table from "../../components/Table/Table.js";
import SnackbarContent from "../../components/Snackbar/SnackbarContent.js";
import Clearfix from "../../components/Clearfix/Clearfix.js";
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
import moment from 'moment'
// core components
import NavPills from "../../components/NavPills/NavPills.js";
import { makeStyles } from "@material-ui/core/styles";
import useSWR from 'swr';
import { useRouter } from 'next/router'
import _ from 'lodash';
import CustomLinearProgress from "../../components/CustomLinearProgress/CustomLinearProgress.js";
import {
  dailyStepsChart,
  dailyDistanceChart
} from "../../lib/charts.js";

const fetcher = (url) => fetch(url).then((res) => res.json())



import styles from "../../components/jss/nextjs-material-kit/pages/landingPage.js";
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(styles);

export default function User() {
  const classes = useStyles();
  const router = useRouter(); 
  const [baseDate, setBaseDate] = useState('2021-10-01');
  const [syncStatus, setSyncStatus] = useState('');
  const onSync = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/user_fitbit/${fitbit_id}?type=sync&baseDate=${baseDate}`);
    const syncResponseObj = await response.json();
    setSyncStatus(syncResponseObj.status);
  }

  const { query } = useRouter()
  const { data, error } = useSWR(`/api/user_fitbit/${query.id}`, fetcher)

  if (error) return <div>
<SnackbarContent
        message={
          <span>
            Failed to load data for the user. Please try again.
          </span>
        }
        close
        color="warning"
      />
</div>
  if (!data) return <div><CustomLinearProgress
  variant="determinate"
  color="info"
  value={100}
  style={{ width: "35%", display: "inline-block" }}
/>
  <SnackbarContent
        message={
          <span>
            Loading Activity Data for the selected user. Please wait ...
          </span>
        }
        close
        color="info"
      />
</div>
  const fitbit_id = data.fitbit_id;
  const stepsData = {
    labels: !_.isEmpty(data.activities_steps) && data.activities_steps.length > 0 ? (data.activities_steps.map(_.values).slice(-10)):[],
    series: [_.values(data.activities_steps.slice(-10))]
  };
  const distanceData = {
    labels: !_.isEmpty(data.activities_distance) && data.activities_distance.length > 0 ? data.activities_distance.map(_.values).slice(-10): [],
    series:  [_.values(data.activities_distance).slice(-10)]
  }
  
  return (
    <div>
      <Header
        color="transparent"
        brand="Home"
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
   {syncStatus === 'success'? <SnackbarContent
        message={
          <span>
            <b>SUCCESS</b> You have successfully synced your activity data
          </span>
        }
        close
        color="success"
        icon={Check}
      /> : syncStatus === 'failure' ?
      
      <SnackbarContent
        message={
          <span>
            <b>WARNING </b> Failed to sync your data. You could revoke and link again.
          </span>
        }
        close
        color="warning"
        icon={Warning}/> : <div/>}
      <Clearfix/>
      
      <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={12} align='right'>
            <TextField
        id="baseDate"
        label="Start Date"
        type="date"
        defaultValue="2021-10-01"
        inputProps={{
          readOnly: true,
          disabled: true,
          className: classes.dateWhite
        }}
        InputLabelProps={{
          shrink: true,
          className: classes.dateWhite
        }}
      />
     
            <Button round color='info' onClick={onSync}>
                Sync Now 
              </Button>
              <Badge color="success">Last Updated: {data.lastUpdated ? moment(data.lastUpdated).fromNow() : 'No update'}</Badge>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <Card>
              <NavPills
                color="info"
                tabs={[
                  {
                    tabButton: "Information",
                    tabIcon: InfoIcon,
                    tabContent: (
                      
                      
                     <CardBody className={classes.cardCategory}>
                     <ul>
                          <li>Name: {data.displayName}</li>
                          <li>Team Name: {data.teamName}</li>
                          <li>Challenge Type: {data.challengeType.replace('M',' Miles').replace('S',' Steps')}</li>
                        </ul>
                     </CardBody>
                    
                    )
                  },
                  {
                    tabButton: "Distance",
                    tabIcon: DirectionsRunIcon,
                    tabContent: (
                      
            
            <CardBody>
            <ChartistGraph
                className="ct-chart"
                data={distanceData}
                type="Line"
                options={dailyDistanceChart.options}
                listener={dailyDistanceChart.animation}
              />
            </CardBody>
            
          
                    )
                  },
                  {
                    tabButton: "Steps",
                    tabIcon: DirectionsWalkIcon,
                    tabContent: (
                      
           
            <CardBody>
            <ChartistGraph
                className="ct-chart"
                data={stepsData}
                type="Bar"
                options={dailyStepsChart.options}
                listener={dailyStepsChart.animation}
              />
            </CardBody>
            
          
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

