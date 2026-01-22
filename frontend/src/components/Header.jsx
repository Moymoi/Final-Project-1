import React from 'react'
import { Navbar, Nav, NavDropdown, Container,Image } from 'react-bootstrap'

function Header() {
  return (
    <Navbar expand="lg" bg="primary" variant="dark" collapseOnSelect>
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <Image
            src='/images/thelootstoplogo.png'
            alt='TheLootStop Logo'
            style={{ height: '72px', width: 'auto' }}
            className='d-inline-block me-2'
          />
          <span>TheLootStop</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home"><i className="fas fa-home"></i>Home</Nav.Link>
            <Nav.Link href="#/link"><i className='fas fa-user'></i>Features</Nav.Link>
            <Nav.Link href="#/link"><i className ='fas fa-shopping-cart'></i>Pricing</Nav.Link>
            <Nav.Link href="#/link"><i className="fas fa-info-circle"></i>About</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header