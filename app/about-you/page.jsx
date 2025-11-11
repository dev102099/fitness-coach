"use server";
import OptionCard from "@/components/OptionCard";
import { supabase } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function page() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/"); // ✅ valid on server
  }

  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-100">
      <OptionCard />
    </div>
  );
}

export default page;
