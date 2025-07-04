import DashboardNavbar from "@/components/dashboard-navbar";
import { type Metadata } from "next";
import { ToastContainer } from "react-toastify";
export const metadata: Metadata = {
  title: "CodeCrate Dashboard",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ToastContainer
        position='bottom-left'
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <DashboardNavbar />
      {children}
    </div>
  );
}
