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
import { useRouter } from 'next/router'

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const router = useRouter();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

  const [name, setName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [fitbitID, setFitbitID] = useState('');
  const [checked, setChecked] = React.useState([ 22]);
  const onSubmit = async (e) => {
    e.preventDefault();
      
      const response = await fetch(`/api/user_fitbit?type=revoke&fitbit_id=${fitbitID}`);
      const revokeResponseObj = await response.json();
      router.push(`/?id=${revokeResponseObj.fitbit_id}&action=${revokeResponseObj.action}&status=${revokeResponseObj.status}`);
   
  }

  function handleTeamChange(event) {
    event.preventDefault();
    setTeamName(event.target.value)
  } 
  function handleNameChange(event) {
    event.preventDefault();
    setName(event.target.value)
  }
  function handleFitbitIDChange(event) {
    event.preventDefault();
    setFitbitID(event.target.value)
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
                 
                  <p className={classes.divider}>Revoke Access</p>
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
                    <CustomInput
                      labelText="Fitbit ID"
                      id="fitbitID"
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
                      formControlProps={{required: true}}
                      onChange= {handleFitbitIDChange}
                    />
                

        <div className={classes.checkboxAndRadio}>
        <FormControlLabel
          control={
            <Checkbox
              formControlProps={{required: true}}
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
          label="I would like to revoke my fitbit activity data access now. My fitbit id is accurate."
        />
      </div>
      </CardBody>
      <CardFooter className={classes.cardFooter}>
        <Button type="submit" simple color="info" size="lg">
          Revoke my Access
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
