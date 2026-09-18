import { Metadata } from "next";
import RulesClient from "./RulesClient";

export const metadata: Metadata = {
  title: "Rules | 4Fun Clan",
  description: "Absolute rules of the 4Fun Clan.",
};

export default function RulesPage() {
  return <RulesClient />;
}
