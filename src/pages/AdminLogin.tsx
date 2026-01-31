import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader2, Lock } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Access Denied",
        description: "Invalid email or password.",
        variant: "destructive",
      });
      setLoading(false);
    } else {
      toast({ title: "Welcome back" });
      navigate("/admin"); // Redirects to dashboard
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-dark px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-elevated p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-gold" />
          </div>
          <h2 className="font-display text-2xl font-bold text-charcoal">Admin Portal</h2>
          <p className="text-muted-foreground mt-2">Sign in to manage bookings</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="admin@hotel.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full h-12" variant="hero" disabled={loading}>
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;