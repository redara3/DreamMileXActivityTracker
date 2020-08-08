

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
import Table from "../components/Table/Table.js";
import { makeStyles } from "@material-ui/core/styles";


import styles from "../components/jss/nextjs-material-kit/pages/indexPage.js";

const useStyles = makeStyles(styles);

export default function Index() {
  const classes = useStyles();
  return (
    <div>
       <GridContainer>
         <GridItem xs={12} sm={12} md={12}>
      <Header
        brand="NextJS Material Kit"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
      />
     </GridItem>
       <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
        </GridContainer>


    </div>
  );
  
}