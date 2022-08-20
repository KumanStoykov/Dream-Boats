import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import appInitialStore from './appInitialStore';
import authStore from './authStore';
import boatStore from './boatStore';
import modalStore from './modalStore';
import watchStore from './watchStore';
import commentStore from './commentStore';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['watchList'],
};

const rootReducer = combineReducers({
    app: appInitialStore,
    auth: authStore,
    allBoats: boatStore,
    modal: modalStore,
    watchList: watchStore,
    allComments: commentStore
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

});

export const persistor = persistStore(store);

export default store;