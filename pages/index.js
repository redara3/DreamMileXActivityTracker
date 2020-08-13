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
import SnackbarContent from "../components/Snackbar/SnackbarContent.js";
import Clearfix from "../components/Clearfix/Clearfix.js";
import Pagination from "../components/Pagination/Pagination.js";
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";
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
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
        
            <CardBody>
              <h4 className={classes.cardTitle}>Highest Distance</h4>
              <p className={classes.cardCategory}>
                
                {_.maxBy(data, 'totalDistance').name}
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
              {_.maxBy(data, 'totalDistance').totalDistance}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            
            <CardBody>
            <h4 className={classes.cardTitle}>Highest Steps</h4>
              <p className={classes.cardCategory}>
                
                {_.maxBy(data, 'totalSteps').name}
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
              {_.maxBy(data, 'totalSteps').totalSteps}
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
                tableHeaderColor = "info"
                tableHead={[
                  // { title: "ID", field: "id" },
                  { title: "Name", field: "name", cellStyle: {
                    color: "inherit",
                  }, headerStyle: {
                    backgroundColor: '#039be5',
                  } },
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