import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-bengali p-4">
      <div className="w-full max-w-[1280px] text-center space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          আপনার প্রজেক্টে স্বাগতম
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          আপনার যাত্রা শুরু করতে নীচের বাটনে ক্লিক করুন
        </p>
        <Button 
          onClick={() => navigate("/get-started")}
          className="text-lg px-8 py-6 rounded-full touch-manipulation"
        >
          শুরু করুন
        </Button>
      </div>
    </div>
  );
};

export default Index;