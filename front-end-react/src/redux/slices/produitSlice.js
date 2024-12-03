import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Action pour récupérer les produits
export const fetchProduits = createAsyncThunk('produit/fetchProduits', async () => {
    const response = await api.get('/product');
    return response.data;
});

// Action pour supprimer un produit
export const deleteProduit = createAsyncThunk('produit/deleteProduit', async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/product/${id}`);
        return id; 
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
const produitSlice = createSlice({
    name: 'produit',
    initialState: {
        produits: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Gestion de fetchProduits
            .addCase(fetchProduits.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProduits.fulfilled, (state, action) => {
                state.loading = false;
                state.produits = action.payload;
            })
            .addCase(fetchProduits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Gestion de deleteProduit
            .addCase(deleteProduit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduit.fulfilled, (state, action) => {
                state.loading = false;
                state.produits = state.produits.filter(
                    (produit) => produit.id !== action.payload
                );
            })
            .addCase(deleteProduit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default produitSlice.reducer;
