import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, ArrowLeft, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CATEGORIES, JOB_TYPES, mockJobs } from "@/lib/mockData";
import type { Job } from "@/lib/api";

const Admin = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    category: "Design",
    type: "Full Time",
    description: "",
    tags: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Required";
    if (!form.company.trim()) errs.company = "Required";
    if (!form.location.trim()) errs.location = "Required";
    if (!form.description.trim()) errs.description = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newJob: Job = {
      _id: String(Date.now()),
      title: form.title,
      company: form.company,
      location: form.location,
      category: form.category,
      type: form.type,
      description: form.description,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setJobs([newJob, ...jobs]);
    setForm({ title: "", company: "", location: "", category: "Design", type: "Full Time", description: "", tags: "" });
    setShowForm(false);
    toast({ title: "Job Created", description: `"${newJob.title}" has been added.` });
  };

  const handleDelete = (id: string) => {
    const job = jobs.find((j) => j._id === id);
    setJobs(jobs.filter((j) => j._id !== id));
    toast({ title: "Job Deleted", description: `"${job?.title}" has been removed.` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[72px]">
        <div className="container mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-3">
                <ArrowLeft className="w-4 h-4" /> Back to home
              </Link>
              <h1 className="text-3xl font-serif text-foreground">
                Admin <span className="text-primary italic">Panel</span>
              </h1>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Job
            </button>
          </div>

          {/* Create Job Form */}
          {showForm && (
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <h2 className="text-lg font-bold text-foreground mb-5">Create New Job</h2>
              <form onSubmit={handleCreate} className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Job Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground outline-none focus:border-primary"
                    placeholder="e.g. Frontend Developer"
                  />
                  {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Company *</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground outline-none focus:border-primary"
                    placeholder="e.g. Google"
                  />
                  {errors.company && <p className="text-xs text-destructive mt-1">{errors.company}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Location *</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground outline-none focus:border-primary"
                    placeholder="e.g. Berlin, Germany"
                  />
                  {errors.location && <p className="text-xs text-destructive mt-1">{errors.location}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground outline-none focus:border-primary"
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Job Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground outline-none focus:border-primary"
                  >
                    {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground outline-none focus:border-primary"
                    placeholder="e.g. Design, Marketing"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-foreground mb-1 block">Description *</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground outline-none focus:border-primary resize-none"
                    placeholder="Job description..."
                  />
                  {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
                </div>
                <div className="md:col-span-2 flex gap-3">
                  <button type="submit" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                    Create Job
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="border border-border text-muted-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Jobs Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Job</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4 hidden md:table-cell">Location</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4 hidden lg:table-cell">Category</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4 hidden sm:table-cell">Type</th>
                    <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job._id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                            {job.company.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-sm">{job.title}</p>
                            <p className="text-xs text-muted-foreground">{job.company}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground hidden md:table-cell">{job.location}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground hidden lg:table-cell">{job.category}</td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="text-xs font-medium border border-primary text-primary px-2 py-0.5 rounded">{job.type}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="text-destructive hover:text-destructive/80 transition-colors p-1"
                          title="Delete job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {jobs.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No jobs yet. Click "Add Job" to create one.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
