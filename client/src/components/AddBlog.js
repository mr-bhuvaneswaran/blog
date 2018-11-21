import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, AppBar, Toolbar, IconButton, Typography, Button, CircularProgress } from '@material-ui/core';
import Editor from './Editor';
import { Redirect } from 'react-router';
import ArrowBack from '@material-ui/icons/ArrowBack';
import axios from 'axios'



const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  root: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '90vh',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  }
});
class AddBlog extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      redirect:false,
      editor:'',
      title:'',
      image:'',
      progress:false

    }
  }
  backToHome = () =>{
    this.setState({redirect:true});
  };

  OnContextChange = html =>{
    this.setState({editor:html});
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = e =>{
    e.preventDefault();
    let image = this.state.image;
    let title = this.state.title.trim();
    if(!title){
        return;
    }
    if(!image){
      image = 'https://www.theblogstarter.com/wp-content/uploads/2014/02/4.jpg'
    }
    this.setState({progress:true});
    axios.post(`/api/blog`, { 
      title:title,
      image: image,
      comment:[],
      date:Date.now(),
      author:sessionStorage.getItem('uname'),
      context:this.state.editor,
      likes:0,
      dislikes:0,
      uid:sessionStorage.getItem('uid')
     }).then(res => {
      alert("Blog Published");
      this.setState({progress:false, redirect:true});
      }).catch(err=>{
        alert("Please Retry");
        this.setState({progress:false});
      });
  }
  render(){
    const {classes} = this.props;

    if (this.state.redirect) {
      return <Redirect push to="home" />;
    }
    if (sessionStorage.length === 0) {
      return <Redirect push to="/" />;
    }

    return (
      <div className={classes.root}>
      <AppBar position="fixed">
          <Toolbar>
            <IconButton onClick={this.backToHome} color="inherit" aria-label="Open drawer">
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              New Blog
            </Typography>
          </Toolbar>
        </AppBar>
      <main className={classes.content}>
      <div className={classes.toolbar} />
        <form  className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField
              id="outlined-full-width"
              label="Title"
              style={{ margin: 8 }}
              placeholder="Title goes here..."
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value = {this.state.title}
              onChange={this.handleChange('title')}
            />
            <TextField
              id="outlined-full-width"
              label="Image"
              style={{ margin: 8 }}
              placeholder="Thumbnail Image url"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value = {this.state.image}
              onChange={this.handleChange('image')}
            />
            <div style={{  display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>  
            { this.state.progress && <CircularProgress style={{margin: 'auto', position: 'relative'}} className={classes.progress} />}
              <Editor  OnContextChange={this.OnContextChange} placeholder={'Write something...'}></Editor>
              <div className={classes.toolbar} />
              <Button  type="submit" value="Post"  variant="contained" color="primary" >
                PUBLISH
              </Button>
            </div>  
        </form>
      </main>
      </div>
    );
  };  
};

AddBlog.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AddBlog);