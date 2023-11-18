import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { UserInfo } from '../store/auth';

export type GetUserAuthPayload = {
  email: string;
}

export interface GetUserAuthResponse extends UserInfo{}

export type UserResponse = {
  data: UserInfo
}

const authApi = createApi({
  reducerPath: 'authApiReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://4lrfl253-5000.asse.devtunnels.ms',
  }),
  tagTypes: ['Auth'],
  endpoints: build => ({
    getUserAuth: build.query<GetUserAuthResponse, GetUserAuthPayload>({
      query: (auth) => {
        console.log("authApi = "+ auth);
        const param = auth && auth.email

        return {
          url: `/auth/user/${param}`,
          method: 'GET',
        }
      },
      providesTags: ['Auth'],
      forceRefetch: () => true
    }),
    createUserAuth: build.mutation<GetUserAuthResponse, UserInfo>({
      query: (auth) => ({
        url: '/auth/store',
        method: 'POST',
        body: auth,
      }),
      invalidatesTags: ['Auth']
    }),
    updateUserAuth: build.mutation<GetUserAuthResponse, UserInfo>({
      query: (auth) => {
        const param = auth  && auth.email
        return {
          url: `/auth/user/${param}`,
          method: 'PATCH',
          body: auth,
        }
        
      }, 
      invalidatesTags: ['Auth']
    })
  }),
});

export default authApi;

