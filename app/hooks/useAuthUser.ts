import authApi, { GetUserAuthPayload } from "../api/authApi" 
import { selectAuth } from "../store/auth"
import { useAppSelector } from "./useRedux"

export function useAuthUser() {
    const currentUser = useAppSelector(selectAuth);
    const { data, isLoading, error } = authApi.useGetUserAuthQuery(
      { email: currentUser?.email } as GetUserAuthPayload,
    );

    return {
        user: data,
        isLoading,
        error
    };
}
