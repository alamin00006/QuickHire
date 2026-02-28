"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Briefcase,
  Building2,
  MapPin,
  Tag,
  Clock,
  Star,
  Plus,
  Edit,
  Trash2,
  Loader2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { CreateJobDto } from "@/types/job";
import { useGetLocationsQuery } from "@/redux/api/locationApi";
import {
  useCreateJobMutation,
  useDeleteJobMutation,
  useGetJobsQuery,
  useUpdateJobMutation,
} from "@/redux/api/jopApi";

// ---------------- Default Form ----------------
const defaultForm: CreateJobDto = {
  title: "",
  company: "",
  category: "",
  type: "",
  location: "",
  description: "",
  isFeatured: false,
};

// ---------------- Arrays ----------------
const categories = [
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human Resource",
];

const types = ["Full Time", "Part Time", "Contract", "Internship"];

// Job Card Skeleton Component
const JobCardSkeleton = () => (
  <Card className="border border-gray-200 dark:border-gray-800">
    <CardContent className="p-6 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-5 w-20" />
      <div className="flex justify-between pt-4">
        <Skeleton className="h-9 w-16" />
        <Skeleton className="h-9 w-16" />
      </div>
    </CardContent>
  </Card>
);

// ============================================================
export default function AdminJobsPage() {
  const { data, isLoading, refetch } = useGetJobsQuery({}) as any;
  const { data: locations, isLoading: locationLoading } = useGetLocationsQuery(
    {},
  ) as any;

  const [createJob] = useCreateJobMutation();
  const [updateJob] = useUpdateJobMutation();
  const [deleteJob] = useDeleteJobMutation();

  const [form, setForm] = useState<CreateJobDto>(defaultForm);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // ---------------- Open Form ----------------
  const handleOpenForm = (job?: any) => {
    if (job) {
      setEditingJobId(job.id);
      setForm({
        title: job.title,
        company: job.company,
        category: job.category,
        type: job.type,
        location: job.location?.id || "",
        description: job.description,
        isFeatured: job.isFeatured || false,
      });
    } else {
      setEditingJobId(null);
      setForm(defaultForm);
    }
    setOpen(true);
  };

  // ---------------- Submit ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSubmit(true);

    try {
      if (editingJobId) {
        await updateJob({ id: editingJobId, data: form }).unwrap();
        toast.success("Job Updated!");
      } else {
        await createJob(form).unwrap();
        toast.success("Job Created!");
      }

      setTimeout(() => {
        setOpen(false);
        setForm(defaultForm);
        setEditingJobId(null);
        refetch();
      }, 400);
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    } finally {
      setLoadingSubmit(false);
    }
  };

  // ---------------- Delete ----------------
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure to delete this job?")) return;
    try {
      await deleteJob(id).unwrap();
      toast.success("Job Deleted!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  // Get category badge color
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Technology:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Design:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Sales:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Marketing:
        "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      Finance:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      Engineering:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      Business:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
      "Human Resource":
        "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
    };
    return (
      colors[category] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    );
  };

  // Get type badge color
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      "Full Time":
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
      "Part Time":
        "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
      Contract: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
      Internship:
        "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
    };
    return (
      colors[type] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    );
  };

  // ============================================================
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Briefcase className="h-8 w-8 text-primary" />
              Jobs
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your job listings
            </p>
          </div>

          <Button
            onClick={() => handleOpenForm()}
            className="gap-2 shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            <Plus className="h-5 w-5" />
            Add Job
          </Button>
        </div>

        {/* Job Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        ) : data?.data?.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <Briefcase className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No jobs found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Get started by creating your first job posting
              </p>
              <Button onClick={() => handleOpenForm()} className="gap-2">
                <Plus className="h-4 w-4" />
                Create Job
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.map((job: any) => (
              <Card
                key={job.id}
                className="border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  {/* Header with Title and Featured Badge */}
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {job.title}
                    </h2>
                    {job.isFeatured && (
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 ml-2"
                      >
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Company */}
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                    <Building2 className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-medium">{job.company}</p>
                  </div>

                  {/* Category and Type Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={getCategoryColor(job.category)}>
                      <Tag className="h-3 w-3 mr-1" />
                      {job.category}
                    </Badge>
                    <Badge className={getTypeColor(job.type)}>
                      <Clock className="h-3 w-3 mr-1" />
                      {job.type}
                    </Badge>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>
                      {job.location?.city}, {job.location?.country}
                    </span>
                  </div>

                  {/* Description Preview */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                    {job.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex justify-between gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenForm(job)}
                      className="gap-2 flex-1 hover:bg-primary hover:text-white transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(job.id)}
                      className="gap-2 flex-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Form Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                {editingJobId ? (
                  <>
                    <Edit className="h-6 w-6 text-primary" />
                    Edit Job
                  </>
                ) : (
                  <>
                    <Plus className="h-6 w-6 text-primary" />
                    Create New Job
                  </>
                )}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5 py-4">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Senior Frontend Developer"
                  required
                  className="w-full"
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium">
                  Company <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="company"
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                  placeholder="e.g., Tech Corp"
                  required
                  className="w-full"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Category <span className="text-red-500">*</span>
                </Label>
                <select
                  id="category"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full px-3 py-2.5 border rounded-lg bg-white dark:bg-gray-950 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium">
                  Type <span className="text-red-500">*</span>
                </Label>
                <select
                  id="type"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-3 py-2.5 border rounded-lg bg-white dark:bg-gray-950 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                >
                  <option value="">Select Type</option>
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">
                  Location <span className="text-red-500">*</span>
                </Label>
                <select
                  id="location"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="w-full px-3 py-2.5 border rounded-lg bg-white dark:bg-gray-950 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                >
                  <option value="">Select Location</option>
                  {locationLoading ? (
                    <option disabled>Loading locations...</option>
                  ) : (
                    locations?.data?.map((loc: any) => (
                      <option key={loc._id} value={loc._id}>
                        {loc.city}, {loc.country}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.isFeatured}
                  onChange={(e) =>
                    setForm({ ...form, isFeatured: e.target.checked })
                  }
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <Label
                  htmlFor="featured"
                  className="text-sm font-medium cursor-pointer"
                >
                  Mark as featured job
                </Label>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Provide a detailed description of the job position..."
                  required
                  className="min-h-30 resize-y"
                />
              </div>

              {/* Footer Buttons */}
              <DialogFooter className="gap-2 sm:gap-0 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loadingSubmit}
                  className="gap-2"
                >
                  {loadingSubmit ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {editingJobId ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      {editingJobId ? (
                        <Edit className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                      {editingJobId ? "Update Job" : "Create Job"}
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
