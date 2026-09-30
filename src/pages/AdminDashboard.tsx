import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { BookingsManager } from "@/components/admin/BookingsManager";
import { MenuManager } from "@/components/admin/MenuManager";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<"bookings" | "menu">("bookings");

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "bookings" ? <BookingsManager /> : <MenuManager />}
    </AdminLayout>
  );
};

export default AdminDashboard;
