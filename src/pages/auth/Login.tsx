import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (user) {
        const { data: roleData, error: roleError } = await supabase
          .rpc('get_user_role', { user_id: user.id });

        if (roleError) throw roleError;

        // Redirect based on role
        if (roleData === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">লগইন করুন</h2>
          <p className="mt-2 text-muted-foreground">
            আপনার অ্যাকাউন্টে প্রবেশ করুন
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="ইমেইল"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="পাসওয়ার্ড"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-6 text-lg"
            disabled={loading}
          >
            {loading ? "লোড হচ্ছে..." : "লগইন"}
          </Button>

          <p className="text-center text-muted-foreground">
            অ্যাকাউন্ট নেই?{" "}
            <Button
              variant="link"
              onClick={() => navigate("/auth/register")}
              className="p-0 h-auto font-normal"
            >
              রেজিস্টার করুন
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;