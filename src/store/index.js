import { configureStore } from '@reduxjs/toolkit';
import loginSettingsReducer from '../reducers/loginSettings';

const store = configureStore({
  reducer: {
    loginSettings: loginSettingsReducer,
  },
});

export default store;
