export interface ApplyJobDto {
  jobId: string;
  applicantName: string;
  email: string;
  resumeUrl?: string;
  coverLetter?: string;
}

export interface ApplicationResponse {
  id: string;
  jobId: string;
  applicantName: string;
  email: string;
  resumeUrl?: string;
  coverLetter?: string;
  createdAt: string;
}

export interface ApplicationListResponse {
  applications: ApplicationResponse[];
}
