import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserInfo } from '../store/auth';
import { DiamondCat } from '../types/diamondCatTypes';
import { AvatarCat } from '../types/avatarCatType';

export type GetUserAuthPayload = {
  email: string;
}
export type UserResponse = {
  data: UserInfo
}

export interface GetUserAuthResponse extends UserInfo{}
export interface GetDiamondCatResponse extends DiamondCat{}
export interface GetAvatarListResponse extends AvatarCat{}


const authApi = createApi({
  reducerPath: 'authApiReducer',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://pc7zwqcw-5000.asse.devtunnels.ms', //Server Mas Akbar
    baseUrl: 'https://4lrfl253-5000.asse.devtunnels.ms', //Server Sendiri
  }),
  tagTypes: ['Auth'],
  endpoints: build => ({
    // FindOne Data User
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
    //Post Data User
    createUserAuth: build.mutation<GetUserAuthResponse, UserInfo>({
      query: (auth) => ({
        url: '/auth/store',
        method: 'POST',
        body: auth,
      }),
      invalidatesTags: ['Auth']
    }),
    //Update Data User
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
    }),
    //Get Diamond Category
    getDiamondCategory: build.query<GetDiamondCatResponse, void>({
      query: () => ({
        url: `/diamond/category`,
        method: 'GET',
      }),
      providesTags: ['Auth'],
      forceRefetch: () => true
    }),    
    //Get Avatar List
    getAvatarList: build.query<GetAvatarListResponse, void>({
      query: () => ({
        url: `/avatar/category`,
        method: 'GET',
      }),
      providesTags: ['Auth'],
      forceRefetch: () => true
    })
  }),
});

export default authApi;

