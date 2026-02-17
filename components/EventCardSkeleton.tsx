"use client";

import React from "react";

const EventCardSkeleton = () => {
  return (
    <div className="bg-[#111] border border-white/5 rounded-2xl p-4 animate-pulse">
      <div className="flex items-start gap-4">
        {/* Icon/Image Placeholder */}
        <div className="w-12 h-12 bg-white/5 rounded-xl shrink-0" />

        {/* Text Content Placeholder */}
        <div className="flex-1 space-y-3 py-1">
          <div className="h-4 bg-white/10 rounded w-3/4" />
          <div className="h-3 bg-white/5 rounded w-full" />
          <div className="h-3 bg-white/5 rounded w-5/6" />
          
          <div className="flex gap-4 pt-1">
            <div className="h-3 bg-white/5 rounded w-16" />
            <div className="h-3 bg-white/5 rounded w-16" />
          </div>
        </div>

        {/* Button Placeholder */}
        <div className="w-10 h-10 bg-white/5 rounded-full shrink-0" />
      </div>
    </div>
  );
};

export default EventCardSkeleton;
