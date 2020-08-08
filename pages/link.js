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


const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

  const [name, setName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [selectedEnabled, setSelectedEnabled] = useState("b");
  function onSubmit(event) {
    event.preventDefault();
    console.log(name);
    console.log(teamName);
    const state = JSON.stringify({name:name, teamName: teamName})
    window.location.href=`https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22BVL5&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fuser_fitbit&scope=activity&expires_in=604800&state=${state}`
  }
  function handleTeamChange(event) {
    event.preventDefault();
    setTeamName(event.target.value)
  } 
  function handleNameChange(event) {
    event.preventDefault();
    setName(event.target.value)
  }
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
        brand="NextJS Material Kit"
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
                      onChange= {handleNameChange}
                
                    />
                    <CustomInput
                      labelText="Team Name..."
                      id="teamName"
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

                <div className={wrapperDiv}>
          <FormControlLabel
          control={
            <Radio
              checked={selectedEnabled === "a"}
              onChange={() => setSelectedEnabled("a")}
              value="a"
              name="radio button enabled"
              aria-label="A"
              icon={
                <FiberManualRecord
                  className={classes.radioUnchecked}
                />
              }
              checkedIcon={
                <FiberManualRecord className={classes.radioChecked} />
              }
              classes={{
                checked: classes.radio
              }}
            />
          }
          classes={{
            label: classes.label
          }}
          label="First Radio"
        />
      </div>
      <div className={wrapperDiv}>
        <FormControlLabel
          control={
            <Radio
              checked={selectedEnabled === "b"}
              onChange={() => setSelectedEnabled("b")}
              value="b"
              name="radio button enabled"
              aria-label="B"
              icon={
                <FiberManualRecord
                  className={classes.radioUnchecked}
                />
              }
              checkedIcon={
                <FiberManualRecord className={classes.radioChecked} />
              }
              classes={{
                checked: classes.radio
              }}
            />
          }
          classes={{
            label: classes.label
          }}
          label="Second Radio"
        />
      </div>
      <div className={wrapperDiv}>
        <FormControlLabel
          disabled
          control={
            <Radio
              checked={false}
              value="a"
              name="radio button disabled"
              aria-label="B"
              icon={
                <FiberManualRecord
                  className={classes.radioUnchecked}
                />
              }
              checkedIcon={
                <FiberManualRecord className={classes.radioChecked} />
              }
              classes={{
                checked: classes.radio
              }}
            />
          }
          classes={{
            label: classes.label,
            disabled: classes.disabledCheckboxAndRadio
          }}
          label="Disabled Unchecked Radio"
        />
      </div>
      
      
                    
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="primary" size="lg">
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
