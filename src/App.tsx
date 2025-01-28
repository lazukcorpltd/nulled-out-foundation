import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";

// Public Pages
import Index from "./pages/Index";
import Blog from "./pages/public/Blog";
import Documentation from "./pages/public/Documentation";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// User Pages
import UserDashboard from "./pages/user/Dashboard";
import Settings from "./pages/user/Settings";
import Billing from "./pages/user/Billing";
import Stats from "./pages/user/Stats";
import ApiKeys from "./pages/user/ApiKeys";
import Team from "./pages/user/Team";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Subscriptions from "./pages/admin/Subscriptions";
import Analytics from "./pages/admin/Analytics";
import Content from "./pages/admin/Content";
import AdminSettings from "./pages/admin/Settings";

// Error Pages
import NotFound from "./pages/error/NotFound";

const queryClient = new QueryClient();

// Wrapper component to conditionally render sidebar
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const path = location.pathname;
  
  // Don't show sidebar on index, auth pages, and dashboards
  const noSidebarPaths = [
    '/', 
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/user/dashboard',
    '/admin/dashboard'
  ];
  
  const showSidebar = !noSidebarPaths.includes(path);

  if (!showSidebar) {
    return <main className="max-w-[1280px] mx-auto p-4">{children}</main>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 max-w-[1280px] mx-auto p-4">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/legal/terms" element={<Terms />} />
            <Route path="/legal/privacy" element={<Privacy />} />

                {/* Auth Routes */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />

                {/* User Routes */}
                <Route path="/user/dashboard" element={<UserDashboard />} />
                <Route path="/user/settings" element={<Settings />} />
                <Route path="/user/billing" element={<Billing />} />
                <Route path="/user/stats" element={<Stats />} />
                <Route path="/user/api-keys" element={<ApiKeys />} />
                <Route path="/user/team" element={<Team />} />

                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/subscriptions" element={<Subscriptions />} />
                <Route path="/admin/analytics" element={<Analytics />} />
                <Route path="/admin/content" element={<Content />} />
                <Route path="/admin/settings" element={<AdminSettings />} />

                {/* Error Routes */}
                <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
