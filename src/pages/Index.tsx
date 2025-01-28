import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Home, Book, FileText } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loadFont = async () => {
      const font = new FontFace(
        'Hind Siliguri',
        'url(https://fonts.gstatic.com/s/hindsiliguri/v12/ijwTs5juQtsyLLR5jN4cxBEoTI7R0gvC.woff2)'
      );

      try {
        await font.load();
        document.fonts.add(font);
        console.log('Hind Siliguri font loaded successfully');
      } catch (error) {
        console.error('Error loading Hind Siliguri font:', error);
      }
    };

    loadFont();
  }, []);

  const navItems = [
    { title: "হোম", icon: Home, path: "/" },
    { title: "ব্লগ", icon: Book, path: "/blog" },
    { title: "ডকুমেন্টেশন", icon: Book, path: "/docs" },
    { title: "শর্তাবলী", icon: FileText, path: "/legal/terms" },
    { title: "গোপনীয়তা", icon: FileText, path: "/legal/privacy" },
  ];

  const pricingPlans = [
    {
      name: "ফ্রি প্ল্যান",
      price: "৳০",
      features: [
        "বেসিক ফিচার",
        "কমিউনিটি সাপোর্ট",
        "১ জিবি স্টোরেজ",
      ],
    },
    {
      name: "প্রো প্ল্যান",
      price: "৳৯৯৯",
      features: [
        "সব ফ্রি ফিচার",
        "প্রিমিয়াম সাপোর্ট",
        "১০ জিবি স্টোরেজ",
        "কাস্টম ডোমেইন",
      ],
    },
    {
      name: "এন্টারপ্রাইজ",
      price: "কাস্টম",
      features: [
        "সব প্রো ফিচার",
        "২৪/৭ সাপোর্ট",
        "আনলিমিটেড স্টোরেজ",
        "কাস্টম ইন্টিগ্রেশন",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background font-bengali">
      {/* Navbar */}
      <nav className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-2 text-sm hover:text-primary transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => navigate("/auth/login")}
                variant="ghost"
                className="text-sm"
              >
                লগইন
              </Button>
              <Button 
                onClick={() => navigate("/auth/register")}
                className="text-sm"
              >
                রেজিস্টার
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="py-20 px-4">
        <div className="max-w-[1280px] mx-auto text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            আপনার প্রজেক্টে স্বাগতম
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            আপনার যাত্রা শুরু করতে নীচের বাটনে ক্লিক করুন
          </p>
          <div className="space-x-4">
            <Button 
              onClick={() => navigate("/auth/login")}
              className="text-lg px-8 py-6 rounded-full touch-manipulation"
            >
              লগইন করুন
            </Button>
            <Button 
              onClick={() => navigate("/auth/register")}
              variant="outline"
              className="text-lg px-8 py-6 rounded-full touch-manipulation"
            >
              রেজিস্টার করুন
            </Button>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 px-4 bg-muted/50">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">মূল্য তালিকা</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                <p className="text-3xl font-bold mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <span className="mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant="outline">
                  শুরু করুন
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;