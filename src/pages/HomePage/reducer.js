import { EDIT_LIST_TITLE, GET_BOARDS_FAILED, GET_BOARDS_SUCCESS, SET_HOME_PROP } from "./consts"

const initialState = {
  boards: null,
  boardsError: null,
  boardId: null,
  editedListTitle: null
}

function homeReducer(state = initialState, action) {
  const { type } = action
	switch (type) {
    case GET_BOARDS_SUCCESS:
      return {
        ...state,
        boards: action.boards
      }
    case GET_BOARDS_FAILED:
      return {
        ...state,
        boardsError: action.boardsError
      }
    case EDIT_LIST_TITLE:
      return {
        ...state,
        editedListTitle: action.editedListTitle
      }
    case SET_HOME_PROP:
      return {
        ...state,
        [action.key]: action.value
      }

	default:
		return state
	}
}

export default homeReducer