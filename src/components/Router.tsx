import { AuthProvider } from '@/data-services/AuthProvider'; // Changed import source
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import CustomErrorPage from '@/data-services/errors-handling/CustomErrorPage'; // Changed import source and name
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Pages
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';
import ServicesPage from '@/components/pages/ServicesPage';
import AcademyPage from '@/components/pages/AcademyPage';
import BlogPage from '@/components/pages/BlogPage';
import ContactPage from '@/components/pages/ContactPage';
import LoginPage from '@/components/pages/LoginPage';
import RegisterPage from '@/components/pages/RegisterPage';
import ForgotPasswordPage from '@/components/pages/ForgotPasswordPage';
import DashboardPage from '@/components/pages/DashboardPage';
import BookingsPage from '@/components/pages/BookingsPage';
import SettingsPage from '@/components/pages/SettingsPage';
import AdminDashboardPage from '@/components/pages/AdminDashboardPage';
import AdminCoursesPage from '@/components/pages/AdminCoursesPage';
import AdminServicesPage from '@/components/pages/AdminServicesPage';
import AdminBookingsPage from '@/components/pages/AdminBookingsPage';

// Layout component with Header and Footer
function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <CustomErrorPage />, // Changed ErrorPage name
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "academy",
        element: <AcademyPage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "dashboard",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your dashboard">
            <DashboardPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "dashboard/bookings",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to view your bookings">
            <BookingsPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "dashboard/settings",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access settings">
            <SettingsPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <MemberProtectedRoute messageToSignIn="Admin access required">
            <AdminDashboardPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "admin/courses",
        element: (
          <MemberProtectedRoute messageToSignIn="Admin access required">
            <AdminCoursesPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "admin/services",
        element: (
          <MemberProtectedRoute messageToSignIn="Admin access required">
            <AdminServicesPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "admin/bookings",
        element: (
          <MemberProtectedRoute messageToSignIn="Admin access required">
            <AdminBookingsPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
