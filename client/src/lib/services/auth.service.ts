import { LoginResponse, RegisterType } from "@/types/auth";
import { authApi, publicApi } from "../configs/axios-instance";
import { errorHandler } from "../utils/error";
import { ApiResponse } from "@/types";

export const login = async (body: { email: string; password: string }) => {
  try {
    const { data } = await publicApi.post<ApiResponse<LoginResponse>>(
      "/auth/sign-in",
      body
    );

    return data.data;
  } catch (err) {
    errorHandler(err || "Unable to login");
  }
};

export const getRefreshToken = async (refreshToken: string) => {
  try {
    const { data } = await publicApi.post<
      ApiResponse<{
        accessToken: string;
        accessTokenExpiresAt: string;
      }>
    >("/auth/refresh", { refreshToken });

    return data.data;
  } catch (err) {
    errorHandler(err || "Unable to refresh token");
  }
};

export const signUp = async (body: RegisterType) => {
  try {
    await publicApi.post("/auth/sign-up/store", body);
  } catch (err) {
    errorHandler(err || "Unable to sign up");
  }
};

export const setupPassword = async (body: {
  password: string;
  token: string;
}) => {
  try {
    await publicApi.post(
      "/auth/set-password",
      { password: body.password },
      {
        headers: { Authorization: `Bearer ${body.token}` },
      }
    );
  } catch (err) {
    errorHandler(err || "Unable to set password");
  }
};

export const verifyEmail = async (body: { email: string; token: string }) => {
  try {
    const { data } = await publicApi.post<ApiResponse<LoginResponse>>(
      "/auth/verify-email",
      body
    );

    return data.data;
  } catch (err) {
    errorHandler(err || "Unable to verify email");
  }
};

export const resendOtp = async (email: string) => {
  try {
    await publicApi.post("/auth/verify-email/resend-otp", email);
  } catch (err) {
    errorHandler(err || "Unable to resend OTP");
  }
};

export const signOut = async () => {
  try {
    await authApi.get("/auth/sign-out");
  } catch (error) {
    errorHandler(error || "Unable to sign out");
  }
};
