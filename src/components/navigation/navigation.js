import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, NavDropdown, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import trelloLogo from '../../assets/images/Trello-Logo.wine.png'
import { Hr } from '../common/common';
import './navigation.scss'
import { navConfig } from '../../navConfig';

const Navigation = () => {
  const history = useHistory()
  const state = useSelector(state => state.profile.profile)

  return (
  <>
    <Navbar className="navigation" collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {
            navConfig.map(item => {
              return (
                <Nav.Link key={item.id} onClick={ () => history.push(item.path) }>{item.label}</Nav.Link>
              )
            })
          }
          {/* <Nav.Link>Features</Nav.Link>
          <Nav.Link>Pricing</Nav.Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item>Action</NavDropdown.Item>
            <NavDropdown.Item>Another action</NavDropdown.Item>
            <NavDropdown.Item>Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Separated link</NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Nav className="mr-auto">
          <Navbar.Brand className="navigation-logo" onClick={ () => history.push('/') }>
            <img width="80" src={trelloLogo} alt="Trello Logo" draggable={false} />
          </Navbar.Brand>
        </Nav>
        <Nav className="mr-auto">
          <DropdownButton id="dropdown-item-button" className="navigation-dropdown" menuAlign="right" title={state?.initials || 'Account'}>
            <Dropdown.Header className="navigation-dropdown-header">
              {state?.fullName}
              <img width="30" src={`https://trello-members.s3.amazonaws.com/${state?.id}/${state?.avatarHash}/50.png`} alt=""/>
            </Dropdown.Header>
            <Dropdown.Header>{state?.email}</Dropdown.Header>
            <Hr />
            <Dropdown.Item as="button">Settings Profile</Dropdown.Item>
            {/* <Dropdown.Item as="button">Another action</Dropdown.Item>
            <Dropdown.Item as="button">Something else</Dropdown.Item> */}
          </DropdownButton>
        </Nav>
        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form> */}
      </Navbar.Collapse>
    </Navbar>
  </>
  );
}
 
export default Navigation;