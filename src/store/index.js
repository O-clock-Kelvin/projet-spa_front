import { configureStore } from '@reduxjs/toolkit';
import loginSettingsReducer from '../reducers/loginSettings';

// configuration du store de redux
const store = configureStore({
  reducer: {
    loginSettings: loginSettingsReducer,
  },
});

export default store;
