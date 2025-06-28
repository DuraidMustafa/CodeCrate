import DashboardNavbar from "@/components/dashboard-navbar";
import { type Metadata } from "next";

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
      <DashboardNavbar />
      {children}
    </div>
  );
}
