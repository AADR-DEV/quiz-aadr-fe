import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserInfo } from '../store/auth';
import { DiamondCategory, DiamondInfo } from '../types/diamondCatTypes';
import { AvatarCat, AvatarInfo } from '../types/avatarCatType';

export type GetUserAuthPayload = {
  email: string;
}
export type UserResponse = {
  data: UserInfo
}

export interface GetUserAuthResponse extends UserInfo{}
export interface GetDiamondCatResponse extends DiamondCategory{}
export interface GetAvatarListResponse extends AvatarCat{}
export interface GetAvatarCategoryResponse extends AvatarCat{}


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
    //Purchase Diamond Category
    purchaseDiamond: build.mutation<GetDiamondCatResponse, DiamondInfo>({
      query: diamond => ({
        url: '/diamond/purchase',
        method: 'POST',
        body: diamond,
      }),
      invalidatesTags: ['Auth'],
    }),
    //Get Avatar List
    getAvatarList: build.query<GetAvatarListResponse, void>({
      query: () => ({
        url: `/avatar/category`,
        method: 'GET',
      }),
      providesTags: ['Auth'],
      forceRefetch: () => true
    }),
    //Get Avatar Category List
    getAvatarCategory: build.query<GetAvatarCategoryResponse, void>({
      query: () => ({
        url: `/avatar/category`,
        method: 'GET',
      }),
      providesTags: ['Auth'],
      forceRefetch: () => true
    }),
    //Post Avatar Category List
    postAvatarCollection: build.mutation<GetAvatarListResponse, AvatarInfo>({
      query: avatar => ({
        url: '/avatar/collection',
        method: 'POST',
        body: avatar,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export default authApi;

