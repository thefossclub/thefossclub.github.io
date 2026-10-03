import "./globals.css";
import FosshackArchiveNavbar from "@/components/fosshack/archive-navbar";

export const metadata = {
  title: "FOSS Hack Archive | The FOSS Club",
  description: "Explore FOSS Hack editions from 2024, 2025 and 2026.",
};

export default function FosshackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <FosshackArchiveNavbar />
    {children}
  </>;
}
