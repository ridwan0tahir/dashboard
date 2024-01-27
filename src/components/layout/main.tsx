import * as React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/providers/theme";

const firstNavItems = [
  { name: "Dashboard", path: "/", icon: Icons.Category },
  { name: "Trend", path: "/trend", icon: Icons.Trend },
  { name: "Sales", path: "/sales", icon: Icons.Box },
  { name: "Analytics", path: "/analytics", icon: Icons.Box },
  { name: "Discount", path: "/discount", icon: Icons.Discount },
  { name: "Information", path: "/information", icon: Icons.InfoCircle },
];

const secondNavItems = [
  { name: "Profile", path: "/profile", icon: Icons.ArrowRight },
  { name: "settings", path: "/settings", icon: Icons.Setting },
  { name: "Logout", path: "/dashbord", icon: Icons.ArrowLeft },
];

interface NavListManagerProps<P> {
  items: P[];
  keyExtractor: (item: P) => string | number;
  renderItem: (item: P, index: number) => React.ReactNode;
  className?: string;
}
const NavListManager = <P,>({
  items,
  keyExtractor,
  renderItem,
  className,
}: NavListManagerProps<P>) => {
  return (
    <div className={cn(className)}>
      {items.map((item, index) => (
        <React.Fragment key={keyExtractor(item)}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </div>
  );
};

interface NavLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {}
const NavLink = React.forwardRef<React.ElementRef<typeof Link>, NavLinkProps>(
  ({ to, className, ...props }, ref) => {
    const { pathname } = useLocation();
    const active = pathname === to;
    return (
      <Link
        {...props}
        ref={ref}
        to={to}
        className={cn(
          "p-2.5 flex items-center justify-center relative",
          className,
          {
            "after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-[3px] after:h-5 after:bg-primary after:rounded-l-md":
              active,
          }
        )}
      />
    );
  }
);

interface ThemeSwitchProps {}
const ThemeSwitch: React.FC<ThemeSwitchProps> = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-white p-2 rounded-full flex flex-col items-center gap-y-4">
      <button
        className={cn("text-gray-400", {
          "p-2 bg-primary text-white rounded-full": theme === "light",
        })}
        onClick={() => setTheme("light")}
      >
        <Icons.Sun
          className={cn("w-8 h-8 transition-all", {
            "w-4 h-4": theme === "light",
          })}
        />
      </button>
      <button
        className={cn("text-gray-400", {
          "p-2 bg-primary text-white rounded-full": theme === "dark",
        })}
        onClick={() => setTheme("dark")}
      >
        <Icons.Moon
          className={cn("w-8 h-8 transition-all", {
            "w-4 h-4": theme === "dark",
          })}
        />
      </button>
    </div>
  );
};

interface SidebarProps {}
const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="h-screen w-20 bg-gray-50 border border-gray-200 py-5 hidden md:block">
      <div className="bg-gray-50 w-full inline-flex items-center justify-center mb-6">
        <Link to="#" className="">
          <Icons.Logo className="w-10 h-10" />
        </Link>
      </div>
      <ScrollArea className="h-[calc(100vh-2.5rem)]">
        <nav className="flex flex-col items-center space-y-6">
          <NavListManager
            items={firstNavItems}
            keyExtractor={(item) => item.path}
            renderItem={({ name, path, icon }) => {
              const Icon = icon;
              return (
                <NavLink to={path} className="text-gray-400">
                  <Icon className="w-6 h-6" />
                  <span className="sr-only">{name}</span>
                </NavLink>
              );
            }}
            className="w-full flex flex-col space-y-4"
          />
          <ThemeSwitch />
          <div className="grow h-auto pointer-event-none"></div>
          <NavListManager
            items={secondNavItems}
            keyExtractor={(item) => item.path}
            renderItem={({ name, path, icon }) => {
              const Icon = icon;
              return (
                <NavLink to={path} className="text-gray-400">
                  <Icon className="w-6 h-6" />
                  <span className="sr-only">{name}</span>
                </NavLink>
              );
            }}
            className="w-full flex flex-col space-y-4"
          />
        </nav>
      </ScrollArea>
    </div>
  );
};

export function MainLayout() {
  return (
    <div className="h-screen flex flex-row lg:overflow-hidden">
      <Sidebar />
      <div className="grow overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
