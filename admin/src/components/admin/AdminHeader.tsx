"use client";

import {
  Search,
  Bell,
  Globe,
  ChevronDown,
  Menu,
  LogOut,
  User,
} from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useLogoutMutation } from "@/redux/api/authApi";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { logout as logoutAction } from "@/redux/authSlice";
import { baseApi } from "@/redux/api/baseApi";

import { persistor } from "@/redux/store";
import { removeFromLocalStorage } from "@/lib/utils/local-storage";
import { authKey } from "@/lib/constants/app.constants";

interface AdminHeaderProps {
  onToggleSidebar: () => void;
}

export function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);

  const [logoutApi, { isLoading: loggingOut }] = useLogoutMutation();

  const clearClientAuth = async () => {
    // redux
    dispatch(logoutAction());

    // rtk query cache
    dispatch(baseApi.util.resetApiState());

    // redux-persist
    try {
      await persistor.purge();
    } catch {}

    // local token (if you still keep it)
    try {
      removeFromLocalStorage(authKey);
    } catch {}
  };

  const handleLogout = async () => {
    const t = toast.loading("Logging out...");

    try {
      // server logout (revoke session + clear cookies server-side)
      await logoutApi().unwrap();
    } catch (err: any) {
      // even if server fails, still cleanup client to prevent stuck state
      // console.error(err);
    } finally {
      await clearClientAuth();

      toast.dismiss(t);
      toast.success("Logged out");
      router.replace("/login");
    }
  };

  const initials =
    user?.name?.trim?.().slice(0, 2).toUpperCase() ||
    user?.email?.slice(0, 2).toUpperCase() ||
    "U";

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 sticky top-0 z-40">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="hidden lg:flex"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden md:flex relative">
          <Input
            placeholder="Search or Ctrl+K"
            className="w-40 lg:w-94 h-9 pr-8 bg-muted/50"
          />
          <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs">
            1
          </Badge>
        </Button>

        {/* Language */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">En</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Bangla</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile + Logout */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden lg:inline max-w-[120px] truncate">
                {user?.name || "User"}
              </span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-2">
              <p className="text-sm font-medium truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email || ""}
              </p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => router.push("/profile")}
              className="gap-2"
            >
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              disabled={loggingOut}
              className="gap-2 text-red-600 focus:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              {loggingOut ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
