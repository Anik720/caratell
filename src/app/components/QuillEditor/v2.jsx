// import { Component } from 'react';
// import { EditorState, convertToRaw, ContentState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import htmlToDraft from 'html-to-draftjs';
// import draftToHtml from 'draftjs-to-html';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// class EditorConvertToHTML extends Component {
//   constructor(props) {
//     super(props);
//     const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
//     const contentBlock = htmlToDraft(html);
//     if (contentBlock) {
//       const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
//       const editorState = EditorState.createWithContent(contentState);
//       this.state = {
//         editorState,
//       };
//     }
//   }

//   onEditorStateChange(editorState) {
//     this.setState({
//       editorState,
//     });
//   }

//   render() {
//     const { editorState } = this.state;
//     return (
//       <div>
//         <Editor
//           editorState={editorState}
//           wrapperClassName="demo-wrapper"
//           editorClassName="demo-editor"
//           onEditorStateChange={this.onEditorStateChange}
//         />
//         <textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} />
//       </div>
//     );
//   }
// }

// export default EditorConvertToHTML;
