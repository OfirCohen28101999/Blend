import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import './signIn.css';

function SignIn() {
  const { Formik } = formik;

  // const schema = yup.object().shape({
  //   firstName: yup.string().required(),
  //   lastName: yup.string().required(),
  //   username: yup.string().required(),
  //   city: yup.string().required(),
  //   state: yup.string().required(),
  //   zip: yup.string().required(),
  //   file: yup.mixed().required(),
  //   terms: yup.bool().required().oneOf([true], 'terms must be accepted'),
  // });

  return (
    <div className='signIn'>
    <Formik
      // validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        favoriteTrack: '',
        profilePicture: null
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik101"
              className="position-relative"
            >
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik102"
              className="position-relative"
            >
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
              />

              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormikUsername2">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="6"
              controlId="validationFormik103"
              className="position-relative"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />

              <Form.Control.Feedback type="invalid" tooltip>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="3"
              controlId="validationFormik104"
              className="position-relative"
            >
              <Form.Label>Favorite Track</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter URL"
                name="favoriteTrack"
                value={values.favoriteTrack}
                onChange={handleChange}
                isInvalid={!!errors.favoriteTrack}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.favoriteTrack}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="3"
              controlId="validationFormik105"
              className="position-relative"
            >
            </Form.Group>
          </Row>
          <Form.Group className="position-relative mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              required
              name="profilePicture"
              onChange={handleChange}
              isInvalid={!!errors.profilePicture}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.profilePicture}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  </div>
  );
}

export default SignIn;
