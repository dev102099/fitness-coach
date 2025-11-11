"use client";
import OptionCard from "@/components/OptionCard";
import { supabase } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const fetch = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!user) {
        redirect("/");
      }
    };

    fetch();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-100">
      <OptionCard />
    </div>
  );
}
