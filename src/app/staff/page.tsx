import { Metadata } from "next";
import StaffClient from "./StaffClient";

export const metadata: Metadata = {
  title: "Staff Structure | 4Fun Clan",
  description: "Organizational structure of the 4Fun Clan.",
};

export default function StaffPage() {
  return <StaffClient />;
}
