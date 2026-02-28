"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  ShoppingBag,
  RotateCcw,
  Zap,
  Megaphone,
  Image,
  Images,
  Ticket,
  Bell,
  Tv,
  FolderTree,
  SlidersHorizontal,
  Settings,
  Store,
  PlusCircle,
  List,
  Star,
  Upload,
  Download,
  ChevronDown,
  ChevronRight,
  Search,
  X,
  Shield,
  Users,
  Briefcase,
  FileText,
} from "lucide-react";

import { cn } from "@/lib/utils/cnMerge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

import { usePermission } from "@/hooks/usePermission";
import { MenuItem, menuSections } from "@/lib/utils/Menu";

const iconMap: Record<string, React.ElementType> = {
  "shopping-cart": ShoppingCart,
  "shopping-bag": ShoppingBag,
  "rotate-ccw": RotateCcw,
  zap: Zap,
  megaphone: Megaphone,
  image: Image,
  images: Images,
  ticket: Ticket,
  bell: Bell,
  tv: Tv,
  folder: FolderTree,
  sliders: SlidersHorizontal,
  settings: Settings,
  store: Store,
  "plus-circle": PlusCircle,
  list: List,
  star: Star,
  upload: Upload,
  shield: Shield,
  users: Users,
  briefcase: Briefcase,
  fileText: FileText,
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

function SidebarLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (href === "#") {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function AdminSidebar({ collapsed, onToggle }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const isMobile = useIsMobile();

  // permission hook
  const { hasPermission } = usePermission();

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  // ONLY permission filter logic
  const filteredMenuSections = useMemo(() => {
    return menuSections
      .map((section) => {
        const items = section.items
          .map((item) => {
            const hasChildren = !!item.submenuItems?.length;

            // Single item
            if (!hasChildren) {
              return item.permissionKey
                ? hasPermission(item.permissionKey)
                  ? item
                  : null
                : item;
            }

            // Parent + children
            const children = (item.submenuItems || []).filter((c) =>
              c.permissionKey ? hasPermission(c.permissionKey) : true,
            );

            const parentOk = item.permissionKey
              ? hasPermission(item.permissionKey)
              : true;

            if (!parentOk && children.length === 0) return null;

            return { ...item, submenuItems: children };
          })
          .filter(Boolean) as MenuItem[];

        if (items.length === 0) return null;
        return { ...section, items };
      })
      .filter(Boolean) as { section: string; items: MenuItem[] }[];
  }, [hasPermission]);

  // On mobile: sidebar is an overlay drawer
  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        {!collapsed && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={onToggle} />
        )}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar text-sidebar-foreground w-64 transition-transform duration-300",
            collapsed ? "-translate-x-full" : "translate-x-0",
          )}
        >
          {/* Close button */}
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm">
                <span className="text-primary">Quick</span>Hire
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8 text-sidebar-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="px-3 pb-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sidebar-foreground/60" />
              <Input
                placeholder="Search Menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-sidebar-primary text-sidebar-foreground border-none placeholder:text-sidebar-foreground/60 h-9"
              />
            </div>
          </div>

          {/* Dashboard Link */}
          <div className="px-3 mb-2">
            <SidebarLink
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-sidebar-primary text-sidebar-primary-foreground font-medium"
            >
              <LayoutDashboard className="h-5 w-5 shrink-0" />
              <span>Dashboard</span>
            </SidebarLink>
          </div>

          <ScrollArea className="flex-1 px-3">
            <div className="space-y-4 pb-4">
              {filteredMenuSections.map((section) => (
                <div key={section.section}>
                  <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2 px-3">
                    {section.section}
                  </div>
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const Icon = iconMap[item.icon] || ShoppingBag;
                      const isExpanded = expandedItems.includes(item.label);
                      return (
                        <div key={item.label}>
                          {item.hasSubmenu ? (
                            <button
                              onClick={() => toggleExpanded(item.label)}
                              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
                            >
                              <Icon className="h-4 w-4 shrink-0" />
                              <span className="flex-1 text-left text-sm">
                                {item.label}
                              </span>
                              <span className="text-sidebar-foreground/50">
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </span>
                            </button>
                          ) : (
                            <SidebarLink
                              href={item.href}
                              className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
                                pathname === item.href &&
                                  "bg-sidebar-accent text-sidebar-foreground",
                              )}
                            >
                              <Icon className="h-4 w-4 shrink-0" />
                              <span className="flex-1 text-left text-sm">
                                {item.label}
                              </span>
                            </SidebarLink>
                          )}

                          {isExpanded && item.submenuItems && (
                            <div className="ml-7 mt-1 space-y-0.5">
                              {item.submenuItems.map((subItem) => (
                                <SidebarLink
                                  key={subItem.label}
                                  href={subItem.href}
                                  className={cn(
                                    "block px-3 py-1.5 rounded-md text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
                                    pathname === subItem.href &&
                                      "bg-sidebar-accent text-sidebar-foreground",
                                  )}
                                >
                                  {subItem.label}
                                </SidebarLink>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* User Profile */}
          <div className="p-3 border-t border-sidebar-border">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-primary">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  Jhon Doe
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  g*******@admin.com
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-sidebar-foreground/60 shrink-0" />
            </div>
          </div>
        </aside>
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col bg-sidebar text-sidebar-foreground h-screen transition-all duration-300 pt-3",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {!collapsed && (
        <div className="flex items-center justify-center gap-2">
          <span className="font-bold text-xl">
            <span className="text-primary">QuickHire</span>
          </span>
        </div>
      )}

      {/* Search */}
      {!collapsed && (
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sidebar-foreground/60" />
            <Input
              placeholder="Search Menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-sidebar-primary text-sidebar-foreground border-none placeholder:text-sidebar-foreground/60 h-9"
            />
          </div>
        </div>
      )}

      {/* Dashboard Link */}
      <div className="px-3 mb-2">
        <SidebarLink
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-md bg-sidebar-primary text-sidebar-primary-foreground font-medium",
            collapsed && "justify-center",
          )}
        >
          <LayoutDashboard className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Dashboard</span>}
        </SidebarLink>
      </div>

      {/* Menu Sections */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-4 pb-4">
          {filteredMenuSections.map((section) => (
            <div key={section.section}>
              {!collapsed && (
                <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2 px-3">
                  {section.section}
                </div>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = iconMap[item.icon] || ShoppingBag;
                  const isExpanded = expandedItems.includes(item.label);

                  return (
                    <div key={item.label}>
                      {item.hasSubmenu ? (
                        <button
                          onClick={() => toggleExpanded(item.label)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
                            collapsed && "justify-center",
                          )}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          {!collapsed && (
                            <>
                              <span className="flex-1 text-left text-sm">
                                {item.label}
                              </span>
                              <span className="text-sidebar-foreground/50">
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </span>
                            </>
                          )}
                        </button>
                      ) : (
                        <SidebarLink
                          href={item.href}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
                            collapsed && "justify-center",
                            pathname === item.href &&
                              "bg-sidebar-accent text-sidebar-foreground",
                          )}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          {!collapsed && (
                            <span className="flex-1 text-left text-sm">
                              {item.label}
                            </span>
                          )}
                        </SidebarLink>
                      )}

                      {/* Submenu items */}
                      {!collapsed && isExpanded && item.submenuItems && (
                        <div className="ml-7 mt-1 space-y-0.5">
                          {item.submenuItems.map((subItem) => (
                            <SidebarLink
                              key={subItem.label}
                              href={subItem.href}
                              className={cn(
                                "block px-3 py-1.5 rounded-md text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
                                pathname === subItem.href &&
                                  "bg-sidebar-accent text-sidebar-foreground",
                              )}
                            >
                              {subItem.label}
                            </SidebarLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* User Profile */}
      <div
        className={cn(
          "p-3 border-t border-sidebar-border",
          collapsed && "px-2",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3 p-2 rounded-lg bg-sidebar-primary",
            collapsed && "justify-center",
          )}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              JD
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                Jhon Doe
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                g*******@admin.com
              </p>
            </div>
          )}
          {!collapsed && (
            <ChevronDown className="h-4 w-4 text-sidebar-foreground/60 shrink-0" />
          )}
        </div>
      </div>
    </aside>
  );
}
