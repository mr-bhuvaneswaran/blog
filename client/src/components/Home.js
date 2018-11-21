import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Drawer } from '@material-ui/core';
import Feeds from './Feeds';
import { Redirect } from 'react-router';
import SideMenu from './Menu';


const styles = theme => ({
  root: {
    width: '100%',
    height: '100%'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 'auto',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});

class Home extends React.Component {
  state = {
    side : false
  };

  toggleDrawer = () => {
    this.setState({
      side: !this.state.side
    });
  };

  updateFeed = ()=>{
    this.feedRef.fillData();
  }

  render() {
    const { classes } = this.props;
    if (sessionStorage.length === 0) {
      return <Redirect push to="/" />;
    }

    return (
      <div className={classes.root}>
        <Drawer open={this.state.side} onClose={this.toggleDrawer}>
          <div
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
            <SideMenu updateFeed={this.updateFeed}/>
          </div>
        </Drawer>
        <AppBar position="static" >
          <Toolbar >
            <IconButton onClick={this.toggleDrawer} className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Blogs
            </Typography>
            <div className={classes.grow} />
            <div title='Test Feature' className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div style={{padding: 8, overflowY : "auto", height: '87vh' }}>
        <Feeds onRef={ref => (this.feedRef = ref)}/>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);