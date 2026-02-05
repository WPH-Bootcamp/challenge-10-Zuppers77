import { api } from "@/lib/api";
import { Post } from "@/types/post-types";
import { User } from "@/types/user-types";
import { PasswordFormValues } from "@/lib/validations/user-schema";
import { PaginatedResponse } from "@/types/api-types";

// Public Profile Response (User info + posts)
type PublicProfileResponse = User & {
  posts: PaginatedResponse<Post>;
};

export const userService = {
  getUserByUsername: async (username: string) => {
    const response = await api.get<PublicProfileResponse>(
      `/users/by-username/${username}`,
    );
    return response.data;
  },

  updateProfile: async (data: FormData) => {
    const response = await api.patch<User>("/users/profile", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updatePassword: async (data: PasswordFormValues) => {
    const response = await api.patch<{ message: string }>(
      "/users/password",
      data,
    );
    return response.data;
  },
};
