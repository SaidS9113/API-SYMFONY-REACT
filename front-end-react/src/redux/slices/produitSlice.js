import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Action pour récupérer les produits
export const fetchProduits = createAsyncThunk(
  'produit/fetchProduits',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/product'); // Appel à l'API
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error.message);

      if (error.response) {
        console.error('Erreur dans la réponse serveur:', error.response.data);
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        console.error('Aucune réponse reçue:', error.request);
        return rejectWithValue('Aucune réponse du serveur.');
      } else {
        console.error('Erreur inattendue:', error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

// Action pour supprimer un produit
export const deleteProduit = createAsyncThunk(
  'produit/deleteProduit',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/product/${id}`); // Appel à l'API pour supprimer un produit
      return id; // Retourne l'ID pour le supprimer du store
    } catch (error) {
      console.error(`Erreur lors de la suppression du produit ${id}:`, error.message);

      if (error.response) {
        console.error('Erreur dans la réponse serveur:', error.response.data);
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        console.error('Aucune réponse reçue:', error.request);
        return rejectWithValue('Aucune réponse du serveur.');
      } else {
        console.error('Erreur inattendue:', error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

const produitSlice = createSlice({
  name: 'produit',
  initialState: {
    produits: [], // Liste des produits
    loading: false, // Indicateur de chargement
    error: null, // Message d'erreur
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
        state.error = action.payload || 'Une erreur est survenue lors de la récupération des produits.';
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
        state.error = action.payload || 'Une erreur est survenue lors de la suppression du produit.';
      });
  },
});

export default produitSlice.reducer;
