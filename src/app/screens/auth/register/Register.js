import Card from '@mui/material/Card';
import { styled, darken } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { register } from '../../../store/zu/authSlice';
import { login } from '../../../store/zu/authSlice';
import Loader from 'react-fullpage-custom-loader';

const Root = styled('div')(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
    theme.palette.primary.dark,
    0.5
  )} 100%)`,
  color: theme.palette.primary.contrastText,

  '& .Login-leftSection': {},

  '& .Login-rightSection': {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));



function Register() {

  const dispatch = useDispatch();

  function onSubmit(values) {
    dispatch(register(values)).then(() => {
      setshowloader(false);
    });
  }

  const isRegistered = useSelector(({ zu }) => zu.auth.isRegistered);
  const [showloader, setshowloader] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (isRegistered) {
      navigate('/login');
    }
  }, [isRegistered]);

  return (
    <Root className="flex p-40 flex-auto items-center justify-center shrink-0 p-16 md:p-24">
      {showloader ? <Loader sentences={[]} /> : null}

      <Card className="Login-leftSection flex flex-col w-full items-center justify-center shadow-0 w-6/12">
        <CardContent className="flex flex-col items-center justify-center w-full py-96">
          <div className="flex items-center mb-48">
            <img className="logo-icon w-48" src="assets/images/logos/fuse.svg" alt="logo" />
            <div className="border-l-1 mr-4 w-1 h-40" />
            <div>
              <Typography className="text-24 font-semibold logo-text" color="inherit">
                Zu
              </Typography>
              <Typography className="text-16 tracking-widest -mt-8 font-700" color="textSecondary">
                Order
              </Typography>
            </div>
          </div>

          <div className="w-full">
            <Formik
              initialValues={{
                first_name: '',
                last_name: '',
                userName: '',
                password: '',
                email: '',
                address: '',
                phone_number: '',
                loginType: '',
                roles: ['outletAdmin'],
              }}
              onSubmit={async (values, helpers) => {
                onSubmit(values);
              }}
            >
              <Form autoComplete="off">
                <div className='flex flex-col justify-center items-center'>
                  <div className='flex justify-center'>
                    <Field
                      name="first_name"
                      component={TextField}
                      variant="filled"
                      className="w-full my-10 m-2"
                      label="FIRST NAME"
                    />
                    <Field
                      name="last_name"
                      component={TextField}
                      variant="filled"
                      className="w-full my-10 m-2"
                      label="LAST NAME"
                    />
                  </div>
                  <div className='flex justify-center'>
                    <Field
                      name="userName"
                      component={TextField}
                      variant="filled"
                      className="w-full my-10 m-2"
                      label="USER NAME"
                    />
                    <Field
                      name="email"
                      component={TextField}
                      variant="filled"
                      className="w-full my-10 m-2"
                      label="EMAIL"
                    />
                  </div>
                  <div className='flex justify-center'>
                    <Field
                      name="address"
                      component={TextField}
                      variant="filled"
                      className="w-full my-10 m-2"
                      label="ADDRESS"
                    />
                    <Field
                      name="phone_number"
                      component={TextField}
                      variant="filled"
                      className="w-full my-10 m-2"
                      label="PHONE NUMBER"
                    />
                  </div>
                  <div className='flex justify-center'>
                    <Field
                      name="password"
                      component={TextField}
                      variant="filled"
                      type="password"
                      className="w-full my-10 m-2"
                      label="PASSWORD"
                    />
                    <Field
                      name="confirmPassword"
                      component={TextField}
                      variant="filled"
                      type="password"
                      className="w-full my-10 m-2"
                      label="CONFIRM PASSWORD"
                    />
                  </div>
                  <Button
                    variant="contained"
                    className="w-6/12 rounded-lg text-16 font-bold mb-20 px-72 py-14"
                    type="submit"
                  >
                    REGISTER
                  </Button>
                </div>
              </Form>
            </Formik>
          </div>
        </CardContent>

      </Card>

      <div className="ml-20 Login-rightSection hidden md:flex items-center justify-center p-64">
        <div className="max-w-320">
          <Typography variant="h3" color="inherit" className="font-semibold leading-tight">
            Welcome <br />
            to the <br /> ZU OrDER!
          </Typography>

          <Typography variant="subtitle1" color="inherit" className="mt-32">
            { }
          </Typography>
        </div>
      </div>
    </Root>
  );
}

export default Register;
