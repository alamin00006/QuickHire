"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { useLoginMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/hooks/reduxHook";
import { setCredentials } from "@/redux/authSlice";
import { useNavigate } from "@/lib/utils/router";

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await login({
        email,
        password,
        rememberMe,
      }).unwrap();

      dispatch(
        setCredentials({
          accessToken: res.data.accessToken,
          user: res.data.user,
        })
      );
      console.log(res.data.user);

      toast.success("Login successful");
      navigate("/jobs");
    } catch (err: any) {
      const msg = err?.data?.message || "Invalid email or password";

      toast.error(msg);
    }
  };

  return (
    <div className="login-card animate-fade-in">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2">
          <div className="text-left">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Quick<span className="text-primary">Hire</span>
            </h1>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              More than a software company
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-6">Sign in</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="admin@QuickHire.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* <div className="flex items-center gap-2">
          <Checkbox
            checked={rememberMe}
            onCheckedChange={(v) => setRememberMe(v as boolean)}
          />
          <Label className="text-sm">Remember me</Label>
        </div> */}

        <Button type="submit" disabled={isLoading} className="w-full h-12">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Logging in...
            </>
          ) : (
            "LOGIN"
          )}
        </Button>
      </form>
    </div>
  );
};

export default LoginCard;
