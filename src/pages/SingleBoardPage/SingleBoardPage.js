import React, { useEffect, useRef, useState } from 'react';
import { Navbar, Card, Row, Col, Container, Button, Form } from 'react-bootstrap';
import { IoAdd, IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import List from '../../components/list/list';
import { createList, editBoard, getSingleBoard } from '../HomePage/action';
import './SingleBoardPage.scss'

const SingleBoardPage = ({ showOverlay }) => {
  const state = useSelector(state => state.home)
  const boards = useSelector(state => state.home.boards)
  const boardLists = useSelector(state => state.home.singleBoardLists)
  const boardCards = useSelector(state => state.home.singleBoardCards)
  const [lists, setLists] = useState(null)
  const [value, setValue] = useState('')
  const [valueBoardName, setValueBoardName] = useState('')
  const [isAddNewList, setIsAddNewList] = useState(false)
  const [switcher, setSwitcher] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const currentPath = history.location.pathname
  const currentPathSlug = currentPath.split('/')
  const lsBoardId = localStorage.getItem('board_id')
  const idBoard = state?.idBoard || lsBoardId
  const lsBoardName = localStorage.getItem('board_name')
  const selectedBoard = boards?.filter(board => board?.url.endsWith(currentPathSlug[currentPathSlug?.length - 1]))
  const sb = selectedBoard?.[0]
  const sbBgdScaled = sb?.prefs?.backgroundImageScaled
  const sbBgdColor = sb?.prefs?.background
  const bgdScaledLast = sbBgdScaled?.length - 2
  const singleBoard = state?.singleBoard
  const sbName = sb?.name || lsBoardName || ''
  const isVisible = isAddNewList ? 'visible' : 'hidden'


  useEffect(() => {
    dispatch(getSingleBoard(idBoard))
    updateList()
  }, [])

  useEffect(() => {
    updateList()
    resetState()
  }, [boardLists])

  const resetState = () => {
    setValue('')
  }

  const updateList = () => setLists(boardLists)
  
  const handleInput = (e) => setValue(e.target.value.trim())


  return (
    <Layout background={`${!sbBgdScaled?.[bgdScaledLast].url ? sbBgdColor : sbBgdScaled?.[bgdScaledLast].url}`} contentClassName="flex-column overflow-x-hidden">
      <Navbar className="single-board-toolbar flex-grow-0" bg="light">
        <Navbar.Brand>
          <span>{`${sbName}`}</span> 
        </Navbar.Brand>
      </Navbar>
      <Container fluid className="single-board-container flex-grow-1">
        <Row className="single-board-row">
          <List lists={lists} boardCards={boardCards} />
          { boardCards ? <Col xs>
            {/* <div className="single-board-list-crating"> */}
            { !isAddNewList ? 
              <Button className="single-board-list-creating-button" variant="secondary" color="gray" style={{ width: '18rem' }} onClick={ () => setIsAddNewList(true) }>
                <IoAdd size={18} />
                Add new list
              </Button>
              :
              <>
                <div className={`single-board-overlay single-board-overlay--${isVisible}`} onClick={ () => setIsAddNewList(false) } />
                <Card className="single-board-list-creating" border="secondary" style={{ width: '18rem' }}>
                  <Card.Body>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Control as="textarea" rows={2} defaultValue={value} placeholder="Enter name of the list" onChange={(e) => handleInput(e)} />
                      <div className="single-board-list-creating-actions flex-row align-items-end flex-gap-10">
                        <Button disabled={value.length < 1} variant="success" onClick={ () => dispatch(createList(idBoard, value, { pos: 'bottom' })) }>Add list</Button>
                        <IoClose size={24} onClick={ () => setIsAddNewList(false) } />
                      </div>
                    </Form.Group>
                  </Card.Body>
                </Card> 
              </> }
            {/* </div> */}
          </Col> : null }
        </Row>
      </Container>
    </Layout>
  );
}
 
export default SingleBoardPage;