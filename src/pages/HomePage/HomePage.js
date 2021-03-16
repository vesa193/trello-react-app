import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Jumbotron, Navbar, Button, Modal, Dropdown, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { IoArrowForward, IoClipboardOutline, IoEllipsisHorizontal, IoEllipsisHorizontalCircleSharp } from "react-icons/io5";
import { useHistory } from 'react-router-dom';
import Board from '../../components/board/board';
import { Hr } from '../../components/common/common';
import Layout from '../../components/layout/layout';
import { deleteBoard, editBoard, getBoards, getSingleBoard } from './action';
import './HomePage.scss'



const HomePage = (props) => {
  const boards = useSelector(state => state.home.boards)
  const history = useHistory()
  const dispatch = useDispatch()
  const ref = useRef()
  const [value, setValue] = useState('')
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false)
  const [goToButtonClicked, setGoToButtonClicked] = useState(false)
  const [editButtonClicked, setEditButtonClicked] = useState(false)
  const [dropdownHovered, setDropdownHovered] = useState(false)
  const [isClickedEditedItem, setIsClickedEditedItem] = useState('')
  const [bname, setBname] = useState('')
  

  const onHideModal = () => {
    setIsActionModalOpen(false)
    setDeleteButtonClicked(false)
    setGoToButtonClicked(false)
    setEditButtonClicked(false)
  }

  const handleInput = (e) => setValue(e.target.value.trim()) 

  const modalButtonHandler = (prop) => {
    if (prop === 'delete') {
      setDeleteButtonClicked(!deleteButtonClicked)
      setGoToButtonClicked(false)
      setEditButtonClicked(false)
    }

    if (prop === 'goTo') {
      setGoToButtonClicked(!goToButtonClicked)
      setDeleteButtonClicked(false)
      setEditButtonClicked(false)
    }

    if (prop === 'edit') {
      setEditButtonClicked(!editButtonClicked)
      setGoToButtonClicked(false)
      setDeleteButtonClicked(false)
    }
  }

  const handleDeleteBoard = (idBoard) => {
    setIsActionModalOpen(false)
    dispatch(deleteBoard(idBoard))
  }

  const handleSelectBoard = (id, slugName, boardName) => {
    const slugNameArray = slugName.split('/')
    const slug = slugNameArray[slugNameArray.length - 1]
    setIsActionModalOpen(false)
    localStorage.setItem('board_id', `${id}`)
    localStorage.setItem('board_slug', `${slug}`)
    localStorage.setItem('board_name', `${boardName}`)
    dispatch(getSingleBoard(id, slug, boardName, () => {
      history.push(`/board/${slug}`)
    }))
  }

  const handleSelectEditBoard = (idBoard, boardName) => {
    setIsClickedEditedItem(idBoard)
    setValue(boardName)
    setBname(boardName)
  }

  const handleEditOnBlur = (idBoard, boardName, bname) => {
    const data = { name: boardName }
    if (boardName !== bname) {
      dispatch(editBoard(idBoard, data))
      setIsActionModalOpen(false)
    }
    setIsClickedEditedItem('')
  }

  return (
    <Layout contentClassName="grid">
      <Jumbotron className="boards-wrapper">
        <Navbar bg="gray">
          <div>
            <IoClipboardOutline size={18} />
            <Navbar.Brand>Your boards</Navbar.Brand>
          </div>
          <Button variant="light" onClick={ () => setIsActionModalOpen(true) }>
            Board actions
            <IoEllipsisHorizontal size={18} />
          </Button>
        </Navbar>
        <Hr />
        <Container>
          <Row className="boards-row">
            <Board boards={boards} />
          </Row>
        </Container>
      </Jumbotron>
      <Modal
        {...props}
        show={isActionModalOpen}
        onHide={() => onHideModal()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Board actions
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="boards-wrapper-modal-actions">
            <Button variant="danger" disabled={goToButtonClicked || editButtonClicked || isClickedEditedItem} onClick={ () => modalButtonHandler('delete') } onBlur={ () => !dropdownHovered ? setDeleteButtonClicked(false) : null }>
              Delete board
              <IoEllipsisHorizontal size={18} />
              <Dropdown.Menu show={deleteButtonClicked} onMouseEnter={ () => setDropdownHovered(true) } onMouseLeave={ () => setDropdownHovered(false) }>
                <Dropdown.Header>Delete board</Dropdown.Header>
                <Dropdown.Divider />
                {
                  boards?.map(board => {
                    return (
                      <Dropdown.Item key={board.id} eventKey="2" onClick={ () => handleDeleteBoard(board.id) }>{board.name}</Dropdown.Item>
                    )
                  })
                }
              </Dropdown.Menu>
            </Button>
            <Button variant="primary" disabled={deleteButtonClicked || editButtonClicked || isClickedEditedItem} onClick={ () => modalButtonHandler('goTo') } onBlur={ () => !dropdownHovered ? setDeleteButtonClicked(false) : null }>
              Go to the board
              <IoEllipsisHorizontal size={18} />
              <Dropdown.Menu show={goToButtonClicked} onMouseEnter={ () => setDropdownHovered(true) } onMouseLeave={ () => setDropdownHovered(false) }>
                <Dropdown.Header>Go to board</Dropdown.Header>
                <Dropdown.Divider />
                {
                  boards?.map(board => {
                    return (
                      <Dropdown.Item key={board.id} eventKey="2" onClick={ () => handleSelectBoard(board?.id, board?.url, board?.name) }>{board.name}</Dropdown.Item>
                    )
                  })
                }
              </Dropdown.Menu>
            </Button>
            <Button variant="light" disabled={deleteButtonClicked || goToButtonClicked} onClick={ () => modalButtonHandler('edit') } onBlur={ () => !dropdownHovered ? setDeleteButtonClicked(false) : null }>
              Edit board
              <IoEllipsisHorizontal size={18} />
              { editButtonClicked ?
                <Dropdown.Menu show={editButtonClicked} onMouseEnter={ () => setDropdownHovered(true) } onMouseLeave={ () => setDropdownHovered(false) }>
                <Dropdown.Header>Edit Board's name</Dropdown.Header>
                <Dropdown.Divider />
                {
                  boards?.map(board => {
                    return (
                      <Dropdown.Item key={board.id} eventKey="2" onClick={ () => handleSelectEditBoard(board?.id, board?.name) }>{board.name}</Dropdown.Item>
                    )
                  })
                }
              </Dropdown.Menu> : null }
            </Button>
            <div>
              { isClickedEditedItem && value ?
                <div>
                  <Form.Label>Edit name of the board</Form.Label>
                  <Form.Control autoFocus as="input" rows={2} defaultValue={value} placeholder="Board name" onChange={(e) => handleInput(e)} onBlur={ () => handleEditOnBlur(isClickedEditedItem, value, bname) } />
                </div>
                : null
              }
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => onHideModal() }>Close</Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

// <div>
//   <Form.Control autoFocus as="input" rows={2} defaultValue={value} placeholder="Enter board name" onChange={(e) => handleInput(e)} /> 
//   <Button variant="success">Confirm</Button>
// </div>

export default HomePage;