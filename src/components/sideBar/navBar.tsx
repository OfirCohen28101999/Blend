import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import BlendIcon from '../../BlendIcon.jpeg';
import { Route, Routes } from 'react-router-dom';
import MyAccount from '../myAccount/myAccount';

function NavBar() {
  return (
    <div className='sideBar'>
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
      <img src={BlendIcon} className="App-logo" />
        <Navbar.Brand>Blend</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="MyAccount">My account</Nav.Link>
            <Nav.Link href="Feed">Feed</Nav.Link>
          </Nav>
          {/* <Nav> */}
          {/* eventKey={2} */}
            <Nav.Link href="/">
              Sign Out
            </Nav.Link>
          {/* </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default NavBar;