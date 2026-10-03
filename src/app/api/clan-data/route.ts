import { NextResponse } from "next/server";
import membersData from "@/data/members.json";
import localesData from "@/locales/id.json";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      members: membersData,
      rules: localesData.rules_list
    }
  });
}
