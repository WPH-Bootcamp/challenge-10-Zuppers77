import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user-service";
import { queryKeys } from "./keys";

export const useUserPublicProfile = (username: string) => {
  return useQuery({
    queryKey: queryKeys.users.byUsername(username),
    queryFn: () => userService.getUserByUsername(username),
    enabled: !!username,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.me, data);
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: userService.updatePassword,
  });
};
