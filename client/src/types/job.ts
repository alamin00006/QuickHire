export interface JobLocation {
  city?: string;
  country?: string;
}

export interface CreateJobDto {
  name: string;
  title: string;
  description?: string;
}

export interface UpdateJobDto {
  name?: string;
  title?: string;
  description?: string;
}

export interface JobResponse {
  id: string;
  _id: string;
  title: string;
  company: string;
  type: string;
  description?: string;
  location?: JobLocation;
  tags?: string[];
  isFeatured?: boolean;
}

export interface JobListResponse {
  jobs: JobResponse[];
  total: number;
  page: number;
  limit: number;
}
