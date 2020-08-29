import React from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from '@material-ui/icons/Error';
import styles from "../jss/nextjs-material-kit/components/cardBodyStyle.js";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(styles);

const ComponentError = ({ title, subtitle }) => {
  const classes = useStyles();
  
  return (
    <div>
      <ErrorIcon />
      <div>
        <span className={classes.cardBody}>{title}</span>
        <span className={classes.cardBody}>{subtitle}</span>
      </div>
    </div>
  );
};
ComponentError.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};
ComponentError.defaultProps = {
  subtitle: '',
};

export default ComponentError;
