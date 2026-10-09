import { Metadata } from "next";
import GuidebookClient from "./GuidebookClient";

export const metadata: Metadata = {
  title: "Guidebook | 4Fun Clan",
  description: "Official Guidebook for the 4FUN gaming clan.",
};

export default function GuidebookPage() {
  return <GuidebookClient />;
}
