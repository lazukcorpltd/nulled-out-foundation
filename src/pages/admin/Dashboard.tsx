import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();

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
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <p className="text-lg">স্বাগতম! অ্যাডমিন ড্যাশবোর্ডে</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;