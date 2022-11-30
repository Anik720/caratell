// import { Box, Grid, Button, Container } from '@material-ui/core';
// import CustomDialog from 'src/components/CustomDialog';
// import useKeyboardShortcut from 'src/hooks/useKeyboardShortcut';
// import EquationEditor from 'src/components/EquationEditor';
// import { useEffect, useState, useCallback } from 'react';
// import TextEditor from 'src/components/Editor/TextEditor';
// import 'react-quill/dist/quill.snow.css';
// import './style.css';

// const Editor = ({ initValue, currentValue, setEditorValue }) => {
//   const [value, setValue] = useState(initValue);
//   const [modalOpen, setModalOpen] = useState(false);

//   const handleKeyboardShortcut = useCallback(
//     (keys) => {
//       console.log(keys);
//     },
//     [modalOpen]
//   );

//   useKeyboardShortcut(['Control', 'Shift', 'E'], handleKeyboardShortcut);

//   const handleModalClose = () => {
//     setModalOpen(false);
//   };

//   const handleModalOpen = () => {
//     setModalOpen(true);
//   };

//   const handleChange = (value) => {
//     setValue(value);
//     setEditorValue(value);
//   };

//   useEffect(() => {
//     setValue(initValue);
//   }, [initValue]);

//   useEffect(() => {
//     setValue(currentValue);
//   }, [currentValue]);

//   return (
//     <>
//       {modalOpen ? (
//         <CustomDialog open={modalOpen} handleClose={handleModalClose} title="Edit equation">
//           <EquationEditor />
//         </CustomDialog>
//       ) : null}
//       <Container maxWidth="lg">
//         <Box>
//           <Grid container direction="row" spacing={0} sx={{ mb: 1 }}>
//             <Grid item xs={12}>
//               <Box sx={{ position: 'relative' }}>
//                 <Button
//                   sx={{
//                     border: 1,
//                     position: 'absolute',
//                     right: '5px',
//                     background: 'white',
//                   }}
//                   onClick={handleModalOpen}
//                 >
//                   {' '}
//                   Eq Editor
//                 </Button>
//                 <TextEditor value={value} handleChange={handleChange} />
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default Editor;
