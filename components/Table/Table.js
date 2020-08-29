import React from "react";
import PropTypes from "prop-types";
import { forwardRef } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableContainer from '@material-ui/core/TableContainer';

import Badge from "../Badge/Badge.js";
import moment from 'moment';

import Typography from '@material-ui/core/Typography';
// core components
import styles from "../jss/nextjs-material-kit/components/tableStyle.js";

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Paper from '@material-ui/core/Paper';

import Link from 'next/link';

const useStyles = makeStyles(styles);


function Row(props) {
  const { row, index, tableHeaderColor } = props;
  const [open, setOpen] = React.useState(false);
  
  const classes = useStyles();
  const link = `/user/${row.id}`;
  const numStepsOrDistanceChallenge = row.challenge.replace('M','').replace('S',''); 
  let icon = 'Do not know!';
  if(_.size(numStepsOrDistanceChallenge) > 3) {
    icon = parseInt(_.round(row.averageSteps)) > parseInt(numStepsOrDistanceChallenge) ? 'On Track!' : 'Keep going!'
  } else {
    icon = parseInt(_.round(row.totalDistance/(row.numDays) * 30)) > parseInt(numStepsOrDistanceChallenge) ? 'On Track!' : 'Keep going!'
  }
  
  return (
    <React.Fragment>
      <TableRow className={classes.tableHeadRow}>
        
        <TableCell><Badge color={tableHeaderColor}>{index}</Badge></TableCell>
        <TableCell className={classes.tableCell} component="th" scope="row">
        {<Link href={link} prefetch>
                      <a className={tableHeaderColor=='info' ? classes.linkInfo: classes.linkSuccess}>{row.name}</a></Link>}
        </TableCell>
        <TableCell className={classes.tableCell}>{row.team}</TableCell>
        <TableCell className={classes.tableCell}>{_.round(row.totalDistance)}</TableCell>
        
        <TableCell className={classes.tableCell}>{_.round(row.averageSteps)}</TableCell>
        <TableCell className={classes.tableCell}><Badge color={icon === 'Keep going!' ? "warning" : tableHeaderColor}>{icon}</Badge></TableCell>
        <TableCell className={classes.tableCell}>{row.lastUpdated ? moment(row.lastUpdated).fromNow() : 'No update'}</TableCell>
        <TableCell className={classes.tableCell}>{_.round(row.numDays)}</TableCell>
        <TableCell className={classes.tableCell}>{row.challenge.replace('M',' Miles').replace('S',' Steps')}</TableCell>
        
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography className={classes.tableCell} gutterBottom component="div">
                Recent Activity
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableCell}>Name</TableCell>
                    <TableCell className={classes.tableCell}>Description</TableCell>
                    <TableCell className={classes.tableCell}>Duration</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.recent.map((activityRow) => (
                    <TableRow key={activityRow.activity_id}>
                      <TableCell className={classes.tableCell}component="th" scope="row">
                        {activityRow.name}
                      </TableCell>
                      <TableCell className={classes.tableCell}>{activityRow.description}</TableCell>
                      <TableCell className={classes.tableCell}>{_.round(activityRow.duration/60000)} minutes</TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
         <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
        <TableRow className={classes.tableHeadRow}>
             
               
               {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={tableHeaderColor == 'info'? classes.tableHeadCellInfo :classes.tableHeadCellSuccess }
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
              
             </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <Row key={row.id} index={index+1} row={row} tableHeaderColor={tableHeaderColor} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}