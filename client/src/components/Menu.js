import React, { Component } from 'react'
import { List, ListItem, ListItemIcon, ListItemText, Divider, Avatar, Grid } from '@material-ui/core';
import RssFeed from '@material-ui/icons/RssFeed';
import Input  from '@material-ui/icons/Input';

import AccountCircle from '@material-ui/icons/AccountCircle';

class SideMenu extends Component {

  logout=()=>{
    sessionStorage.clear();
  }
  
  render() {
    const sideList = (
        <div style={{width: 250}}>
          <Grid style={{ height: '100px', backgroundColor: '#4c91bb'}} container direction="row" justify="center" alignItems="center">
            <Avatar style={{    width: '80px',height: '80px'}}>
                <AccountCircle></AccountCircle>    
            </Avatar> 
          </Grid>
          <Grid style={{background: '#4c91bb', color: 'white',fontWeight: 'bold'}} container direction="row" justify="center" alignItems="center">
            <div style={{padding:'10px'}}>
              {sessionStorage.getItem('uname')}
            </div>
          </Grid>
          <Divider />
          <List>
              <ListItem button >
               <ListItemIcon><RssFeed /></ListItemIcon>
               <ListItemText onClick={this.props.updateFeed()} primary='Refresh Blogs' />
              </ListItem>
              <ListItem button >
               <ListItemIcon><Input/></ListItemIcon>
               <ListItemText onClick={this.logout} primary='Log out' />
              </ListItem>
          </List>
        </div>
      );    
    return sideList;
  }
}

export default SideMenu;