import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      toast.error("অনুগ্রহ করে শর্তাবলী মেনে নিন");
      return;
    }
    setLoading(true);

    try {
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
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
    <div className="min-h-screen flex flex-col md:flex-row font-bengali">
      {/* Left Section */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between">
        <div>
          <div className="mb-12">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#4F46E5"/>
              <path d="M22 10L15 17L10 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="max-w-md mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">শুরু করুন</h1>
            <p className="text-muted-foreground mb-8">আপনার অ্যাকাউন্টে প্রবেশ করতে আপনার তথ্য দিন</p>

            <div className="flex gap-4 mb-8">
              <Button variant="outline" className="flex-1 h-12">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" className="w-5 h-5 mr-2" />
                গুগল দিয়ে লগইন
              </Button>
              <Button variant="outline" className="flex-1 h-12">
                <img src="https://www.svgrepo.com/show/473664/apple.svg" alt="Apple logo" className="w-5 h-5 mr-2" />
                অ্যাপল দিয়ে লগইন
              </Button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">অথবা</span>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">নাম</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="রফিকুর রহমান"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">ইমেইল</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="rafiqur@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">পাসওয়ার্ড</label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="ন্যূনতম ৮টি অক্ষর"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  আমি <Button variant="link" className="p-0 h-auto font-normal">শর্তাবলী</Button> এবং{" "}
                  <Button variant="link" className="p-0 h-auto font-normal">গোপনীয়তা নীতি</Button> মেনে নিচ্ছি
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg font-medium"
                disabled={loading}
              >
                {loading ? "প্রক্রিয়াকরণ হচ্ছে..." : "রেজিস্টার"}
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

        <div className="text-center text-sm text-muted-foreground mt-8">
          &copy; {new Date().getFullYear()} SAAS, সর্বস্বত্ব সংরক্ষিত
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:block w-1/2 bg-primary p-12 text-white">
        <div className="h-full flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              আপনার কর্মীদের পরিচালনা করার সহজতম উপায়
            </h2>
            <p className="text-primary-foreground/80">
              আপনার অ্যাকাউন্টে প্রবেশ করতে আপনার তথ্য দিন
            </p>
          </div>

          <img
            src="/lovable-uploads/0dd25cb3-4142-4154-b408-ae71b586e0af.png"
            alt="Dashboard Preview"
            className="rounded-lg shadow-2xl"
          />

          <div className="flex items-center gap-8">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-8 w-auto" />
            <img src="https://www.svgrepo.com/show/473664/apple.svg" alt="Apple" className="h-8 w-auto" />
            <img src="https://www.svgrepo.com/show/475692/spotify-color.svg" alt="Spotify" className="h-8 w-auto" />
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="h-8 w-auto" />
            <img src="https://www.svgrepo.com/show/475689/slack-color.svg" alt="Slack" className="h-8 w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;