import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../../root/rootReducer'
import rootSaga from '../../root/rootSaga'


const sagaMiddleware = createSagaMiddleware()
const isDevTools = true

let middleware = applyMiddleware(sagaMiddleware)
if (isDevTools) {
	middleware = composeWithDevTools(applyMiddleware(sagaMiddleware))
}

export const store = createStore(
	rootReducer,
	middleware
)

sagaMiddleware.run(rootSaga)