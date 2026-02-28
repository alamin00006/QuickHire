export interface CreateJobDto {
  title: string;
  company: string;
  category: string;
  type: string;
  location: string;
  description: string;
  isFeatured: boolean;
}

export interface UpdateJobDto {
  name?: string;
  title?: string;
  description?: string;
  isFeatured?: boolean;
}

export interface JobResponse {
  id: string;
  title: string;
  description?: string;
  isFeatured?: boolean;

  // other fields returned from API
}

export interface JobListResponse {
  jobs: JobResponse[];
  total: number;
  page: number;
  limit: number;
}
