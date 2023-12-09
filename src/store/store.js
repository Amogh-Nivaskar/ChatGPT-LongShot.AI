import { combineReducers, configureStore } from "@reduxjs/toolkit";
import chatAppReducer from "./slices/chatapp";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// const store = configureStore({
//   reducer: {
//     chatApp: chatAppReducer,
//   },
//   devTools: process.env.NODE_ENV !== "production",
// });

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  chatApp: chatAppReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
