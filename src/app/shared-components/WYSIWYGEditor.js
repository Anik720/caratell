import { useState, forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import clsx from 'clsx';
import { Typography } from '@mui/material';

const Root = styled('div')({
  '& .rdw-dropdown-selectedtext': {
    color: 'inherit',
  },
  '& .rdw-editor-toolbar': {
    borderWidth: '0 0 1px 0!important',
    margin: '0!important',
  },
  '& .rdw-editor-main': {
    padding: '8px 12px',
    height: `${256}px!important`,
  },
});

const WYSIWYGEditor = forwardRef((props, ref) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  function onEditorStateChange(_editorState) {
    setEditorState(_editorState);

    return props.onChange(draftToHtml(convertToRaw(_editorState.getCurrentContent())));
  }

  return (
    <div>
      <Root
        className={clsx('rounded-4 border-1 overflow-hidden w-full', props.className)}
        ref={ref}
      >
        <Editor editorState={editorState} onEditorStateChange={onEditorStateChange} />
      </Root>
      {props.errors && <Typography className="p-[5px] text-red">{props.errors || ''}</Typography>}
    </div>
  );
});

export default WYSIWYGEditor;
