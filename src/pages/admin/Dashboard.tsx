import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Grid } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    { title: "অ্যাডমিন ড্যাশবোর্ড", url: "/admin/dashboard" },
    { title: "ব্যবহারকারী", url: "/admin/users" },
    { title: "সাবস্ক্রিপশন", url: "/admin/subscriptions" },
    { title: "অ্যানালিটিক্স", url: "/admin/analytics" },
    { title: "কন্টেন্ট", url: "/admin/content" },
    { title: "সেটিংস", url: "/admin/settings" },
  ];

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth/login");
      return;
    }

    const { data: roleData } = await supabase
      .rpc('get_user_role', { user_id: session.user.id });

    if (roleData !== 'admin') {
      navigate("/auth/login");
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/auth/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">অ্যাডমিন ড্যাশবোর্ড</h1>
          <Button onClick={handleLogout}>লগআউট</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <Link to={item.url} key={item.title}>
              <Card className="hover:bg-accent transition-colors cursor-pointer">
                <CardContent className="flex items-center gap-3 p-6">
                  <Grid className="h-5 w-5" />
                  <span className="text-lg">{item.title}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;