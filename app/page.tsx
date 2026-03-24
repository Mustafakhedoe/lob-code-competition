"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Score = {
  name: string;
  score: string;
  percentage: number;
};

export default function Home() {
  const [name, setName] = useState("");
  const [scores, setScores] = useState<Score[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedName = localStorage.getItem("username");
    if (savedName) setName(savedName);

    const storedScores = JSON.parse(localStorage.getItem("scores") || "[]");
    storedScores.sort((a: Score, b: Score) => b.percentage - a.percentage);
    setScores(storedScores);
  }, []);

  const handleStart = () => {
    if (!name) {
      alert("Voer eerst je naam in!");
      return;
    }
    localStorage.setItem("username", name);
    router.push("/quiz");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-700 to-blue-500 text-white p-10">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">💻 LOB Code Competition</h1>
          <p className="text-gray-200">Test je HTML, CSS & JavaScript skills!</p>
        </div>

        {/* NAME INPUT */}
<div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl mb-10 text-center shadow-xl">
  <label
    htmlFor="username"
    className="block text-lg font-semibold mb-3 text-gray-100"
  >
    👤 Voer je naam in
  </label>
  <input
    id="username"
    type="text"
    placeholder="Bijv. Jan"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full p-4 rounded-xl text-black text-lg placeholder-gray-500 outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-purple-700 transition"
  />

  <button
    onClick={handleStart}
    className="mt-6 w-full bg-yellow-400 text-black font-bold py-4 rounded-xl hover:bg-yellow-300 transition-all shadow-lg hover:shadow-2xl"
  >
    Start Quiz 🚀
  </button>
</div>

        {/* SCOREBOARD */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">🏆 Scoreboard</h2>

          {scores.length === 0 ? (
            <p className="text-gray-300">Nog geen scores...</p>
          ) : (
            <div className="space-y-3">
              {scores.map((s, i) => (
                <div
                  key={i}
                  className={`flex justify-between p-3 rounded-lg ${
                    i === 0
                      ? "bg-yellow-400/50 text-black font-bold"
                      : i === 1
                      ? "bg-gray-300/30 text-black font-semibold"
                      : i === 2
                      ? "bg-gray-200/20 text-black"
                      : "bg-white/5"
                  }`}
                >
                  <span>{i + 1}. {s.name}</span>
                  <span>{s.score} ({s.percentage}%)</span>
                </div>
              ))}
            </div>
          )}

          {scores.length > 0 && (
            <button
              onClick={() => router.push("/quiz")}
              className="mt-6 bg-purple-400 hover:bg-purple-300 px-6 py-3 rounded-lg font-bold text-black transition"
            >
              Quiz opnieuw doen 🔁
            </button>
          )}
        </div>
      </div>
    </main>
  );
}