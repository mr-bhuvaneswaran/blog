import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import { Grid, Button } from '@material-ui/core';
import {Link} from 'react-router-dom';


const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
});

class SingleFeed extends React.Component {
  state = { };

  render() {
    const { classes } = this.props;
    const { feed } = this.props;

    return (
      <Grid  item xs={6} sm={3}>  
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={feed.image}
          title={feed.title}
        />
        <CardContent >
          <Typography variant='caption'>
            {feed.title}
          </Typography>
          <Typography noWrap variant='body1'>
            By:{feed.author}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton title='Test Feature' aria-label="like">
            <ThumbUp />
          </IconButton>
          <IconButton title='Test Feature' aria-label="dislike">
            <ThumbDown />
          </IconButton>
          <div className={classes.grow} />
          <Link to={{ pathname: 'viewBlog', state: { feed: {feed}} }} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" className={classes.button}>
            Read
          </Button>
          </Link>
        </CardActions>
      </Card>
      </Grid>
    );
  }
}

SingleFeed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleFeed);