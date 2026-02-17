"use client";

import EventStats from "@/components/admin/EventStats";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function EventsPage() {
  const [user] = useAuthState(auth);
  return <EventStats user={user} />;
}
