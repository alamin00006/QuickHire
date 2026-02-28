type SubMenuItem = {
  label: string;
  href: string;
  permissionKey?: string;
};

export type MenuItem = {
  label: string;
  icon: string;
  href: string;
  permissionKey?: string;
  hasSubmenu?: boolean;
  submenuItems?: SubMenuItem[];
};

export const menuSections: { section: string; items: MenuItem[] }[] = [
  {
    section: "Job & Application",
    items: [
      {
        label: "Jobs",
        icon: "briefcase",
        href: "/jobs",
      },
      {
        label: "Applications",
        icon: "fileText",
        href: "/applications",
      },
    ],
  },
];
