import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import renderHTML from 'react-render-html';
import 'react-quill/dist/quill.snow.css'; 
import ArrowBack from '@material-ui/icons/ArrowBack';
import { IconButton, Paper } from '@material-ui/core';
import { Redirect } from 'react-router';
import CommentBox from './CommentBox';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});


class ViewBlog extends Component {
  state = {}
  constructor(props){
    super(props);
  this.state = {
    redirect:false
  }
  }
  backToHome = () =>{
    this.setState({redirect:true});
  }

  render(){
    const { classes } = this.props;
    const { feed } = this.props.location.state.feed;
    if (this.state.redirect) {
      return <Redirect push to="home" />;
    }
    if (sessionStorage.length === 0) {
      return <Redirect push to="/" />;
    }
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <IconButton onClick={this.backToHome} color="inherit" aria-label="Open drawer">
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {feed.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
        <div className={classes.toolbar} />
          <Paper className={classes.paper} style={{ padding: '20px', background : '#eeeeee'}}>
          {renderHTML(feed.context)}
          </Paper>
          <CommentBox feed={feed}></CommentBox>
        </main>
      </div>
    );
  }
}

ViewBlog.propTypes = {
  classes: PropTypes.object.isRequired,
  theme : PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme:true})(ViewBlog);