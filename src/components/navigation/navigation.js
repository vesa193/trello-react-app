import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, NavDropdown, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import trelloLogo from '../../assets/images/Trello-Logo.wine.png'
import { getSingleBoard } from '../../pages/HomePage/action';
import { Hr } from '../common/common';
import { navConfig } from '../../navConfig';
import './navigation.scss'

const Navigation = () => {
  const history = useHistory()
  const currentPath = history.location.pathname
  const dispatch = useDispatch()
  const state = useSelector(state => state.profile.profile)
  const boards = useSelector(state => state.home.boards)

  const handleSelectBoard = (id, slugName, boardName) => {
    const slugNameArray = slugName.split('/')
    const slug = slugNameArray[slugNameArray.length - 1]
    localStorage.setItem('board_id', `${id}`)
    localStorage.setItem('board_slug', `${slug}`)
    localStorage.setItem('board_name', `${boardName}`)
    dispatch(getSingleBoard(id, slug, boardName, () => {
      history.push(`/board/${slug}`)
    }))
  }

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
          { currentPath.includes('/board') ?
            <NavDropdown title="Boards" id="collasible-nav-dropdown">
              <NavDropdown.Header>View the board</NavDropdown.Header>
              <NavDropdown.Divider />
                { boards?.map(b => {
                  const splitCurrPath = currentPath.split('/')[2]
                  const disabledItem = b.url.endsWith(splitCurrPath)
                  
                  return (
                    <NavDropdown.Item key={b?.id} disabled={disabledItem} onClick={() => handleSelectBoard(b?.id, b?.url, b?.name)}>{b.name}</NavDropdown.Item>
                  )
                })

                }
            </NavDropdown>
            : null  
          }
        </Nav>
        <Nav className="mr-auto">
          <Navbar.Brand className="navigation-logo" onClick={ () => history.push('/') }>
            <img width="80" src={trelloLogo} alt="Trello Logo" draggable={false} />
          </Navbar.Brand>
        </Nav>
        <Nav>
          <DropdownButton id="dropdown-item-button" className="navigation-dropdown" menuAlign="right" title={state?.initials || 'Account'}>
            <Dropdown.Header className="navigation-dropdown-header">
              {state?.fullName}
              <img width="30" src={`https://trello-members.s3.amazonaws.com/${state?.id}/${state?.avatarHash}/50.png`} alt=""/>
            </Dropdown.Header>
            {/* <Dropdown.Header>{state?.email}</Dropdown.Header> */}
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