"use client";

import React from "react";
import PackageCard from "./PackageCard";
import { PackageItem } from "@/lib/validation/chat-schema";

interface PackageComparisonProps {
  packages?: PackageItem[];
  onSelectPackage?: (packageName: string) => void;
}

export default function PackageComparison({
  packages,
  onSelectPackage,
}: PackageComparisonProps) {
  if (!packages || packages.length === 0) return null;

  return (
    <div className="mt-3 flex flex-col gap-3 w-full">
      {packages.map((pkg) => (
        <PackageCard
          key={pkg.id}
          pkg={pkg}
          onSelectPackage={onSelectPackage}
        />
      ))}
    </div>
  );
}

