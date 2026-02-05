import { api } from "@/lib/api";
import { LoginValues, RegisterValues } from "@/lib/validations/auth-schema";
import { LoginResponse, RegisterResponse, User } from "@/types/user-types";

export const authService = {
  login: async (data: LoginValues) => {
    const response = await api.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registerData } = data;
    const response = await api.post<RegisterResponse>(
      "/auth/register",
      registerData,
    );
    return response.data;
  },

  getMe: async () => {
    const response = await api.get<User>("/users/me");
    return response.data;
  },
};
