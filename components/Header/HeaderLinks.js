/*eslint-disable*/
import React from "react";
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from '@material-ui/icons/Info';

import LinkIcon from '@material-ui/icons/Link';
// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";

import LinkOffIcon from '@material-ui/icons/LinkOff';
import Button from "../CustomButtons/Button.js";
// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import styles from "../jss/nextjs-material-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          buttonText="Tracker"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          hoverColor="info"
          buttonIcon={LinkIcon}
          dropdownList={[
            <Link href="/link">
              <a className={classes.dropdownLink}>Link your Fitbit</a>
            </Link>,
            <Link href="/revoke">
            <a className={classes.dropdownLink}>Revoke your Fitbit</a>
          </Link>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/info"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
        <InfoIcon className={classes.icons} /> Start here
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://dreammile.org"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          DreamMile X Home
        </Button>
      </ListItem>
    </List>
  );
}
