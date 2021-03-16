import React, { useState } from 'react';
import { Card, Col, Modal, Button, Form, Row } from 'react-bootstrap';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBoard, getSingleBoard } from '../../pages/HomePage/action';
import './board.scss'

const boardColors = [
  { id: 0, color: 'blue' }, 
  { id: 1, color: 'orange' },
  { id: 2, color: 'green' },
  { id: 3, color: 'red' },
  { id: 4, color: 'purple' },
  { id: 5, color: 'pink' },
  { id: 6, color: 'lime' },
  { id: 7, color: 'sky' },
  { id: 8, color: 'gray' }
]

const Board = ({ boards }) => {
  const history = useHistory()
  const isLoading = useSelector(state => state.common.isLoading)
  const state = useSelector(state => state.home)
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [boardName, setBoardName] = useState('')
  const [selectedBoardColor, setSelectedBoardColor] = useState('blue')
  const lsIdBoard = localStorage.getItem('board_id')
  const idBoard = state?.idBoard || lsIdBoard
  

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

  const handleInput = (e) => setBoardName(e.target.value.trim())

  const handleCreateBoard = (name, idBoard, data) => {
    setIsModalOpen(false)
    dispatch(createBoard(name, idBoard, data))
  }

  let content = null

  if (boards) {
    content = boards?.map(board => {
      const bgdScaled = board?.prefs?.backgroundImageScaled
      const bgdColor = board?.prefs?.background
      const backgroundBoard = bgdScaled ? { backgroundImage: `url(${bgdScaled[1].url})` } : { backgroundColor: `var(--${bgdColor})` }
      return (
        <Col key={board?.id} xs>
          <Card className="board" onClick={ () => handleSelectBoard(board?.id, board?.url, board?.name) }>
            <div className="board-overlay" />
            <Card.Body style={backgroundBoard}>
              <Card.Title className="board-name">{board?.name}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      )}
    )
  } else if (!boards && isLoading) {
    content = <p>Loading ...</p>
  } else {
    content = <p>No Boards</p>
  }

  return (
    <>
      {content}
      <Col xs style={{ alignItems: 'center' }}>
        <Card className="board-add" onClick={ () => setIsModalOpen(true) }>
          <Card.Body>
            <Card.Title className="board-name">Create new board</Card.Title>
          </Card.Body>
        </Card>
      </Col>

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create new board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>
                Enter board name
              </Form.Label>
              <Form.Control autoFocus placeholder="Board name" onChange={(e) => handleInput(e)} />
            </Form.Group>
          </Form>
          <div className="board-colors">
            <Row className="board-colors-row">
              {boardColors.map(bc => {
                return (
                  // <div key={bc.id} style={{ backgroundColor: bc.color }} />
                  <Card
                    style={{ width: '2rem', height: '2rem', backgroundColor: bc.color }}
                    key={bc.id}
                    className="board-color mb-2"
                    onClick={ () => setSelectedBoardColor(bc.color) }
                  >
                    { bc.color === selectedBoardColor ?
                      <>
                        { selectedBoardColor === 'sky' ? null : <div className="board-color-overlay" /> }
                        <IoCheckmarkSharp size={18} color={ selectedBoardColor === 'sky' ? "secondary" : 'white' } />
                      </>
                      : null
                    }
                  </Card>
                )
              })}
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => setIsModalOpen(false) }>
            Close
          </Button>
          <Button variant="primary" disabled={ boardName.length < 1 } onClick={ () => handleCreateBoard(boardName, idBoard, { prefs_background: selectedBoardColor }) }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
 
export default Board;