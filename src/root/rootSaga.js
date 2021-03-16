import { all } from "redux-saga/effects";
import { watchCreateSingleBoardCard, watchGetSingleBoard, watchInitSaga, watchUpdateSingleBoardCard, watchMoveSingleBoardCard, watchDeleteSingleBoardCard, watchCreateNewListFlow, watchEditListTitleFlow, watchDeleteListFlow, watchCreateNewBoardFlow, watchDeleteBoardFlow, watchEditBoardFlow } from "../pages/HomePage/sagas";

export default function* rootSaga() {
  yield all([
		watchInitSaga(),
    watchGetSingleBoard(),
    watchUpdateSingleBoardCard(),
    watchCreateSingleBoardCard(),
    watchDeleteSingleBoardCard(),
    watchMoveSingleBoardCard(),
    watchCreateNewListFlow(),
    watchEditListTitleFlow(),
    watchDeleteListFlow(),
    watchCreateNewBoardFlow(),
    watchDeleteBoardFlow(),
    watchEditBoardFlow()
  ])
}