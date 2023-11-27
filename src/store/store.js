import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

import rootReducer from "store/reducers";

const persistConfig = {
  key: "app",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const store = createStore(persistedReducer, applyMiddleware(...middlewares));

persistStore(store);

export default store;
