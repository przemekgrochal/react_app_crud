import { createStore, applyMiddleware, compose } from "redux";
// import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
// import { THROW_GLOBAL_ERROR } from "./types";
// import reducers from "./reducers";
// import rootSaga from "./sagas";
// import logger from "redux-logger";
import allReducers from "./reducers/index";
// const store = () => {
//   const sagaMiddleware = createSagaMiddleware();
//   const createdStore = createStore(
//     reducers,
//     compose(applyMiddleware(sagaMiddleware, logger), composeWithDevTools())
//   );

//   sagaMiddleware
//     .run(rootSaga)
//     .toPromise()
//     .catch(() => createdStore.dispatch({ type: THROW_GLOBAL_ERROR }));

//   return createdStore;
// };

const store = createStore(allReducers, composeWithDevTools());

export default store;
