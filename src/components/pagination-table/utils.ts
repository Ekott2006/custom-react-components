export type APIResponse<Data> = {
  meta: PaginatedResponse;
  data: Data[];
};

export type Data = {
  id: number;
  profilePicture: string;
  firstName: string;
  lastName: string;
  userName: string;
  dateRegistered: string;
  recentActivity: string;
  email: string;
  status: string;
};

export type PaginatedResponse = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}