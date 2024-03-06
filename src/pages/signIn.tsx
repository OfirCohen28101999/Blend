import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../services/api/authApi';
import { ReactComponent as GoogleLogo } from '../assets/google.svg';
import { getGoogleUrl } from '../utils/getGoogleUrl';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import blendIcon from '../assets/blendIcon.svg';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  font-weight: 500;

  &:hover {
    background-color: #0000CD;
    transform: translateY(-2px);
  }
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #FFFFFF;

  &:hover {
    text-decoration: underline;
  }
`;

const loginSchema = object({
email: string()
  .min(1, 'Email address is required')
  .email('Email Address is invalid'),
password: string()
  .min(1, 'Password is required')
  .min(8, 'Password must be more than 8 characters')
  .max(32, 'Password must be less than 32 characters'),
});

export type LoginInput = TypeOf<typeof loginSchema>;

function SignIn() {

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const [loginUser, { isLoading, isSuccess }] = useLoginUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = ((location.state as any)?.from.pathname as string) || '/feed';

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  const handleLogin = async (values: LoginInput) => {
    try {
      const response = await loginUser(values);
      if ('data' in response) {
        const token = response.data.access_token; 
        localStorage.setItem('token', token);
      }
      else {
        console.error('Login failed:', response.error);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(from);
    }
  }, [isSuccess, from, navigate]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
   handleLogin(values);
  };

  return (
    <Container maxWidth={false} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <Typography textAlign='center' component='h1' sx={{fontWeight: 600, fontSize: { xs: '2rem', md: '3rem' }, mb: 2, letterSpacing: 1}}>
          <img src={blendIcon} className="h-8 me-3 rounded-full" /> Blend 
        </Typography>
        <FormProvider {...methods}>
          <Box component='form' onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete='off' maxWidth='27rem' width='100%' sx={{ backgroundColor: '#e5e7eb', p: { xs: '1rem', sm: '2rem' }, borderRadius: 2}}>
            <FormInput name='email' label='Email Address' type='email' />
            <FormInput name='password' label='Password' type='password' />
            <Typography sx={{ fontSize: '0.9rem', mb: '1rem', textAlign: 'right' }}></Typography>
            <LoadingButton variant='contained' sx={{ mt: 1 }} fullWidth disableElevation type='submit' loading={isLoading}>
              Login
            </LoadingButton>
            <Typography sx={{ fontSize: '0.9rem', mt: '1rem' }}>
              Don’t have an account yet? <LinkItem to='/sign-up'>Sign Up Here</LinkItem>
            </Typography>
          </Box>
        </FormProvider>
        <Typography variant='h6' component='p' sx={{my: '1.5rem', textAlign: 'center', color: 'black'}}>
          Log in with Google:
        </Typography>
        <Box maxWidth='27rem' width='100%' sx={{backgroundColor: '#e5e7eb', p: { xs: '1rem', sm: '2rem' }, borderRadius: 2}}>
          <MuiLink href={getGoogleUrl(from)} sx={{ backgroundColor: '#f5f6f7', borderRadius: 1, py: '0.6rem', columnGap: '1rem', textDecoration: 'none', color: '#393e45', cursor: 'pointer', fontWeight: 500, '&:hover': {backgroundColor: '#fff',boxShadow: '0 1px 13px 0 rgb(0 0 0 / 15%)'}}} display='flex' justifyContent='center' alignItems='center'>
            <GoogleLogo style={{ height: '2rem' }} />
            Google
          </MuiLink>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;