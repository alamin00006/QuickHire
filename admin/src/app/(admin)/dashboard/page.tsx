import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "@/components/dashboard/Index";

export default function Page() {
  return (
    // <ProtectedRoute>
    <Index />
    // </ProtectedRoute>
  );
}
