import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginUserMutation, useRegisterUserMutation } from '../services/api/authApi';
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

const registerSchema = object({
  name: string().min(1, 'Full name is required').max(100),
  email: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().min(1, 'Please confirm your password'),
  bio: string().min(1, 'bio is required').max(100)
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const SignUp = () => {
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const [registerUser] = useRegisterUserMutation();
  const [loginUser, { isLoading, isSuccess }] = useLoginUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = ((location.state as any)?.from.pathname as string) || '/feed';
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      navigate(from);
    }
  }, [isSuccess, from, navigate]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const handleRegister = async (values: RegisterInput) => {
    try {
      await registerUser(values);
      const loginResponse = await loginUser({email: values.email, password: values.password});
      if ('data' in loginResponse) {
        const token = loginResponse.data.accessToken; 
        localStorage.setItem('token', token);
      }
      else {
        console.error('Register failed:', loginResponse.error);
      }
    } catch (error) {
      console.error('Register failed:', error);
    }
  };

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    handleRegister(values)
  };

  return (
    <Container maxWidth={false} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <Typography textAlign='center' component='h1' sx={{fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 600, mb: 2, letterSpacing: 1}}>
          <img src={blendIcon} className="h-8 me-3 rounded-full" /> Blend
        </Typography>
        <FormProvider {...methods}>
          <Box component='form' onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete='off' maxWidth='27rem' width='100%' sx={{backgroundColor: '#e5e7eb', p: { xs: '1rem', sm: '2rem' }, borderRadius: 2}}>
            <FormInput name='name' label='Full Name' />
            <FormInput name='email' label='Email Address' type='email' />
            <FormInput name='password' label='Password' type='password' />
            <FormInput name='passwordConfirm' label='Confirm Password' type='password'/>
            <FormInput name='bio' label='bio' />
            <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
              Already have an account?{' '}
              <LinkItem to='/sign-in'>Login Here</LinkItem>
            </Typography>
            <LoadingButton variant='contained' fullWidth disableElevation type='submit' loading={isLoading}> Sign Up</LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default SignUp;