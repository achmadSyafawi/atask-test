import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./rootReducer";

export default function configureStore(preloadedState: any) {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const composedEnhancers = compose(middlewareEnhancer);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
