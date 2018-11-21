import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { Redirect } from 'react-router';
import axios from 'axios'
import { CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';


const styles = theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  register: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignUp extends React.Component {
  state = {
    progress:false,
    redirect:false,
    name:'',
    email:'',
    password:'',
    c_password:''
  }
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.state.password !== this.state.c_password){
      alert("Password din't match");
      return;
    }
    if(this.state.password.length < 8){
      alert("Password Too short");
      return;
    }
    axios.get(`/api/user`,{params:{type:"check",email:this.state.email}})
    .then((res)=>{
      if(res.data.length !== 0){
        alert("E-Mail already exists");
        return;
      }
      this.setState({progress:true});
      axios.post(`/api/user`, { 
        name:this.state.name,
        email: this.state.email,
        password: this.state.password
      }).then(res => {
        sessionStorage.setItem('uid',res.data._id);
        sessionStorage.setItem('uname',res.data.name);
        sessionStorage.setItem('uemail',res.data.email);
        this.setState({redirect:true});
        }).catch( err =>{
          alert("Please Retry");
          this.setState({progress:false});
      });
        
    })
    .catch(err=>{
      console.log(err,"due to validation");
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
            <InputLabel htmlFor="userName">Username</InputLabel>
            <Input id="userName" value = {this.state.name} onChange={this.handleChange('name')} name="userName" autoComplete="off" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input name="email" value = {this.state.email} onChange={this.handleChange('email')} id="email" autoComplete="off" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" value = {this.state.password} onChange={this.handleChange('password')} type="password" id="password" autoComplete="off" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="c_password"> Confirm Password</InputLabel>
            <Input name="c_password" value = {this.state.c_password} onChange={this.handleChange('c_password')} type="password" id="c_password" autoComplete="off" />
          </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.register}>
              SIGN UP
            </Button>
            { this.state.progress && <CircularProgress style={{marginTop: '10px', marginLeft: '50%'}} className={classes.progress} />}

        </form>
  );
  }
}
SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);