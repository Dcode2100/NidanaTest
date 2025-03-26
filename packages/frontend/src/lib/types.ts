export type User = {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
  // Add other user properties as needed based on your backend response
};

export type ApiResponse<T> = {
  data?: T;
  message?: string;
  error?: string;
};