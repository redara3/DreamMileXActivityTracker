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

import Typography from '@material-ui/core/Typography';
// core components
import styles from "../jss/nextjs-material-kit/components/tableStyle.js";

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Paper from '@material-ui/core/Paper';

import Link from 'next/link';

const useStyles = makeStyles(styles);

// export default function CustomTable(props) {
//   const classes = useStyles();
//   const { tableHead, tableData, tableHeaderColor } = props;
//   const [open, setOpen] = React.useState(false);
//   return (
//     <div className={classes.tableResponsive}>
     
//       <Table className={classes.table}>
//         {tableHead !== undefined ? (
//           <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
//             <TableRow className={classes.tableHeadRow}>
//             <TableCell />
//               {tableHead.map((prop, key) => {
//                 return (
//                   <TableCell
//                     className={classes.tableCell + " " + classes.tableHeadCell}
//                     key={key}
//                   >
//                     {prop}
//                   </TableCell>
//                 );
//               })}
//             </TableRow>
//           </TableHead>
//         ) : null}
//         <TableBody>
//           {tableData.map((prop, key) => {
//             return (
//               <React.Fragment>
//               <TableRow key={key} className={classes.tableBodyRow}>
//                 <TableCell>
//                 <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//                 {prop.map((prop, key) => {
//                   return (
//                     <TableCell className={classes.tableCell} key={key}>
//                       {prop}
//                     </TableCell>
//                   );
//                 })}
//               </TableRow>
//               <TableRow>
//               <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box margin={1}>
//               <Typography gutterBottom component="div">
//                 Recent Activity
//               </Typography>
//               <Table size="small">
//                 <TableHead>
//                   <TableRow className={classes.tableBodyRow}>
//                     <TableCell className={classes.tableCell}>Description</TableCell>
//                     <TableCell className={classes.tableCell}>Name</TableCell>
//                     <TableCell className={classes.tableCell}>Duration</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {/* {prop.recent.map((activities) => (
//                     <TableRow key={activities.activityId}>
//                       <TableCell className={classes.tableCell} component="th" scope="row">
//                         {activities.description}
//                       </TableCell>
//                       <TableCell> className={classes.tableCell}{activities.name}</TableCell>
                      
//                     </TableRow>
//                   ))} */}
                  
//                     <TableRow>
//                       <TableCell className={classes.tableCell} component="th" scope="row">
//                         Running
//                       </TableCell>
                      
//                     </TableRow>
                  
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//               </TableRow>
//               </React.Fragment>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

// CustomTable.defaultProps = {
//   tableHeaderColor: "info"
// };

// CustomTable.propTypes = {
//   tableHeaderColor: PropTypes.oneOf([
//     "warning",
//     "primary",
//     "danger",
//     "success",
//     "info",
//     "rose",
//     "gray"
//   ]),
//   tableHead: PropTypes.arrayOf(PropTypes.string),
//   tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
// };




function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  
  const classes = useStyles();
  const link = `/user/${row.id}`;
  return (
    <React.Fragment>
      <TableRow className={classes.tableHeadRow}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className={classes.tableCell} component="th" scope="row">
        {<Link href={link}>
                      <a>{row.name}</a></Link>}
        </TableCell>
        <TableCell className={classes.tableCell}>{row.team}</TableCell>
        <TableCell className={classes.tableCell}>{row.challenge.replace('M',' Miles').replace('S',' Steps')}</TableCell>
        <TableCell className={classes.tableCell}>{_.round(row.totalDistance)}</TableCell>
        <TableCell className={classes.tableCell}>{_.round(row.totalSteps)}</TableCell>
        <TableCell className={classes.tableCell}>{_.round(row.averageSteps)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography className={classes.tableCell} gutterBottom component="div">
                Recent Activity
              </Typography>
              <Table size="small" aria-label="purchases">
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
        <TableHead>
        <TableRow className={classes.tableHeadRow}>
             <TableCell />
               {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
             </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}