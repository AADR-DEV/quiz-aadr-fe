import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '.';
import { authApi } from '../api';
import { GetUserAuthResponse } from '../api/authApi';

export type UserInfo = {
  id: string,
  name: string | null,
  username: string | null,
  email: string | null,
  mainAvatar: string | null,
  avatars: string[];
  total_diamonds: number,
}

export type AuthState = {
  isLoading: boolean;
  userInfo: UserInfo | null;
};

export const initialState: AuthState = {
  isLoading: false,
  userInfo: {
    id: '',
    name: '',
    username: '',
    email: '',
    mainAvatar: '',
    avatars: [],
    total_diamonds: 0,
  },
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.isLoading= action.payload.isLoading
      state.userInfo = action.payload.userInfo
    },
    logout: state => {
      state.isLoading = false
      state.userInfo = null
    },
    session: (state: Pick<AuthState, 'userInfo'>, action: PayloadAction<Pick<AuthState, 'userInfo'>>) => {
      if (state.userInfo && action.payload.userInfo) {
        state.userInfo.username = action.payload.userInfo.username;
      }
    }    
  },
  extraReducers: builder => {
    builder.addMatcher(authApi.endpoints.getUserAuth.matchFulfilled, (state, action: PayloadAction<GetUserAuthResponse>) => {
      state.userInfo = action.payload
    })
  }
});

export const selectAuth = (state: RootState) => state.auth.userInfo
export const selectLoading = (state: RootState) => state.auth.isLoading

export const { login, logout, session } = authSlice.actions;
export default authSlice.reducer;
