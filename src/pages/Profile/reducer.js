import { SET_PROFILE_PROP } from "./consts"

const initialState = {
  profile: null
}

function profileReducer(state = initialState, action) {
  const { type } = action
	switch (type) {
    case SET_PROFILE_PROP:
      return {
        ...state,
        [action.key]: action.value
      }

	default:
		return state
	}
}

export default profileReducer