import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People";
import classNames from "classnames";
// core components
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import Footer from "../components/Footer/Footer.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Button from "../components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardFooter from "../components/Card/CardFooter.js";
import CustomInput from "../components/CustomInput/CustomInput.js";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import styles from "../components/jss/nextjs-material-kit/pages/loginPage.js";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import CustomDropdown from "../components/CustomDropdown/CustomDropdown.js";
import Checkbox from "@material-ui/core/Checkbox";
// @material-ui/icons
import Check from "@material-ui/icons/Check";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

  const [name, setName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [challengeType, setChallengeType] = useState('');
  const [checked, setChecked] = React.useState([ 22]);
  function onSubmit(event) {
    event.preventDefault();
    console.log(name);
    console.log(teamName);
    console.log(event.currentTarget.name.value);
    console.log(event.currentTarget.teamName.value);
    const state = JSON.stringify({name:name, teamName: teamName, challengeType: challengeType})
    window.location.href=`https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22BVL5&redirect_uri=https%3A%2F%2Fdream-mile-x-activity-tracker.vercel.app%2Fapi%2Fuser_fitbit&scope=activity&expires_in=604800&state=${state}`
  }
  function handleTeamChange(event) {
    event.preventDefault();
    setTeamName(event.target.value)
  } 
  function handleNameChange(event) {
    event.preventDefault();
    setName(event.target.value)
  }
  function handleChallengeChange(value) {
    setChallengeType(value);
  }

  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const { ...rest } = props;
  const wrapperDiv = classNames(
    classes.checkboxAndRadio,
    classes.checkboxAndRadioHorizontal
  );
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Vibha DreamMileX"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('./images/running-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={onSubmit}>
                 
                  <p className={classes.divider}>Track your steps</p>
                  <CardBody>
                    <CustomInput
                      labelText="Display Name..."
                      id="name"
                      name="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Person className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                        
                      }}
                      formControlProps={{required: true}}
                      onChange= {handleNameChange}
                
                    />
                    <CustomInput
                      labelText="Team Name..."
                      id="teamName"
                      name="teamName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      
                      }}
                      onChange= {handleTeamChange}
                    />
                  <CustomDropdown
                  showSelected
                  dropdown
                  id="challengeType"
                  name="challengeType"
                  dropdownHeader="Select your DreammileX challenge"
                  buttonText="Challenge Type"
                  buttonProps={{
                    color: "info"
                  }}
                  hoverColor="info"
                  onClick={handleChallengeChange}
                  dropdownList={[
                    {select: true, value: "50K", displayLabel:"September 50 Kilometers"},
                    {select: true, value: "50M", displayLabel:"September 50 Miles"},
                    {select: true, value: "100K", displayLabel:"September 100 Kilometers"},
                    {select: true, value: "100M", displayLabel:"September 100 Miles"},
                    {select: true, value: "5000S", displayLabel:"5,000 Daily Steps Average"},
                    {select: true, value: "10000S", displayLabel:"10,000 Daily Steps Average"},
                    {select: true, value: "15000S", displayLabel:"15,000 Daily Steps Average"},
                    {select: true, value: "20000S", displayLabel:"20,000 Daily Steps Average"},
                  ]}
                  formControlProps={{required: true}}
          />

        <div className={classes.checkboxAndRadio}>
        <FormControlLabel
          control={
            <Checkbox
              tabIndex={-1}
              onClick={() => handleToggle(22)}
              checked={
                checked.indexOf(22) !== -1 ? true : false
              }
              checkedIcon={<Check className={classes.checkedIcon} />}
              icon={<Check className={classes.uncheckedIcon} />}
              classes={{ checked: classes.checked }}
            />
          }
          classes={{ label: classes.label }}
          label= "I am participating in Vibha Dream Mile X 2020."
        />
      </div>
      </CardBody>
      <CardFooter className={classes.cardFooter}>
        <Button type="submit" simple color="info" size="lg">
          Get started
        </Button>
      </CardFooter>
      </form>
       </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
