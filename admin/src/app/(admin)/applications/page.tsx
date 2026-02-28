"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  Mail,
  User,
  Calendar,
  Download,
  Eye,
  MoreVertical,
  Search,
  X,
  FileCheck,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useGetAllApplicationsQuery } from "@/redux/api/applicationApi";

// Application status types
type ApplicationStatus = "pending" | "reviewed" | "shortlisted" | "rejected";

interface Application {
  _id: string;
  name: string;
  email: string;
  resume_link: string;
  cover_note: string;
  status?: ApplicationStatus;
  appliedDate?: string;
  jobTitle?: string;
}

// Status badge component
const StatusBadge = ({ status }: { status: ApplicationStatus }) => {
  const statusConfig = {
    pending: {
      label: "Pending",
      icon: Clock,
      className:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    },
    reviewed: {
      label: "Reviewed",
      icon: Eye,
      className:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    },
    shortlisted: {
      label: "Shortlisted",
      icon: CheckCircle2,
      className:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    },
    rejected: {
      label: "Rejected",
      icon: XCircle,
      className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <Badge className={`${config.className} flex items-center gap-1 px-3 py-1`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};

// Skeleton loader for application cards
const ApplicationCardSkeleton = () => (
  <Card className="border border-gray-200 dark:border-gray-800">
    <CardHeader className="pb-2">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div>
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <Skeleton className="h-6 w-20" />
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
    </CardContent>
    <CardFooter>
      <Skeleton className="h-9 w-full" />
    </CardFooter>
  </Card>
);

// Stats Card Component
const StatsCard = ({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  icon: any;
  color: string;
}) => (
  <Card className={`bg-gradient-to-br ${color} text-white`}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <Icon className="h-8 w-8 opacity-80" />
      </div>
    </CardContent>
  </Card>
);

export default function AllApplicationsPage() {
  const { data, isLoading, error } = useGetAllApplicationsQuery() as any;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Calculate statistics
  const statistics = useMemo(() => {
    const apps = data?.data || [];
    return {
      total: apps.length,
      pending: apps.filter((a: Application) => a.status === "pending").length,
      shortlisted: apps.filter((a: Application) => a.status === "shortlisted")
        .length,
      rejected: apps.filter((a: Application) => a.status === "rejected").length,
    };
  }, [data?.data]);

  // Filter applications
  const filteredApplications = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((app: Application) => {
      const matchesSearch =
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.email.toLowerCase().includes(search.toLowerCase()) ||
        (app.jobTitle &&
          app.jobTitle.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus =
        statusFilter === "all" || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data?.data, search, statusFilter]);

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Format date
  const formatDate = (date?: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="max-w-md w-full text-center p-8">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Failed to Load Applications
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            There was an error loading the applications. Please try again.
          </p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 ">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              Applications
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Review and manage job applications
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              List
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Applications"
            value={statistics.total}
            icon={FileText}
            color="from-blue-500 to-blue-600"
          />
          <StatsCard
            title="Pending Review"
            value={statistics.pending}
            icon={Clock}
            color="from-yellow-500 to-yellow-600"
          />
          <StatsCard
            title="Shortlisted"
            value={statistics.shortlisted}
            icon={CheckCircle2}
            color="from-green-500 to-green-600"
          />
          <StatsCard
            title="Rejected"
            value={statistics.rejected}
            icon={XCircle}
            color="from-red-500 to-red-600"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by name, email, or job title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-10"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-gray-500 hover:text-gray-700" />
              </button>
            )}
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Applications Grid/List */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <ApplicationCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredApplications.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No applications found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {search || statusFilter !== "all"
                  ? "Try adjusting your filters"
                  : "No applications have been submitted yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredApplications.map((app: Application) =>
              viewMode === "grid" ? (
                // Grid View Card
                <Card
                  key={app._id}
                  className="border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 group"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-primary/20">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(app.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                            {app.name}
                          </CardTitle>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <Mail className="h-3 w-3" />
                            {app.email}
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              window.open(app.resume_link, "_blank")
                            }
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Resume
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setSelectedApplication(app)}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            View Cover Note
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download Resume
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {app.jobTitle && (
                      <Badge variant="outline" className="text-xs">
                        {app.jobTitle}
                      </Badge>
                    )}

                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      Applied {formatDate(app.appliedDate)}
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {app.cover_note}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <StatusBadge status={app.status || "pending"} />
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => setSelectedApplication(app)}
                    >
                      <FileText className="h-4 w-4" />
                      View Full Application
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                // List View Item
                <Card
                  key={app._id}
                  className="border border-gray-200 dark:border-gray-800"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(app.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{app.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {app.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <StatusBadge status={app.status || "pending"} />

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(app.resume_link, "_blank")}
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          Resume
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedApplication(app)}
                          className="gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          Cover Note
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        )}

        {/* Cover Note Dialog */}
        <Dialog
          open={!!selectedApplication}
          onOpenChange={() => setSelectedApplication(null)}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Cover Note from {selectedApplication?.name}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Applicant Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {selectedApplication &&
                      getInitials(selectedApplication.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">
                    {selectedApplication?.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="h-4 w-4" />
                    {selectedApplication?.email}
                  </div>
                  {selectedApplication?.jobTitle && (
                    <Badge variant="outline" className="mt-2">
                      Applied for: {selectedApplication.jobTitle}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Cover Note Content */}
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Cover Note
                </h4>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg max-h-[300px] overflow-y-auto">
                  <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                    {selectedApplication?.cover_note}
                  </p>
                </div>
              </div>

              {/* Resume Link */}
              <div className="flex items-center gap-4">
                <Button
                  onClick={() =>
                    window.open(selectedApplication?.resume_link, "_blank")
                  }
                  className="gap-2 flex-1"
                >
                  <Eye className="h-4 w-4" />
                  View Resume
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(selectedApplication?.resume_link, "_blank")
                  }
                  className="gap-2 flex-1"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </Button>
              </div>

              {/* Status Update */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="font-semibold">Application Status</span>
                <Select defaultValue={selectedApplication?.status || "pending"}>
                  <SelectTrigger className="w-45">
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedApplication(null)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
