import { configureStore } from 'redux-starter-kit';
import { itemReducer } from './reducers/item_reducer';

const store = configureStore({
  reducer: {
    items: itemReducer,
  },
})

export { store as default }
