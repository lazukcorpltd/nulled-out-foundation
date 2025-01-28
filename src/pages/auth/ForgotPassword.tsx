import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      toast.success("পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে পাঠানো হয়েছে");
      navigate("/auth/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">পাসওয়ার্ড ভুলে গেছেন?</CardTitle>
            <CardDescription>
              আপনার ইমেইল এড্রেস দিন, আমরা আপনাকে একটি রিসেট লিংক পাঠাবো
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="ইমেইল"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-5 text-base font-medium transition-all duration-200 hover:opacity-90"
                disabled={loading}
              >
                {loading ? "লোড হচ্ছে..." : "রিসেট লিংক পাঠান"}
              </Button>

              <div className="text-center text-sm text-muted-foreground mt-6">
                <Button
                  variant="link"
                  onClick={() => navigate("/auth/login")}
                  className="p-0 h-auto font-normal text-sm"
                >
                  লগইন পেজে ফিরে যান
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
