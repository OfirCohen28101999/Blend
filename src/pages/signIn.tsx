import blendIcon from '../blendIcon.svg';
import { ChangeEvent, useRef, useState } from 'react';
import { signInUser } from '../services/user-service';
import { UserProps } from '../shared/types';
import { googleSignin } from '../services/user-service';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

function SignIn() {
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  
  const signIn = async () => {
      // const url = await uploadPhoto(imgSrc!);
      console.log("upload returned:" + 'url');
      if (emailInputRef.current?.value && passwordInputRef.current?.value) {
          const user: UserProps = {
              email: emailInputRef.current?.value,
              password: passwordInputRef.current?.value,
          }
          const res = await signInUser(user)
          console.log(res)
      }
  }

  const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse)
    try {
        const res = await googleSignin(credentialResponse)
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}

const onGoogleLoginFailure = () => {
    console.log("Google login failed")
}

  return (
    <div className="flex items-center justify-center mt-4 w-full">
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src={blendIcon} alt="logo" />
            Blend
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input ref={emailInputRef} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input ref={passwordInputRef} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  
                </div>
                <button type="submit" className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={signIn}>Sign in</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <a href="/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                </p>
                <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure} />

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );



  // return (
  //   <div className='signIn'>
  //   <Formik
  //     // validationSchema={schema}
  //     onSubmit={console.log}
  //     initialValues={{
  //       firstName: '',
  //       lastName: '',
  //       username: '',
  //       password: '',
  //       favoriteTrack: '',
  //       profilePicture: null
  //     }}
  //   >
  //     {({ handleSubmit, handleChange, values, touched, errors }) => (
  //       <Form noValidate onSubmit={handleSubmit}>
  //         <Row className="mb-3">
  //           <Form.Group
  //             as={Col}
  //             md="4"
  //             controlId="validationFormik101"
  //             className="position-relative"
  //           >
  //             <Form.Label>First name</Form.Label>
  //             <Form.Control
  //               type="text"
  //               name="firstName"
  //               value={values.firstName}
  //               onChange={handleChange}
  //               isValid={touched.firstName && !errors.firstName}
  //             />
  //             <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
  //           </Form.Group>
  //           <Form.Group
  //             as={Col}
  //             md="4"
  //             controlId="validationFormik102"
  //             className="position-relative"
  //           >
  //             <Form.Label>Last name</Form.Label>
  //             <Form.Control
  //               type="text"
  //               name="lastName"
  //               value={values.lastName}
  //               onChange={handleChange}
  //               isValid={touched.lastName && !errors.lastName}
  //             />

  //             <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
  //           </Form.Group>
  //           <Form.Group as={Col} md="4" controlId="validationFormikUsername2">
  //             <Form.Label>Username</Form.Label>
  //             <InputGroup hasValidation>
  //               <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
  //               <Form.Control
  //                 type="text"
  //                 placeholder="Username"
  //                 aria-describedby="inputGroupPrepend"
  //                 name="username"
  //                 value={values.username}
  //                 onChange={handleChange}
  //                 isInvalid={!!errors.username}
  //               />
  //               <Form.Control.Feedback type="invalid" tooltip>
  //                 {errors.username}
  //               </Form.Control.Feedback>
  //             </InputGroup>
  //           </Form.Group>
  //         </Row>
  //         <Row className="mb-3">
  //           <Form.Group
  //             as={Col}
  //             md="6"
  //             controlId="validationFormik103"
  //             className="position-relative"
  //           >
  //             <Form.Label>Password</Form.Label>
  //             <Form.Control
  //               type="password"
  //               placeholder="Password"
  //               name="password"
  //               value={values.password}
  //               onChange={handleChange}
  //               isInvalid={!!errors.password}
  //             />

  //             <Form.Control.Feedback type="invalid" tooltip>
  //               {errors.password}
  //             </Form.Control.Feedback>
  //           </Form.Group>
  //           <Form.Group
  //             as={Col}
  //             md="3"
  //             controlId="validationFormik104"
  //             className="position-relative"
  //           >
  //             <Form.Label>Favorite Track</Form.Label>
  //             <Form.Control
  //               type="text"
  //               placeholder="enter URL"
  //               name="favoriteTrack"
  //               value={values.favoriteTrack}
  //               onChange={handleChange}
  //               isInvalid={!!errors.favoriteTrack}
  //             />
  //             <Form.Control.Feedback type="invalid" tooltip>
  //               {errors.favoriteTrack}
  //             </Form.Control.Feedback>
  //           </Form.Group>
  //           <Form.Group
  //             as={Col}
  //             md="3"
  //             controlId="validationFormik105"
  //             className="position-relative"
  //           >
  //           </Form.Group>
  //         </Row>
  //         <Form.Group className="position-relative mb-3">
  //           <Form.Label>Profile Picture</Form.Label>
  //           <Form.Control
  //             type="file"
  //             required
  //             name="profilePicture"
  //             onChange={handleChange}
  //             isInvalid={!!errors.profilePicture}
  //           />
  //           <Form.Control.Feedback type="invalid" tooltip>
  //             {errors.profilePicture}
  //           </Form.Control.Feedback>
  //         </Form.Group>

  //         <Button type="submit">Submit form</Button>
  //       </Form>
  //     )}
  //   </Formik>
  // </div>
  // );
}

export default SignIn;
