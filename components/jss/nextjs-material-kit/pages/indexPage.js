import {
    successColor,
    whiteColor,
    grayColor,
    hexColorToRGB
  } from "../../nextjs-material-kit.js";


  
  const dashboardStyle = {
    successText: {
      color: successColor[0]
    },
    upArrowCardCategory: {
      width: "16px",
      height: "16px"
    },
    pageHeader: {
      minHeight: "100vh",
      height: "auto",
      display: "inherit",
      position: "relative",
      margin: "0",
      padding: "0",
      border: "0",
      alignItems: "center",
      "&:before": {
        background: "rgba(0, 0, 0, 0.5)"
      },
      "&:before,&:after": {
        position: "absolute",
        zIndex: "1",
        width: "100%",
        height: "100%",
        display: "block",
        left: "0",
        top: "0",
        content: '""'
      },
      "& footer li a,& footer li a:hover,& footer li a:active": {
        color: "#FFFFFF"
      },
      "& footer": {
        position: "absolute",
        bottom: "0",
        width: "100%"
      }
    },
    stats: {
      color: grayColor[0],
      display: "inline-flex",
      fontSize: "12px",
      lineHeight: "22px",
      "& svg": {
        top: "4px",
        width: "16px",
        height: "16px",
        position: "relative",
        marginRight: "3px",
        marginLeft: "3px"
      },
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        top: "4px",
        fontSize: "16px",
        position: "relative",
        marginRight: "3px",
        marginLeft: "3px"
      }
    },
    cardCategory: {
      color: grayColor[0],
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      paddingTop: "10px",
      marginBottom: "0"
    },
    cardCategoryWhite: {
      color: "rgba(" + hexColorToRGB(whiteColor) + ",.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitle: {
      color: grayColor[2],
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: grayColor[1],
        fontWeight: "400",
        lineHeight: "1"
      }
    },
    cardTitleWhite: {
      color: whiteColor,
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: grayColor[1],
        fontWeight: "400",
        lineHeight: "1"
      }
    }
  };
  
  export default dashboardStyle;