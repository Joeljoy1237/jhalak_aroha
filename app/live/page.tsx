"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import { categories } from "@/data/constant";
import Image from "next/image";
import { motion } from "framer-motion";

interface LiveStat {
  title: string;
  category: string;
  count: number;
  houseCounts: {
    Red: number;
    Blue: number;
    Yellow: number;
    Green: number;
  };
}

// Initial structure helper
const getInitialStats = (): LiveStat[] => {
  const stats: LiveStat[] = [];
  categories.forEach((cat) => {
    cat.items.forEach((item) => {
      stats.push({
        title: item.title,
        category: cat.title,
        count: 0,
        houseCounts: { Red: 0, Blue: 0, Yellow: 0, Green: 0 },
      });
    });
  });
  return stats;
};

export default function LiveStatsPage() {
  const [stats, setStats] = useState<LiveStat[]>(getInitialStats());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;

    // Listen to ALL users for house data mapping (could be heavy, but accurate)
    // Optimization: Listen to registrations and fetch user data on demand or keep a local cache
    // BETTER: Since we can't do complex joins in Firestore easily in real-time without cloud functions aggregating,
    // we will fetch all users once to build a UserID -> House map, then listed to registrations.
    // OR simpler: Just show total registration count per event first if house data is too heavy.

    // Let's try to do it right:
    // 1. Fetch all users to map UID -> House (One-time fetch usually, or snapshot if users update houses often)
    // 2. Listen to 'event_registrations' for real-time updates.

    const usersMap: Record<string, string> = {};

    const fetchUsers = async () => {
      // We'll use a snapshot listener on users too to handle new signups
      const qUsers = query(collection(db, "users"));
      const unsubscribeUsers = onSnapshot(qUsers, (snap) => {
        snap.forEach((doc) => {
          const data = doc.data();
          if (data.house) usersMap[doc.id] = data.house;
        });

        // After getting users, set up registration listener
        setupRegListener();
      });

      return unsubscribeUsers;
    };

    let unsubscribeRegs: () => void;

    const setupRegListener = () => {
      const qRegs = query(collection(db, "event_registrations"));
      unsubscribeRegs = onSnapshot(qRegs, (snap) => {
        const newStats = getInitialStats();
        const statMap = new Map<string, LiveStat>();
        newStats.forEach((s) => statMap.set(s.title, s));

        snap.forEach((doc) => {
          const data = doc.data();
          const title = data.eventTitle;
          if (statMap.has(title)) {
            const stat = statMap.get(title)!;
            stat.count++;

            // Count House
            let house = "Unknown";
            if (data.type === "individual" && data.userId) {
              house = usersMap[data.userId] || "Unknown";
            } else if (data.type === "team" && data.leaderId) {
              house = usersMap[data.leaderId] || "Unknown";
            }

            if (
              house === "Red" ||
              house === "Blue" ||
              house === "Yellow" ||
              house === "Green"
            ) {
              stat.houseCounts[house as keyof typeof stat.houseCounts]++;
            }
          }
        });

        // Filter out empty events to clean up view? Or show all?
        // Let's show all but sort by popularity
        newStats.sort((a, b) => b.count - a.count);
        setStats(newStats);
        setLoading(false);
      });
    };

    const cleanup = fetchUsers();

    return () => {
      cleanup.then((unsub) => unsub());
      if (unsubscribeRegs) unsubscribeRegs();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white font-unbounded">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#BA170D] border-t-transparent rounded-full animate-spin"></div>
          <p className="animate-pulse tracking-widest text-sm">
            FETCHING LIVE DATA...
          </p>
        </div>
      </div>
    );
  }

  // Calculate Totals
  const totalRegs = stats.reduce((acc, curr) => acc + curr.count, 0);
  const totalHouses = {
    Red: stats.reduce((acc, curr) => acc + curr.houseCounts.Red, 0),
    Blue: stats.reduce((acc, curr) => acc + curr.houseCounts.Blue, 0),
    Yellow: stats.reduce((acc, curr) => acc + curr.houseCounts.Yellow, 0),
    Green: stats.reduce((acc, curr) => acc + curr.houseCounts.Green, 0),
  };

  const getHouseColor = (house: string) => {
    switch (house) {
      case "Red":
        return "bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]";
      case "Blue":
        return "bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]";
      case "Yellow":
        return "bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)]";
      case "Green":
        return "bg-green-600 shadow-[0_0_20px_rgba(22,163,74,0.4)]";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white font-outfit relative overflow-y-auto selection:bg-[#BA170D] selection:text-white pb-20">
      <Navbar />

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-blue-900/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-[#BA170D]/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto mt-32 px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black font-unbounded text-white mb-4 tracking-tighter uppercase">
            Live <span className="text-[#BA170D]">Stats</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Real-time registration updates
          </p>
        </div>

        {/* House Leaderboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {(Object.keys(totalHouses) as Array<keyof typeof totalHouses>).map(
            (house) => (
              <motion.div
                key={house}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl border border-white/10 relative overflow-hidden group`}
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1 ${getHouseColor(house)}`}
                ></div>
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">
                  {house} House
                </h3>
                <p className={`text-4xl font-black font-unbounded`}>
                  {totalHouses[house]}
                </p>
                <p className="text-xs text-white/30 font-medium mt-1">
                  Registrations
                </p>
              </motion.div>
            ),
          )}
        </div>

        {/* Total Counter */}
        <div className="flex justify-center mb-16">
          <div className="flex flex-col items-center bg-white/5 border border-white/10 px-10 py-6 rounded-2xl backdrop-blur-md">
            <span className="text-[#BA170D] text-xs font-black uppercase tracking-[0.3em] mb-2">
              Total Registrations
            </span>
            <span className="text-5xl md:text-7xl font-black font-unbounded tracking-tighter text-white">
              {totalRegs}
            </span>
          </div>
        </div>

        {/* Event List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold font-unbounded text-lg leading-tight mb-1 group-hover:text-[#BA170D] transition-colors">
                    {stat.title}
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    {stat.category}
                  </span>
                </div>
                <div className="bg-white/10 px-3 py-1 rounded-lg text-sm font-black font-mono">
                  {stat.count}
                </div>
              </div>

              {/* House Distribution Bar */}
              <div className="flex h-2 rounded-full overflow-hidden w-full bg-white/5">
                {stat.count > 0 ? (
                  <>
                    <div
                      style={{
                        width: `${(stat.houseCounts.Red / stat.count) * 100}%`,
                      }}
                      className="bg-red-600"
                      title={`Red: ${stat.houseCounts.Red}`}
                    />
                    <div
                      style={{
                        width: `${(stat.houseCounts.Blue / stat.count) * 100}%`,
                      }}
                      className="bg-blue-600"
                      title={`Blue: ${stat.houseCounts.Blue}`}
                    />
                    <div
                      style={{
                        width: `${(stat.houseCounts.Yellow / stat.count) * 100}%`,
                      }}
                      className="bg-yellow-500"
                      title={`Yellow: ${stat.houseCounts.Yellow}`}
                    />
                    <div
                      style={{
                        width: `${(stat.houseCounts.Green / stat.count) * 100}%`,
                      }}
                      className="bg-green-600"
                      title={`Green: ${stat.houseCounts.Green}`}
                    />
                  </>
                ) : (
                  <div className="w-full bg-white/5" />
                )}
              </div>

              <div className="flex justify-between mt-2 text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                <span className="text-red-500">R: {stat.houseCounts.Red}</span>
                <span className="text-blue-500">
                  B: {stat.houseCounts.Blue}
                </span>
                <span className="text-yellow-500">
                  Y: {stat.houseCounts.Yellow}
                </span>
                <span className="text-green-500">
                  G: {stat.houseCounts.Green}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
