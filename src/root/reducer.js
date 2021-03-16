import { IS_LOADER_ACTIVE, SET_COMMON_PROP } from "./consts"

const initialState = {
  isLoading: null
}

function commonReducer(state = initialState, action) {
  const { type } = action
	switch (type) {
    case IS_LOADER_ACTIVE:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case SET_COMMON_PROP:
      return {
        ...state,
        [action.key]: action.value
      }

	default:
		return state
	}
}

export default commonReducer