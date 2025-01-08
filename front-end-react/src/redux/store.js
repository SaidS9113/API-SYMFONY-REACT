import { configureStore } from '@reduxjs/toolkit';
import produitReducer from './slices/produitSlice';

const store = configureStore({
    reducer: {
        produit: produitReducer,
    },
});

export default store;
