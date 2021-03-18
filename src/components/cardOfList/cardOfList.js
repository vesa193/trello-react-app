import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import { IoTrashBinOutline, IoArrowForwardOutline, IoArrowBackSharp, IoEllipsisHorizontal } from 'react-icons/io5';
import { deleteCard, moveCard, updateCard } from '../../pages/HomePage/action';
import './cardOfList.scss'

const CardOfList = ({ boardCards, list }) => {
  const cardOfList = document.querySelector('.cardOfList');
  const dispatch = useDispatch()
  const state = useSelector(state => state.home)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isMoreClicked, setIsMoreClicked] = useState(false)
  const [moveClicked, setMoveClicked] = useState(false)
  const [val, setVal] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const lsBoardId = localStorage.getItem('board_id')
  const idBoard = state?.idBoard || lsBoardId


  useEffect(() => {
    resetState()
  }, [boardCards])

  const resetState = () => {
    setVal('')
    setSelectedItem(null)
    setIsEditing(false)
    setIsMoreClicked(false)
    setMoveClicked(false)
  }
  
  const handleEditCard = (id, selectedId) => {
    // if (cardOfList) {
    //   cardOfList.scrollIntoView()
    // }

    if (id) {
      setSelectedItem(id)
      setIsEditing(true)
    }

    if (selectedId === id) { return null }
  }

  const handleInput = (e) => setVal(e.target.value.trim())

  const handleCloseEdit = () => {
    setSelectedItem(null)
    setVal('')
    setIsMoreClicked(false)
    setMoveClicked(false)
  }

  const handleUpdateCard = (idCard, data, idBoard) => {
    setSelectedItem(null)
    setIsEditing(false)
    dispatch(updateCard(idCard, data, idBoard))
  }

  const disabledButton = (valLen, contentLen) => {
    let disabled = null
    if (valLen !== 0 && valLen !== contentLen) {
      disabled = false
    } else {
      disabled = true
    }

    return disabled
  }

  const handleMoreActions = (prop) => {
    setIsMoreClicked(prop)
  }

  const handleDeleteCard = (idCard, idBoard) => {
    dispatch(deleteCard(idCard, idBoard))
  }

  const handleMoveCard = (idCard, idList, idBoard, data) => {
    dispatch(moveCard(idCard, idList, idBoard, data))
    setMoveClicked(false)
  }

  
  return (
    <>
      {
        boardCards.map(card => {
          const content = card.idList === list.id && card.name.length > 0 ? card.name : null
          const isVisible = selectedItem === card.id && isEditing ? 'visible' : 'hidden'
          const isEditable = selectedItem === card.id && isEditing ? 'editable' : 'uneditable'
          const isMoreVisible = selectedItem === card.id && isMoreClicked ? 'visible' : 'hidden'
          const show = selectedItem === card.id && isMoreClicked

          const renderCard = () => {
            if (content?.length) {
              return (
                <React.Fragment key={card.id}>
                  <div className={`cardOfList-overlay cardOfList-overlay--${isVisible}`} onClick={ () => handleCloseEdit() } />
                  <div className={`cardOfList cardOfList--${isEditable}`} onClick={ () => handleEditCard(card.id, selectedItem) }>
                    <Dropdown.Menu show={show}>
                      { moveClicked ? 
                        <>
                          <Dropdown.Item onClick={ () => setMoveClicked(false)}>
                            <IoArrowBackSharp size={15} />
                            Back
                          </Dropdown.Item> 
                          <Dropdown.Divider />
                        </>
                      : null }
                      
                      { moveClicked ? 
                        state.singleBoardLists.map(list => {
                          return (
                            <React.Fragment key={list.id}>
                              <Dropdown.Item disabled={list.id === card.idList} eventKey="3" onClick={ () => handleMoveCard(card.id, list.id, idBoard, { idList: list.id }) }>
                                {list.name}
                              </Dropdown.Item>
                            </React.Fragment>
                          )
                        })
                      
                      :
                      <>
                        <Dropdown.Header>More card actions</Dropdown.Header>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="3" onClick={ () => setMoveClicked(true)}>
                          Move
                          <IoArrowForwardOutline size={15} />
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="3" onClick={ () => setMoveClicked(true)}>
                          View details
                          <IoEllipsisHorizontal size={15} />
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={() => handleDeleteCard(card.id, idBoard)}>
                          Delete
                          <IoTrashBinOutline size={15} />
                        </Dropdown.Item>
                      </> }
                    </Dropdown.Menu>
                    { selectedItem === card.id && isEditing ?
                      <>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Control as="textarea" rows={4} defaultValue={content} onChange={(e) => handleInput(e)} />
                        </Form.Group>
                        <div className="cardOfList-footer">
                          <Button variant="success" disabled={disabledButton(val.length, content.length)} onClick={() => handleUpdateCard(selectedItem, { name: val }, idBoard)}>Save</Button>
                          <Button variant="light" className="cardOfList-footer-btn" onClick={() => handleMoreActions(!isMoreClicked)}>More ...</Button>
                        </div>
                      </>
                      :
                      <p key={card.id}>{content}</p>
                    }
                  </div>
                </React.Fragment>
              )
            }
          }
          

          return (
            renderCard()
          )
        })
      }
    </>
  );
}

export default CardOfList;