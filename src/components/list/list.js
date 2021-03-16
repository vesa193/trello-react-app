import React, { useEffect, useState } from 'react';
import { Card, Col, Button, Form, Dropdown } from 'react-bootstrap';
import { IoAdd, IoEllipsisHorizontal, IoEllipsisHorizontalCircle, IoTrashBinOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { createCard, deleteList, editListTitle, editListTitleOnBlurDispatching } from '../../pages/HomePage/action';
import CardOfList from '../cardOfList/cardOfList'
import './list.scss'

const List = ({ lists, boardCards }) => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.home)
  const [val, setVal] = useState('')
  const [selectedList, setSelectedList] = useState(null)
  const [selectedListId, setSelectedListId] = useState(null)
  const [selectedListTitle, setSelectedListTitle] = useState(null)
  const [isEditingListTitle, setIsEditingListTitle] = useState('')
  const [isMenuListOpen, setIsMenuListOpen] = useState(false)
  const lsBoardId = localStorage.getItem('board_id')
  const idBoard = state?.idBoard || lsBoardId

  useEffect(() => {
    resetState()
  }, [boardCards])

  useEffect(() => {
    resetState()
  }, [boardCards])

  const handleClickAddCard = (id) => {
    if (id) {
      setSelectedList(id)
    }
  }

  const resetState = () => {
    setVal('')
    setSelectedList(null)
  }

  const handleInput = (e) => {
    const val = e.target.value
    if (val) {
      setVal(val.trim())
    }
  }

  const handleEditListTitleInput = (e) => {
    const val = e.target.value
    setIsEditingListTitle(val.trim())
  }

  const handleEditListTitle = (idList, listName) => {
    setIsEditingListTitle(listName)
    setSelectedListTitle(idList)
    dispatch(editListTitle(true))
  }

  const handleCloseCreate = () => {
    setSelectedList(null)
  }

  const handleCreateCard = (data, idList, idBoard) => {
    dispatch(createCard(data, idList, idBoard))
  }

  const disabledButton = (valLen, titleText, titleVal) => {
    let disabled = null
    if (valLen) {
        if (valLen > 0) {
        disabled = false
      } else {
        disabled = true
      }
    }

    if (titleVal) {
      if (titleVal !== titleText) {
        disabled = false
      } else {
        disabled = true
      }
    }

    return disabled
  }

  const editListTitleOnBlur = (flag, idBoard, idList, data, listName) => {

    setSelectedListTitle(flag)
    if (isEditingListTitle !== listName) {
      dispatch(editListTitleOnBlurDispatching(idBoard, idList, data))
    }
  }

  const handleOpenMenuOfList = (flag, idList) => {
    setSelectedListId(idList)
    setIsMenuListOpen(flag)
  }

  const handleDeleteList = (idList, idBoard, data) => {
    setIsMenuListOpen(false)
    dispatch(deleteList(idList, idBoard, data))
  }

  
  return (
    <>
      { lists?.map(list => {
        const isVisible = selectedList === list.id ? 'visible' : 'hidden'
        
          return (
            <Col key={list.id} xs>
                <Card className="list" border="primary" style={{ width: '18rem' }}>
                  <Dropdown.Menu show={selectedListId === list.id && isMenuListOpen}>
                    <Dropdown.Header>List actions</Dropdown.Header>
                    <Dropdown.Item eventKey="2" onClick={ () => handleDeleteList(list.id, idBoard, { value: 'true' }) }>
                      Delete
                      <IoTrashBinOutline size={15} />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                  <Card.Header className="list-header-wrap">
                    <div className="list-header" onClick={() => handleEditListTitle(list.id, list.name)}>
                      { selectedListTitle !== list.id ?
                        <strong>{list?.name}</strong>
                        :
                        <div>
                          <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control autoFocus defaultValue={isEditingListTitle} placeholder="Enter name of the card" onChange={(e) => handleEditListTitleInput(e)} onBlur={() => editListTitleOnBlur(false, idBoard, list.id, { name: isEditingListTitle }, list.name)} />
                          </Form.Group>
                        </div> }
                    </div>
                    <Button variant="light" onClick={() => handleOpenMenuOfList(!isMenuListOpen, list.id)}>
                      <IoEllipsisHorizontal size={18} />
                    </Button>
                  </Card.Header> 
                  <Card.Body className="card-wrapper">
                    <CardOfList list={list} boardCards={boardCards} />
                    {
                      selectedList === list.id ?
                      <>
                        <div className={`card-wrapper-overlay card-wrapper-overlay--${isVisible}`} onClick={ () => handleCloseCreate() } />
                        <div className="card-wrapper-creating">
                          <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={3} defaultValue={val} placeholder="Enter name of the card" onChange={(e) => handleInput(e)} />
                          </Form.Group>
                          <div className="cardOfList-footer">
                            <Button variant="success" disabled={disabledButton(val.length)} onClick={() => handleCreateCard({ name: val }, list.id, idBoard)}>Add</Button>
                          </div>
                        </div>
                      </>
                      :
                      <Button className="flex-centered flex-gap-10" variant="primary" onClick={() => handleClickAddCard(list.id)}>
                        <IoAdd size={18} />
                        Add new card
                      </Button>
                    }
                  </Card.Body>
                </Card>
              </Col>
            )
          })
        }
    </>
  );
}
 
export default List;