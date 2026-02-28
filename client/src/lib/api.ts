const API_BASE_URL = "http://localhost:5000/api";

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  _id: string;
  job_id: string;
  name: string;
  email: string;
  resume_link: string;
  cover_note: string;
  createdAt: string;
}

export interface PaginationInfo {
  current_page: number;
  total_pages: number;
  total_items: number;
  per_page: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: PaginationInfo;
  errors?: { field: string; message: string }[];
}

// ---- Jobs ----
export const fetchJobs = async (params?: {
  search?: string;
  category?: string;
  location?: string;
  type?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<Job[]>> => {
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);
  if (params?.category) query.set("category", params.category);
  if (params?.location) query.set("location", params.location);
  if (params?.type) query.set("type", params.type);
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));

  const res = await fetch(`${API_BASE_URL}/jobs?${query.toString()}`);
  return res.json();
};

export const fetchJobById = async (id: string): Promise<ApiResponse<Job>> => {
  const res = await fetch(`${API_BASE_URL}/jobs/${id}`);
  return res.json();
};

export const createJob = async (
  job: Omit<Job, "_id" | "createdAt" | "updatedAt">
): Promise<ApiResponse<Job>> => {
  const res = await fetch(`${API_BASE_URL}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });
  return res.json();
};

export const deleteJob = async (id: string): Promise<ApiResponse<null>> => {
  const res = await fetch(`${API_BASE_URL}/jobs/${id}`, { method: "DELETE" });
  return res.json();
};

// ---- Applications ----
export const submitApplication = async (application: {
  job_id: string;
  name: string;
  email: string;
  resume_link: string;
  cover_note: string;
}): Promise<ApiResponse<Application>> => {
  const res = await fetch(`${API_BASE_URL}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(application),
  });
  return res.json();
};

export const fetchApplications = async (
  job_id?: string
): Promise<ApiResponse<Application[]>> => {
  const query = job_id ? `?job_id=${job_id}` : "";
  const res = await fetch(`${API_BASE_URL}/applications${query}`);
  return res.json();
};
