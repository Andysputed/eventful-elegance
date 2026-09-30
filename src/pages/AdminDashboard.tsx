import { AdminLayout } from "@/components/admin/AdminLayout";
import { BookingsManager } from "@/components/admin/BookingsManager";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <BookingsManager />
    </AdminLayout>
  );
};

export default AdminDashboard;
