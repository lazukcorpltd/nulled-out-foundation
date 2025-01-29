import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BarChart3, Settings, Wallet2, FileText, PieChart, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell
} from 'recharts';

const UserDashboard = () => {
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

    if (roleData !== 'user') {
      navigate("/auth/login");
    }
  };

  // Demo data for statistics
  const monthlyData = [
    { name: 'জানুয়ারি', value: 4 },
    { name: 'ফেব্রুয়ারি', value: 7 },
    { name: 'মার্চ', value: 5 },
    { name: 'এপ্রিল', value: 4 },
    { name: 'মে', value: 6 },
    { name: 'জুন', value: 5 },
  ];

  const pieData = [
    { name: 'প্রোজেক্ট A', value: 35 },
    { name: 'প্রোজেক্ট B', value: 30 },
    { name: 'প্রোজেক্ট C', value: 35 },
  ];

  const COLORS = ['#64748b', '#eab308', '#0ea5e9'];

  const menuItems = [
    { icon: BarChart3, label: 'ড্যাশবোর্ড', color: 'text-yellow-500' },
    { icon: Wallet2, label: 'ওয়ালেট', color: 'text-blue-500' },
    { icon: FileText, label: 'রিপোর্ট', color: 'text-green-500' },
    { icon: PieChart, label: 'পরিসংখ্যান', color: 'text-purple-500' },
    { icon: Settings, label: 'সেটিংস', color: 'text-gray-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1280px] mx-auto p-4">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <h3 className="text-lg font-bengali mb-2">মোট প্রোজেক্ট</h3>
            <p className="text-3xl font-bold">৮৫০</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <h3 className="text-lg font-bengali mb-2">সক্রিয় প্রোজেক্ট</h3>
            <p className="text-3xl font-bold">৫৪৮</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <h3 className="text-lg font-bengali mb-2">সম্পন্ন প্রোজেক্ট</h3>
            <p className="text-3xl font-bold">৬২০</p>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - User Info & Menu */}
          <Card className="p-6 bg-slate-700 text-white">
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-full bg-slate-600 mb-4 ring-4 ring-yellow-500 overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="প্রোফাইল"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bengali mb-1">রহিম আহমেদ</h2>
              <p className="text-slate-300 text-sm">rahim@example.com</p>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="font-bengali">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-8">
              <h3 className="text-sm font-bengali text-slate-300 mb-4">সক্রিয় ব্যবহারকারী</h3>
              <div className="flex -space-x-2">
                {[1,2,3,4].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-500 ring-2 ring-slate-700" />
                ))}
                <div className="w-8 h-8 rounded-full bg-yellow-500 ring-2 ring-slate-700 flex items-center justify-center text-xs">
                  +৭
                </div>
              </div>
            </div>
          </Card>

          {/* Middle Column - Activity */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bengali">সাম্প্রতিক কার্যক্রম</h2>
              <select className="bg-slate-100 rounded-lg px-3 py-2 text-sm font-bengali">
                <option>গত মাস</option>
                <option>গত সপ্তাহ</option>
              </select>
            </div>

            <div className="h-[300px] mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#eab308"
                    fill="#fef3c7" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-slate-50">
                <h3 className="text-lg font-bengali mb-4">প্রোজেক্ট বিভাজন</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={pieData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6 bg-slate-50">
                <h3 className="text-lg font-bengali mb-4">সদস্য তালিকা</h3>
                <div className="space-y-4">
                  {[
                    { name: 'করিম হাসান', email: 'karim@example.com', members: '৫' },
                    { name: 'ফাতেমা বেগম', email: 'fatema@example.com', members: '২' }
                  ].map((member, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200" />
                        <div>
                          <p className="font-bengali">{member.name}</p>
                          <p className="text-sm text-slate-500">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-bengali">{member.members}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;