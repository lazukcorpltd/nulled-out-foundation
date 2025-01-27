import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (user) {
        toast.success("রেজিস্ট্রেশন সফল হয়েছে!");
        navigate("/auth/login");
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
          <h2 className="text-2xl font-bold">রেজিস্টার করুন</h2>
          <p className="mt-2 text-muted-foreground">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        <form onSubmit={handleRegister} className="mt-8 space-y-6">
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
            {loading ? "লোড হচ্ছে..." : "রেজিস্টার"}
          </Button>

          <p className="text-center text-muted-foreground">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Button
              variant="link"
              onClick={() => navigate("/auth/login")}
              className="p-0 h-auto font-normal"
            >
              লগইন করুন
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;