import "./globals.css";

export const metadata = {
  title: "FOSS Hack 2026 Recap",
  description:
    "A recap of the biggest open-source hackathon in Delhi-NCR. Highlights, winners, memories and more.",
};

export default function Fosshack2026Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
