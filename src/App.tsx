import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth Components
import { AuthProvider } from "@/components/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";

// NEW IMPORT
import ScrollToTop from "@/components/ScrollToTop"; 
import WhatsAppButton from "@/components/WhatsAppButton";

// Pages
import MenuPage from "./pages/Menu";
import Index from "./pages/Index";
import About from "./pages/About";
import Playground from "./pages/Playground";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
// Admin Components
import AdminLayout from "@/components/admin/AdminLayout";
import { BookingsManager } from "@/components/admin/BookingsManager";
import { MenuManager } from "@/components/admin/MenuManager";
import { AccommodationManager } from "@/components/admin/AccommodationManager";
import { AdminSettings } from "@/components/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* --- FIX ADDED HERE --- */}
          <ScrollToTop /> 
          <WhatsAppButton />
          {/* ---------------------- */}
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<BookingsManager />} />
                <Route path="accommodation" element={<AccommodationManager />} />
                <Route path="menu" element={<MenuManager />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route>

            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
