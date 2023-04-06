"use client";

import { GA_TRACKING_ID } from "@/utils/constants";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Analytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    gtag("config", GA_TRACKING_ID, {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
};

export default Analytics;
