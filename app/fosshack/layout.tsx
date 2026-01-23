import "./globals.css";

export const metadata = {
  title: "FOSS Hack 2026 Delhi-NCR",
  description: "Join us for the biggest open-source hackathon in Delhi-NCR",
};

export default function FosshackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
