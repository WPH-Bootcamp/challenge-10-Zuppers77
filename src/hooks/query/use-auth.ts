/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoginValues, RegisterValues } from "@/lib/validations/auth-schema";
import { queryKeys } from "@/hooks/query/keys";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: (data: LoginValues) => authService.login(data),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);

      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });

      toast.success("Login successful");
      router.push("/");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
    },
  });

  // Register Mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterValues) => authService.register(data),
    onSuccess: () => {
      toast.success("Registration successful! Please login.");
      router.push("/login");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
    },
  });

  // Get Current User
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authService.getMe,
    enabled: typeof window !== "undefined" && !!localStorage.getItem("token"),
    retry: false,
  });

  const logout = () => {
    localStorage.removeItem("token");
    queryClient.setQueryData(queryKeys.auth.me, null);
    router.push("/login");
    toast.info("Logged out successfully");
  };

  return {
    loginMutation,
    registerMutation,
    user,
    isLoadingUser,
    isAuthenticated: !!user,
    logout,
  };
}
