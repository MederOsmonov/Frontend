import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { fetchPosts, fetchPostById } from "../../services/api";

// Получение всех постов
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const res = await axios.get('/api/posts')
    return res.data
  }
)

// Добавление поста
export const addPost = createAsyncThunk(
  'posts/addPost',
  async (postData) => {
    const res = await axios.post('/api/posts', postData)
    return res.data
  }
)

// Удаление поста
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id) => {
    await axios.delete(/api/posts/${id})
    return id
  }
)

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // add
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      // delete
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post.id !== action.payload)
      })
  },
})

export default postSlice.reducer