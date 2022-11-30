/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import { useSnackbar } from 'app/hooks';
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'app/store/appstore/authSlice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  // email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  email: yup.string().required('You must enter a email or username'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 letters minimum.'),
});

const defaultValues = {
  email: '',
  password: '',
};

function Login() {
  const showSnackbar = useSnackbar();

  const isLoggedIn = useSelector(({ appstore }) => appstore.auth.isLoggedIn);
  const logginStatus = useSelector(({ appstore }) => appstore.auth.logginStatus);

  const error = useSelector(({ appstore }) => appstore.auth.error);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
    if (logginStatus === 'loading') {
      showSnackbar('Logging in...');
    }
    if (logginStatus === 'succeeded') {
      showSnackbar('Login successful', 's');
    }
    if (logginStatus === 'failed') {
      if (typeof error === 'string') showSnackbar(error, 'e');
      else showSnackbar("Can't login. Please try again.", 'e');
    }
  }, [isLoggedIn, navigate, logginStatus]);

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(data) {
    const payloadObj = {
      emailOrUserName: data.email,
      password: data.password,
      loginType: '',
    };
    dispatch(login(payloadObj)).then((e) => {
      if (!e.error) reset(defaultValues);
    });

    // dispatch(setRedirect({ redirectFlag: false, redirectTo: '' }));
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col flex-auto items-center justify-center p-16 sm:p-32">
      <div className="flex flex-col items-center justify-center w-full">
        <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="w-[40rem] max-w-384 rounded-[7px]">
            <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32">
              {/* <img className="w-[160px] m-32 absolute mt-[-35rem]" src="assets/images/logos/fuse.svg" alt="logo" /> */}
              <Avatar
                className="m-32 absolute mt-[-35rem]"
                alt="Logo"
                // src="/static/images/avatar/1.jpg"
                sx={{ width: 130, height: 130 }}
              />

              <Typography variant="h6" className="mt-[6rem] mb-24 font-semibold text-18 sm:text-24">
                User Login
              </Typography>

              <form
                name="loginForm"
                noValidate
                className="flex flex-col justify-center w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      label="Email or UserName"
                      autoFocus
                      type="email"
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      label="Password"
                      type="password"
                      error={!!errors.password}
                      helperText={errors?.password?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />

                <div
                  className="flex flex-col sm:flex-row w-full items-center justify-center text-blue hover:cursor-pointer"
                  onClick={handleClickOpen}
                >
                  {/* <Link className="font-normal" to="/pages/auth/forgot-password">
                    Forgot Password?
                  </Link> */}
                  Forgot Password?
                </div>

                <Button
                  variant="contained"
                  // color="primary"
                  className="w-[8rem] mx-auto mt-16 bg-primary-blue rounded-[5px]"
                  aria-label="LOG IN"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Forgot Password?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Please contact system admin to reset your password.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Login;

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
