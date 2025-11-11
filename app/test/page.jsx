import { getAudio } from "@/utils/deepgram";
import React from "react";

function page() {
  getAudio();
  return <div>Test Page</div>;
}

export default page;
