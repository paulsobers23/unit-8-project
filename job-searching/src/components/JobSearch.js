import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Results from './Results';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function JobSearch() {
  const classes = useStyles();
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJob] = useState(null);
  const [err, setErr] = useState(null);
  


  const handleSumbit = (e) => {
    e.preventDefault();
    getData(position, location)
      .then((jobArr) => {
        setJob(jobArr);
      })
      .catch((err) => {
        err = "Sorry there was an error, please try again";
        setErr(err);
      });
  };

  return (
    <div>
      <form className={classes.root} onSubmit={handleSumbit}>
        <InputLabel htmlFor="position">Enter position</InputLabel>
        <Input
          id="position"
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="python"
        />
        <InputLabel htmlFor="location">Enter location</InputLabel>
        <Input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="new york"
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSumbit}
        >
          Search
        </Button>
      </form>
      <div id='row' className={classes.root}>
        {err && <p>{err}</p>}
        {jobs &&
          jobs.map((job) => {
            return (
              <React.Fragment key={job.id}>
                
                  <Card className={classes.root}>
                    <CardMedia
                      component="img"
                      src={job.company_logo}
                      alt="Company logo"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Job Title: {job.title}
                      </Typography>
  
                      <Typography gutterBottom variant="h5" component="h2">
                        Company Title: {job.company}
                      </Typography>
  
                      <Typography gutterBottom variant="h5" component="h2">
                        Location:{job.location}
                      </Typography>
                    </CardContent>
          
                    <CardActions>
                      <Link href={job.url}>Job link</Link>
                    </CardActions>
                    
                  </Card>
    
 
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
}

async function getData(position, location) {
  const url = `https://cors-anywhere.herokuapp.com/jobs.github.com/positions.json?description=${position}&location=${location}`;
  const response = await fetch(url);
  return await response.json();
}


export default JobSearch;

