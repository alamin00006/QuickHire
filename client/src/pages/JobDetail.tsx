"use client"; // if using Next.js App Router

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Briefcase, Clock, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useGetSingleJobQuery } from "@/redux/api/jobApi";
import { useApplyJobMutation } from "@/redux/api/applicationApi";
import toast, { Toaster } from "react-hot-toast";

const tagColors: Record<string, string> = {
  Marketing: "text-tag-orange border-tag-orange bg-tag-orange/5",
  Design: "text-primary border-primary bg-primary/5",
  Business: "text-foreground border-foreground/30 bg-foreground/5",
  Technology: "text-success border-success bg-success/5",
  Engineering: "text-tag-blue border-tag-blue bg-tag-blue/5",
  "Human Resource": "text-accent-foreground border-accent bg-accent/10",
};

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch single job
  const { data, isLoading, isError } = useGetSingleJobQuery(id!, {
    skip: !id,
  }) as any;
  const job = data?.data;

  // Apply form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    resume_link: "",
    cover_note: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // RTK Query mutation
  const [applyJob, { isLoading: applying }] = useApplyJobMutation() as any;

  // Form validation
  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email";
    if (!form.resume_link.trim()) errs.resume_link = "Resume link is required";
    else if (!/^https?:\/\/.+/.test(form.resume_link))
      errs.resume_link = "Must be a valid URL";
    if (!form.cover_note.trim()) errs.cover_note = "Cover note is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !job) return;

    try {
      await applyJob({
        job_id: job._id,
        name: form.name,
        email: form.email,
        resume_link: form.resume_link,
        cover_note: form.cover_note,
      }).unwrap();

      setSubmitted(true);
      toast.success(
        "Application Submitted! We'll review your application and get back to you.",
      );
    } catch (error: any) {
      // console.log(error);
      toast.error(error?.data?.message);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-[120px] text-center">
        <Navbar />
        <p className="text-lg text-muted-foreground">Loading job...</p>
        <Footer />
      </div>
    );
  }

  // Error or not found
  if (isError || !job) {
    return (
      <div className="min-h-screen bg-background pt-[120px] text-center">
        <Navbar />
        <h1 className="text-2xl font-serif text-foreground mb-4">
          Job not found
        </h1>
        <Link to="/jobs" className="text-primary hover:underline">
          ← Back to jobs
        </Link>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[72px]">
        <div className="container mx-auto px-6 py-10">
          {/* Back link */}
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to jobs
          </Link>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Job Details */}
            <div className="lg:col-span-2">
              <div className="flex items-start gap-5 mb-8">
                <div className="w-16 h-16 rounded-xl bg-primary/15 text-primary flex items-center justify-center text-2xl font-bold shrink-0">
                  {job.company.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-serif text-foreground mb-1">
                    {job.title}
                  </h1>
                  <p className="text-muted-foreground">{job.company}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" /> {job.location?.city},{" "}
                  {job.location?.country}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="w-4 h-4" /> {job.category}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" /> {job.type}
                </div>
              </div>

              <div className="flex gap-2 flex-wrap mb-8">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                      tagColors[tag] || "text-muted-foreground border-border"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="border-t border-border pt-8">
                <h2 className="text-xl font-sans font-bold text-foreground mb-4">
                  Description
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h2 className="text-lg font-sans font-bold text-foreground mb-5 flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" /> Apply Now
                </h2>

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto mb-4 text-2xl">
                      ✓
                    </div>
                    <h3 className="font-bold text-foreground mb-2">
                      Application Sent!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Thank you for applying. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="John Doe"
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground outline-none focus:border-primary transition-colors"
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground outline-none focus:border-primary transition-colors"
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Resume Link */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        Resume Link (URL) *
                      </label>
                      <input
                        type="url"
                        value={form.resume_link}
                        onChange={(e) =>
                          setForm({ ...form, resume_link: e.target.value })
                        }
                        placeholder="https://drive.google.com/resume.pdf"
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground outline-none focus:border-primary transition-colors"
                      />
                      {errors.resume_link && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.resume_link}
                        </p>
                      )}
                    </div>

                    {/* Cover Note */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        Cover Note *
                      </label>
                      <textarea
                        value={form.cover_note}
                        onChange={(e) =>
                          setForm({ ...form, cover_note: e.target.value })
                        }
                        rows={4}
                        placeholder="Tell us why you're a great fit..."
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground outline-none focus:border-primary transition-colors resize-none"
                      />
                      {errors.cover_note && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.cover_note}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={applying}
                      className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {applying ? "Submitting..." : "Submit Application"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default JobDetail;
