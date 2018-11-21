import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';


const styles = theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  login: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      progress:false,
      redirect:false,
      email:'',
      password:'',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    this.setState({progress:true});
    axios.get(`/api/user`,{params:{type:"validate",email:this.state.email,password:this.state.password}})
    .then((res)=>{
      if(res.data.email === ''){
        alert("Invalid credentials");
        this.setState({progress:false});
        return;
      }
      sessionStorage.setItem('uid',res.data._id);
      sessionStorage.setItem('uname',res.data.name);
      sessionStorage.setItem('uemail',res.data.email);
      this.setState({redirect:true});   
    });
  }  

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value.trim(),
    });
  };

  render(){
  const { classes } = this.props;
  
  if (this.state.redirect) {
    return <Redirect push to="home" />;
  }
    return (
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" value = {this.state.email} onChange={this.handleChange('email')} name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" value = {this.state.password} onChange={this.handleChange('password')} type="password" id="password" autoComplete="current-password" />
            </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.login}>
                Sign in
              </Button>
              { this.state.progress && <CircularProgress style={{marginTop: '10px', marginLeft: '50%'}} className={classes.progress} />}
          </form>
    );
  }
};

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);