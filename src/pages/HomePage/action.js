import { CREATE_BOARD, CREATE_CARD, CREATE_LIST, DELETE_BOARD, DELETE_CARD, DELETE_LIST, EDIT_BOARD, EDIT_LIST_TITLE, EDIT_LIST_TITLE_ON_BLUR, GET_BOARDS, GET_BOARDS_FAILED, GET_BOARDS_SUCCESS, GET_SINGLE_BOARD, MOVE_CARD, UPDATE_CARD } from "./consts"

export const getBoards = () => {
  return {
    type: GET_BOARDS
  }
}

export const getBoardsSuccess = (boards) => {
  return {
    type: GET_BOARDS_SUCCESS,
    boards
  }
}

export const getBoardsFailed = (boardsError) => {
  return {
    type: GET_BOARDS_FAILED,
    boardsError
  }
}

export const getSingleBoard = (idBoard, slugName, boardName, cb) => {
  return {
    type: GET_SINGLE_BOARD,
    idBoard,
    slugName, 
    boardName,
    cb
  }
}

export const createCard = (data, idList, idBoard) => {
  return {
    type: CREATE_CARD,
    data,
    idList,
    idBoard
  }
}

export const updateCard = (idCard, data, idBoard) => {
  return {
    type: UPDATE_CARD,
    idCard,
    data,
    idBoard
  }
}

export const deleteCard = (idCard, idBoard) => {
  return {
    type: DELETE_CARD,
    idCard,
    idBoard
  }
}

export const moveCard = (idCard, idList, idBoard, data) => {
  return {
    type: MOVE_CARD,
    idCard,
    idList,
    idBoard,
    data
  }
}

export const createList = (idBoard, data, position) => {
  return {
    type: CREATE_LIST,
    idBoard,
    data,
    position
  }
}

export const editListTitle = (editedListTitle, idBoard, idList, data) => {
  return {
    type: EDIT_LIST_TITLE,
    editedListTitle,
    idBoard,
    idList,
    data
  }
}

export const editListTitleOnBlurDispatching = (idBoard, idList, data) => {
  return {
    type: EDIT_LIST_TITLE_ON_BLUR,
    idBoard,
    idList,
    data
  }
}

export const deleteList = (idList, idBoard, data) => {
  return {
    type: DELETE_LIST,
    idList,
    idBoard,
    data
  }
}

export const createBoard = (boardName, idBoard, data) => {
  return {
    type: CREATE_BOARD,
    boardName,
    idBoard,
    data
  }
}

export const deleteBoard = (idBoard) => {
  return {
    type: DELETE_BOARD,
    idBoard
  }
}

export const editBoard = (idBoard, data) => {
  return {
    type: EDIT_BOARD,
    idBoard,
    data
  }
}
