import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchPosts as apiFetchPosts,
  fetchPostBySlug,
  createPost,
  updatePost,
  deletePost as apiDeletePost,
  getMyPosts,
  getPopularPosts,
  getSavedPosts,
  togglePostLike,
  toggleSavePost
} from "../../services/api";

// Получение всех постов
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (params = {}, thunkAPI) => {
    try {
      const response = await apiFetchPosts(params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Ошибка загрузки постов"
      );
    }
  }
);

// Получение поста по slug
export const fetchPostBySlugAction = createAsyncThunk(
  'posts/fetchPostBySlug',
  async (slug, thunkAPI) => {
    try {
      const response = await fetchPostBySlug(slug);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Пост не найден"
      );
    }
  }
);

// Создание поста
export const addPost = createAsyncThunk(
  'posts/addPost',
  async (postData, thunkAPI) => {
    try {
      const response = await createPost(postData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Ошибка создания поста"
      );
    }
  }
);

// Обновление поста
export const updatePostAction = createAsyncThunk(
  'posts/updatePost',
  async ({ slug, postData }, thunkAPI) => {
    try {
      const response = await updatePost(slug, postData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Ошибка обновления поста"
      );
    }
  }
);

// Удаление поста
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (slug, thunkAPI) => {
    try {
      await apiDeletePost(slug);
      return slug;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Ошибка удаления поста"
      );
    }
  }
);

// Получение моих постов
export const fetchMyPosts = createAsyncThunk(
  'posts/fetchMyPosts',
  async (params = {}, thunkAPI) => {
    try {
      const response = await getMyPosts(params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Ошибка загрузки ваших постов"
      );
    }
  }
);

// Получение популярных постов
export const fetchPopularPosts = createAsyncThunk(
  'posts/fetchPopularPosts',
  async (params = {}, thunkAPI) => {
    try {
      const response = await getPopularPosts(params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Ошибка загрузки популярных постов"
      );
    }
  }
);

// Получение сохраненных постов
export const fetchSavedPosts = createAsyncThunk(
  'posts/fetchSavedPosts',
  async (params = {}, thunkAPI) => {
    try {
      const response = await getSavedPosts(params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Ошибка загрузки сохраненных постов"
      );
    }
  }
);

// Лайк/анлайк поста
export const likePost = createAsyncThunk(
  'posts/likePost',
  async (slug, thunkAPI) => {
    try {
      const response = await togglePostLike(slug);
      return { slug, ...response };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Ошибка лайка"
      );
    }
  }
);

// Сохранение/удаление из сохраненных
export const savePost = createAsyncThunk(
  'posts/savePost',
  async (slug, thunkAPI) => {
    try {
      const response = await toggleSavePost(slug);
      return { slug, ...response };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Ошибка сохранения"
      );
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    currentPost: null,
    myPosts: [],
    popularPosts: [],
    savedPosts: [],
    loading: false,
    error: null,
    pagination: {
      count: 0,
      next: null,
      previous: null,
    }
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.results || action.payload;
        if (action.payload.count !== undefined) {
          state.pagination = {
            count: action.payload.count,
            next: action.payload.next,
            previous: action.payload.previous,
          };
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch post by slug
      .addCase(fetchPostBySlugAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostBySlugAction.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostBySlugAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add post
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update post
      .addCase(updatePostAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePostAction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(post => post.slug === action.payload.slug);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        if (state.currentPost && state.currentPost.slug === action.payload.slug) {
          state.currentPost = action.payload;
        }
      })
      .addCase(updatePostAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(post => post.slug !== action.payload);
        if (state.currentPost && state.currentPost.slug === action.payload) {
          state.currentPost = null;
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch my posts
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.myPosts = action.payload.results || action.payload;
      })
      // Fetch popular posts
      .addCase(fetchPopularPosts.fulfilled, (state, action) => {
        state.popularPosts = action.payload.results || action.payload;
      })
      // Fetch saved posts
      .addCase(fetchSavedPosts.fulfilled, (state, action) => {
        state.savedPosts = action.payload.results || action.payload;
      })
      // Like post
      .addCase(likePost.fulfilled, (state, action) => {
        const { slug } = action.payload;
        const post = state.posts.find(p => p.slug === slug);
        if (post) {
          post.is_liked = action.payload.liked;
          post.likes_count = action.payload.likes_count;
        }
        if (state.currentPost && state.currentPost.slug === slug) {
          state.currentPost.is_liked = action.payload.liked;
          state.currentPost.likes_count = action.payload.likes_count;
        }
      })
      // Save post
      .addCase(savePost.fulfilled, (state, action) => {
        const { slug } = action.payload;
        const post = state.posts.find(p => p.slug === slug);
        if (post) {
          post.is_saved = action.payload.saved;
        }
        if (state.currentPost && state.currentPost.slug === slug) {
          state.currentPost.is_saved = action.payload.saved;
        }
      });
  },
});

export const { clearError, clearCurrentPost } = postSlice.actions;
export default postSlice.reducer;