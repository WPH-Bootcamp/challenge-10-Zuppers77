// Generic API Response Wrapper
export interface ApiResponse<T> {
  message?: string;
  data: T;
}

// Generic Pagination Response
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  lastPage: number;
}
