import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Scan', 'Collect', 'Donate'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Scan Used Books or Collections';
    case 1:
      return 'Kitabu = book in Swahili';
    case 2:
      return 'Finalize Drop-off and Shipping Details';
    default:
      return 'Kitabu';
  }
}

export default function HorizontalLinearStepper(props) {
  const classes = useStyles();
  const activeStep = props.activeStep
  const steps = getSteps();
  if (props.preQueue) {
      return null
  }
  
  return (
    <div className={classes.root}>
      <Stepper activeStep={props.activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
    >
        {activeStep === steps.length ? (
    
        <Typography variant="h2">
            All steps completed - you&apos;re finished!
        </Typography>

        ) : (
        <Typography variant="h2">
           {getStepContent(props.activeStep)}
        </Typography>
        )}
        </Box>
    </div>
  );
}