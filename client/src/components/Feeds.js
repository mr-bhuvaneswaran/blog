import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button } from '@material-ui/core';
import SingleFeed from './SingleFeed';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';
import axios from 'axios'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },  

  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 6,
  }
});


class Feeds extends React.Component {
  state = {
    data:[]
  };

  componentDidMount() {
    this.props.onRef(this)
    this.fillData();
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }  

  fillData = ()=>{
    axios.get(`/api/blog`)
      .then(res => {
        this.setState({data:res.data});
      }).catch((err)=>{
        console.log(err);
      });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} style={{overflowX: 'hidden'}}>
        <Link to='newBlog' style={{ textDecoration: 'none' }}>
          <Button variant="fab" className={classes.fab} color='primary'>
            {<AddIcon/>}
          </Button>
        </Link>  
        <Paper className={classes.paper} style={{background : '#eeeeee'}}>
          <Grid container alignItems="center" justify="center">
            <div style={{padding:'10px'}}>
              {this.state.data.length ===0 && <span>Loading...</span>}
            </div>
          </Grid>
          <Grid container spacing={16} style={{overflowX: 'hidden'}}>
              {this.state.data.map((feed,index)=>{
                return(<SingleFeed key={index} feed={feed}/>);
              })}
        </Grid>
        
      </Paper>

      </div>
    );
  }
}

Feeds.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Feeds);