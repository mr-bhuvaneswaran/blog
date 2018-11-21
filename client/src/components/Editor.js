import React from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import '../App.css';

class Editor extends React.Component {
    constructor (props) {
      super(props)
      this.state = { editorHtml: '' }
    }
    
    handleChange = (html) =>{
        this.setState({ editorHtml: html });
        this.props.OnContextChange(html);
    }
    
    render () {

      return (
        <div>
          <ReactQuill style={{height: '50vh', margin: '10px'}}
            onChange={this.handleChange}
            value={this.state.editorHtml}
            modules={Editor.modules}
            formats={Editor.formats}
            bounds={'.app'}
            placeholder={this.props.placeholder}
           />
         </div>
       )
    }
}
  

Editor.modules = {
    toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
        {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        matchVisual: false,
    }
}

Editor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]
  
Editor.propTypes = {
placeholder: PropTypes.string,
}

export default Editor;