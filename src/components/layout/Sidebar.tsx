import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Home,
  Settings,
  CreditCard,
  BarChart2,
  Key,
  Users,
  FileText,
  Book,
  ScrollText,
  Shield,
  LayoutDashboard,
  UserCog,
  LineChart,
  FileCode,
  Cog,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function AppSidebar() {
  const { data: userRole } = useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;
      
      const { data: roleData } = await supabase
        .rpc('get_user_role', { user_id: session.user.id });
      return roleData;
    }
  });

  const publicItems = [
    { title: "হোম", url: "/", icon: Home },
    { title: "ব্লগ", url: "/blog", icon: FileText },
    { title: "ডকুমেন্টেশন", url: "/docs", icon: Book },
    { title: "শর্তাবলী", url: "/legal/terms", icon: ScrollText },
    { title: "গোপনীয়তা", url: "/legal/privacy", icon: Shield },
  ];

  const userItems = [
    { title: "ড্যাশবোর্ড", url: "/user/dashboard", icon: LayoutDashboard },
    { title: "সেটিংস", url: "/user/settings", icon: Settings },
    { title: "বিলিং", url: "/user/billing", icon: CreditCard },
    { title: "পরিসংখ্যান", url: "/user/stats", icon: BarChart2 },
    { title: "এপিআই কী", url: "/user/api-keys", icon: Key },
    { title: "টিম", url: "/user/team", icon: Users },
  ];

  const adminItems = [
    { title: "অ্যাডমিন ড্যাশবোর্ড", url: "/admin/dashboard", icon: LayoutDashboard },
    { title: "ব্যবহারকারী", url: "/admin/users", icon: UserCog },
    { title: "সাবস্ক্রিপশন", url: "/admin/subscriptions", icon: CreditCard },
    { title: "অ্যানালিটিক্স", url: "/admin/analytics", icon: LineChart },
    { title: "কন্টেন্ট", url: "/admin/content", icon: FileCode },
    { title: "সেটিংস", url: "/admin/settings", icon: Cog },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>মেনু</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {publicItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {userRole && (
          <SidebarGroup>
            <SidebarGroupLabel>ব্যবহারকারী মেনু</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {userItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {userRole === 'admin' && (
          <SidebarGroup>
            <SidebarGroupLabel>অ্যাডমিন মেনু</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}