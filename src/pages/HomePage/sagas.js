import { put, call, takeEvery } from 'redux-saga/effects'
import { getBoardsData, getSingleBoardData, getSingleBoardListsData, getSingleBoardCardsData, getUserData, updateSingleCard, createSingleCard, deleteSingleCard, moveSingleCard, createNewList, editListTitle, deleteTheList, createNewBoard, deleteSingleBoard, editSingleBoard } from '../../lib/api'
import { IS_LOADER_ACTIVE } from '../../root/consts';
import { SET_PROFILE_PROP } from '../Profile/consts';
import { deleteCard } from './action';
import { CREATE_BOARD, CREATE_CARD, CREATE_LIST, DELETE_BOARD, DELETE_CARD, DELETE_LIST, EDIT_BOARD, EDIT_LIST_TITLE, EDIT_LIST_TITLE_ON_BLUR, GET_BOARDS, GET_BOARDS_FAILED, GET_BOARDS_SUCCESS, GET_SINGLE_BOARD, MOVE_CARD, SET_HOME_PROP, UPDATE_CARD } from './consts';


function* initSaga() {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
    const resProfile = yield call(getUserData)
    const res = yield call(getBoardsData)
    const data = yield res?.data
    yield put({ type: GET_BOARDS_SUCCESS, boards: data })
    yield put({ type: SET_PROFILE_PROP, key: 'profile', value: resProfile?.data })
    yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      yield put({ type: GET_BOARDS_FAILED, boardsError: error })
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

function* getSingleBoard(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
    const res = yield call(getSingleBoardData, action?.idBoard)
    const resLists = yield call(getSingleBoardListsData, action?.idBoard)
    const resCards = yield call(getSingleBoardCardsData, action?.idBoard)
    const data = yield res?.data
    yield put({ type: SET_HOME_PROP, key: 'idBoard', value: action?.idBoard })
    yield put({ type: SET_HOME_PROP, key: 'singleBoard', value: data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardLists', value: resLists?.data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardCards', value: resCards?.data })
    if (action.cb) {
      yield action?.cb()
    }
    yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      console.log('error at getSingleBoard', error)
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

function* createSingleBoardCard(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
    const res = yield call(createSingleCard, action?.idList, action?.data)
    const resCards = yield call(getSingleBoardCardsData, action?.idBoard)
    const data = yield res?.data
    yield put({ type: SET_HOME_PROP, key: 'singleBoardCardCreated', value: data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardCards', value: resCards?.data })
    yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      console.log('error at getSingleBoard', error)
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

function* updateSingleBoardCard(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
    const res = yield call(updateSingleCard, action?.idCard, action?.data)
    const resCards = yield call(getSingleBoardCardsData, action?.idBoard)
    const data = yield res?.data
    yield put({ type: SET_HOME_PROP, key: 'idCard', value: action?.idCard })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardCardUpdated', value: data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardCards', value: resCards?.data })

    if (action.cb) {
      yield action?.cb()
    }
    yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      console.log('error at getSingleBoard', error)
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

function* deleteSingleBoardCard(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
    const res = yield call(deleteSingleCard, action?.idCard)
    const resCards = yield call(getSingleBoardCardsData, action?.idBoard)
    const data = yield res?.data
    yield put({ type: SET_HOME_PROP, key: 'idCard', value: action?.idCard })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardCardDeleted', value: data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardCards', value: resCards?.data })
    yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      console.log('error at getSingleBoard', error)
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

function* moveSingleBoardCard(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
    const res = yield call(moveSingleCard, action?.idCard, action?.data)
    const resCards = yield call(getSingleBoardCardsData, action?.idBoard)
    const data = yield res?.data
    yield put({ type: SET_HOME_PROP, key: 'idCard', value: action?.idCard })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardCardMoved', value: data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardCards', value: resCards?.data })
    yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      console.log('error at moveSingleCard', error)
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

function* createNewListFlow(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
    const res = yield call(createNewList, action?.idBoard, action?.data, action?.position)
    const resLists = yield call(getSingleBoardListsData, action?.idBoard)
    const resCards = yield call(getSingleBoardCardsData, action?.idBoard)
    const data = yield res?.data
    yield put({ type: SET_HOME_PROP, key: 'idCard', value: action?.idCard })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardListCreated', value: data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardLists', value: resLists?.data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardCards', value: resCards?.data })
    yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      console.log('error at createNewListFlow', error)
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

function* editListTitleFlow(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
    const res = yield call(editListTitle, action?.idList, action?.data)
    const resLists = yield call(getSingleBoardListsData, action?.idBoard)
    const resCards = yield call(getSingleBoardCardsData, action?.idBoard)
    const data = yield res?.data
    yield put({ type: SET_HOME_PROP, key: 'idList', value: action?.idList })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardListEdited', value: data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardLists', value: resLists?.data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardCards', value: resCards?.data })
    yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      console.log('error at createNewListFlow', error)
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

function* deleteListFlow(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
    const res = yield call(deleteTheList, action?.idList, action?.data)
    const resLists = yield call(getSingleBoardListsData, action?.idBoard)
    const resCards = yield call(getSingleBoardCardsData, action?.idBoard)
    const data = yield res?.data
    yield put({ type: SET_HOME_PROP, key: 'idList', value: action?.idList })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardListDelited', value: data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardLists', value: resLists?.data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardCards', value: resCards?.data })
    yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      console.log('error at createNewListFlow', error)
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

function* createNewBoardFlow(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
    const res = yield call(createNewBoard, action?.boardName, action?.data)
    const resBoards = yield call(getBoardsData)
    const resLists = yield call(getSingleBoardListsData, action?.idBoard)
    const resCards = yield call(getSingleBoardCardsData, action?.idBoard)
    const data = yield res?.data
    yield put({ type: GET_BOARDS_SUCCESS, boards: resBoards?.data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardListDelited', value: data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardLists', value: resLists?.data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardCards', value: resCards?.data })
    yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      console.log('error at createNewListFlow', error)
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

function* deleteBoardFlow(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
    const res = yield call(deleteSingleBoard, action?.idBoard)
    const resBoards = yield call(getBoardsData)
    const data = yield res?.data
    yield put({ type: SET_HOME_PROP, key: 'idList', value: action?.idList })
    yield put({ type: GET_BOARDS_SUCCESS, boards: resBoards?.data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardDeleted', value: data })
    yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      console.log('error at createNewListFlow', error)
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

function* editBoardFlow(action) {
  yield put({ type: IS_LOADER_ACTIVE, isLoading: true })
  try {
    const res = yield call(editSingleBoard, action?.idBoard, action?.data)
    const resSingleBoard = yield call(getSingleBoardData, action?.idBoard)
    const resBoards = yield call(getBoardsData)
    const resLists = yield call(getSingleBoardListsData, action?.idBoard)
    const resCards = yield call(getSingleBoardCardsData, action?.idBoard)
    const data = yield res?.data
    yield put({ type: GET_BOARDS_SUCCESS, boards: resBoards?.data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoard', value: resSingleBoard?.data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardEdited', value: data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardLists', value: resLists?.data })
    yield put({ type: SET_HOME_PROP, key: 'singleBoardCards', value: resCards?.data })
    yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  } catch (error) {
      console.log('error at createNewListFlow', error)
      yield put({ type: IS_LOADER_ACTIVE, isLoading: false })
  }
}

export function* watchInitSaga() {
  yield takeEvery(GET_BOARDS, initSaga)
}

export function* watchGetSingleBoard() {
  yield takeEvery(GET_SINGLE_BOARD, getSingleBoard)
}

export function* watchCreateSingleBoardCard() {
  yield takeEvery(CREATE_CARD, createSingleBoardCard)
}

export function* watchUpdateSingleBoardCard() {
  yield takeEvery(UPDATE_CARD, updateSingleBoardCard)
}

export function* watchDeleteSingleBoardCard() {
  yield takeEvery(DELETE_CARD, deleteSingleBoardCard)
}

export function* watchMoveSingleBoardCard() {
  yield takeEvery(MOVE_CARD, moveSingleBoardCard)
}

export function* watchCreateNewListFlow() {
  yield takeEvery(CREATE_LIST, createNewListFlow)
}

export function* watchEditListTitleFlow() {
  yield takeEvery(EDIT_LIST_TITLE_ON_BLUR, editListTitleFlow)
}

export function* watchDeleteListFlow() {
  yield takeEvery(DELETE_LIST, deleteListFlow)
}

export function* watchCreateNewBoardFlow() {
  yield takeEvery(CREATE_BOARD, createNewBoardFlow)
}

export function* watchDeleteBoardFlow() {
  yield takeEvery(DELETE_BOARD, deleteBoardFlow)
}

export function* watchEditBoardFlow() {
  yield takeEvery(EDIT_BOARD, editBoardFlow)
}
