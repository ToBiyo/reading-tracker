import { NextResponse } from "next/server";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};

type JsonResponseOptions = {
  status?: number;
};

// This helper function standardizes JSON responses for API routes, allowing for consistent structure and status codes.

export const jsonResponse = <T>(
  payload: ApiResponse<T>,
  options?: JsonResponseOptions,
) => {
  const { status } = options || { status: 200 };
  return NextResponse.json(payload, { status });
};
