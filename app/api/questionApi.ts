import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {QuestionType} from '../types/questionType';

export interface GetQuestionsResponse extends QuestionType {}

export const questionApi: any = createApi({
  reducerPath: 'questionApiReducer',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://zgzg16fn-9000.asse.devtunnels.ms', //EndPont Laravel
    
      // baseUrl:
      // 'https://api.npoint.io', //EndPoint Json
  }),
  tagTypes: ['Question'],
  endpoints: build => ({
    getQuestions: build.query<GetQuestionsResponse, void>({
      query: () => ({
        url: `/questions`,
        // url: `/8a1366f2029b68427984`,
        method: 'GET',
      }),
      providesTags: ['Question'],
      forceRefetch: () => true,
    }),
  }),
});
