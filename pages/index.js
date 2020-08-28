import React from 'react';
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardFooter from "../components/Card/CardFooter.js";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Parallax from "../components/Parallax/Parallax.js";
import Table from "../components/Table/Table.js";
import SnackbarContent from "../components/Snackbar/SnackbarContent.js";
import Clearfix from "../components/Clearfix/Clearfix.js";
import Pagination from "../components/Pagination/Pagination.js";
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";

import ArrowUpward from "@material-ui/icons/ArrowUpward";
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import Footer from "../components/Footer/Footer.js";

import ArrowDownward from "@material-ui/icons/ArrowDownward";
import _ from 'lodash'
import useSWR from 'swr';
import { useRouter } from 'next/router'
const fetcher = (url) => fetch(url).then((res) => res.json())



import styles from "../components/jss/nextjs-material-kit/pages/landingPage.js";

const useStyles = makeStyles(styles);

export default function Index() {
  const classes = useStyles();
  

  const { query } = useRouter()
  const { data, error } = useSWR('/api/user_activity', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  
  const challenges = _.map(data, 'challenge');

  return (
    <div>
      <Header
        color="transparent"
        brand="DreamMile X Tracker Home"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
      />
      <Parallax filter responsive image={'./images/running-bg.jpg'}>
        <div className={classes.container}>
        {query.action === 'revoke' &&  query.status === 'success'? <SnackbarContent
        message={
          <span>
            <b>SUCCESS</b> You have successfully revoked your fitbit data tracking. Your data will be removed from the application.
          </span>
        }
        close
        color="success"
        icon={Check}
      /> : query.action === 'revoke' &&  query.status === 'failure' ?
      
      <SnackbarContent
        message={
          <span>
            <b>WARNING </b> Failed to revoke your fitbit with ID: {query.id} data tracking.
          </span>
        }
        close
        color="warning"
        icon={Warning}/> : <div/>}
      
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
      {challenges.map(challenge => (
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color=
              {challenge.indexOf('M') == -1 ? "info": "success"}>
              {challenge.indexOf('M') == -1 ? <DirectionsWalkIcon/> : <DirectionsRunIcon/> } <h3 className={classes.cardTitle}>Dream Mile X Challenge: {challenge.replace('M',' Miles').replace('S',' Steps')}</h3>
             
            </CardHeader>
            <CardBody >
               <p className={classes.cardCategory}>
                <ul>
                <li>Leader: {_.maxBy(_.find(data, {challenge:challenge}).users, 'totalDistance').name}</li>
                <li>Total Distance: {_.round(_.maxBy(_.find(data, {challenge:challenge}).users, 'totalDistance').totalDistance)} Miles</li>
                <li>Average Daily Steps: {_.round(_.maxBy(_.find(data, {challenge:challenge}).users, 'averageSteps').averageSteps)}</li>
                </ul>
              </p>
            </CardBody>
            
          </Card>
        </GridItem>
        
        
      
      ))}
      </GridContainer>
        </div>
      </Parallax>
      {challenges.map(challenge => (
       <GridContainer>
         
       <GridItem xs={12} sm={12} md={12}>
          <Card>
          <CardHeader color=
              {challenge.indexOf('M') == -1 ? "info": "success"}>
            {challenge.indexOf('M') == -1 ? <DirectionsWalkIcon/> : <DirectionsRunIcon/> }<h4 className={classes.cardTitleWhite}>Challenge: {challenge.replace('M',' Miles').replace('S',' Steps')}</h4>
            
          </CardHeader>
            <CardBody>
              <Table
                tableHead={[ "Name", "Team", "Challenge", "Total Distance (Miles)", "Total Steps", "Average Daily Steps"]}
                tableData={_.map(_.find(data, {challenge:challenge}).users)}
              />



            </CardBody>
          </Card>
        </GridItem>
        </GridContainer>
))}
<Footer whiteFont />
    </div>
  );
  
}