import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import axios from 'axios';

import { withStyles, TextField, Typography, Button, Paper, Divider } from '@material-ui/core';

const styles = theme => ({});

class CommentBox extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            data : []
        };
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    handleCommentSubmit(e){
        axios.put(`/api/blog`,{ id:this.props.feed._id, type:"comment", comment:e })
        .then((res)=>{
            if(res.data.comments != null)
                this.setState({ data: res.data.comments})
        }).catch((err)=>{
            console.log(err);
        });
    }

    componentDidMount(){
        this.setState({data:this.props.feed.comments});
    }

    render() {
        return (
            <div className="commentBox">
                <Typography variant="display1" style={{ paddingTop: '10px',fontSize: '20px'}}>Comments</Typography>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/> 
                <div style={{marginTop:'10px'}}>
                    <CommentList data={this.state.data}/>
                </div>
            </div>
        );
}
};

class CommentList extends React.Component {
    render() {
        const commentNodes = this.props.data.reverse().map((comment,index)=>{
            return (
                    <div key={index}>
                    <Comment author={comment.author} key={index} >
                        {comment.comment}
                    </Comment>

                    <Divider inset />
                    </div>
                );
        })
        return (
            <div>
                <Paper style={{ padding: '20px', background : '#eeeeee'}}>
                    {commentNodes}
                </Paper>
            </div>
        );
    }
};
    

class CommentForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            comment:''
        };
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleCommentChange(e){
        this.setState({
            comment: e.target.value
        });
    }
    handleSubmit(e){
        e.preventDefault();
        const comment = this.state.comment.trim();
        if(!comment){
            return;
        }
        this.props.onCommentSubmit({author:sessionStorage.getItem('uname'),comment:comment, date:Date.now()});
        this.setState({comment:''});
    }
    render() {
        return (
            <form>
            <TextField style={{ width: '50vw'}}
                label="Write a Comment"
                multiline
                rows = "5"
                rowsMax="5"
                value={this.state.comment}
                onChange={this.handleCommentChange}
                className={classNames.textField}
                margin="normal"
                variant="outlined"
            />
            <div>
                <Button onClick={this.handleSubmit}  variant="contained" color="primary" >
                    POST
                </Button>
            </div>
            </form>
        );
    }
};
class Comment extends React.Component {
    render() {        
        return (
            <div className="comment">
                <h3 className="commentAuthor">
                    {this.props.author}
                </h3>
            <p className="actualComment"> -->  {this.props.children}</p>
            </div>
        );
    }
};


CommentBox.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(CommentBox);