import { createFileRoute, Outlet, redirect, useRouterState } from '@tanstack/react-router';
import AdminSidebar from '../../components/admin/sidebar';

export const Route = createFileRoute('/admin')({
  beforeLoad: ({ location }) => {
    // Allow login page without auth
    if (location.pathname === '/admin/login') return;

    // Check token for all other admin pages
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('nizron_token');
      if (!token) {
        throw redirect({ to: '/admin/login' });
      }
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  const { location } = useRouterState();
  const isLoginPage = location.pathname === '/admin/login';

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <AdminSidebar />
      <main className="pl-64 min-h-screen flex flex-col relative">
        {/* Main Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] pointer-events-none" />
        <div className="relative z-10 flex-1 p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

