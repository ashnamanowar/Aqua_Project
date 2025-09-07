import React from "react";
import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";

// --- Accurate ARGO-like Data ---
const depthSeries = [
  { depth: 0, salinity: 34.2 },
  { depth: 100, salinity: 34.4 },
  { depth: 300, salinity: 34.6 },
  { depth: 500, salinity: 34.8 },
  { depth: 1000, salinity: 35.0 },
  { depth: 1500, salinity: 35.1 },
  { depth: 2000, salinity: 35.2 },
];

const timeline = [
  { day: "Mar 01", profiles: 3 },
  { day: "Mar 05", profiles: 10 },
  { day: "Mar 10", profiles: 18 },
  { day: "Mar 15", profiles: 27 },
  { day: "Mar 20", profiles: 35 },
  { day: "Mar 25", profiles: 43 },
  { day: "Mar 30", profiles: 52 },
];

const sampleProfiles = [
  { id: "WMO 2902745", lat: "2.1°N", lon: "78.9°E", time: "2023-03-05 06:30Z" },
  { id: "WMO 2903321", lat: "-1.3°S", lon: "86.4°E", time: "2023-03-11 09:22Z" },
  { id: "WMO 2901358", lat: "0.6°N", lon: "73.1°E", time: "2023-03-19 12:44Z" },
  { id: "WMO 2904112", lat: "1.8°N", lon: "62.7°E", time: "2023-03-23 02:05Z" },
];

export default function Index() {
  const [messages, setMessages] = useState([
    {
      role: "user",
      text: "Show me salinity profiles near the equator in March 2023",
    },
    {
      role: "assistant", 
      text: "Found 52 ARGO profiles within ±5° latitude of the equator across the Indian Ocean. Here are the highlights and a representative profile.",
    },
  ]);

  const [input, setInput] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-bg via-ocean-deep to-ocean-card text-ocean-text-primary">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-xl bg-ocean-card/80 border-b border-ocean-border shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-ocean-accent to-ocean-cyan text-ocean-bg grid place-items-center shadow-xl text-xl">
              🌊
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-tight bg-gradient-to-r from-ocean-accent to-ocean-cyan bg-clip-text text-transparent">
                Ocean Data Explorer
              </h1>
              <p className="text-sm text-ocean-text-secondary">AI-powered ARGO insights</p>
            </div>
          </div>
          <div className="hidden md:block text-sm text-ocean-text-secondary bg-ocean-surface/50 px-4 py-2 rounded-xl border border-ocean-border">
            Query:{" "}
            <span className="font-semibold text-ocean-accent">
              "Show me salinity profiles near the equator in March 2023"
            </span>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chat Column */}
        <section className="lg:col-span-4 flex flex-col">
          <div className="rounded-3xl bg-ocean-card/60 backdrop-blur-xl shadow-2xl border border-ocean-border flex-1 flex flex-col overflow-hidden">
            <div className="px-5 py-4 border-b border-ocean-border bg-ocean-surface/30 text-sm font-semibold text-ocean-text-primary">
              AI Assistant Chat
            </div>

            <div className="flex-1 p-5 space-y-4 overflow-auto">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-lg ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-ocean-accent to-ocean-cyan text-ocean-bg ml-auto font-medium"
                      : "bg-ocean-surface/60 backdrop-blur text-ocean-text-primary border border-ocean-border/50"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{m.text}</p>
                </div>
              ))}

              {/* Assistant rich summary card */}
              <div className="rounded-2xl border border-ocean-border bg-gradient-to-br from-ocean-surface/40 to-ocean-deep/40 backdrop-blur p-4 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2 w-2 rounded-full bg-ocean-accent"></div>
                  <p className="text-sm font-semibold text-ocean-accent">Analysis Summary</p>
                </div>
                <ul className="text-sm space-y-2 text-ocean-text-secondary">
                  <li className="flex items-center gap-2">
                    <span className="text-ocean-cyan">●</span>
                    Spatial filter: <span className="font-medium text-ocean-text-primary">±5° latitude</span> around the Equator
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-ocean-cyan">●</span>
                    Time window: <span className="font-medium text-ocean-text-primary">Mar 1–31, 2023</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-ocean-cyan">●</span>
                    Profiles found: <span className="font-medium text-ocean-accent">52</span> across 17 floats
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-ocean-cyan">●</span>
                    Representative profile plotted below
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 border-t border-ocean-border bg-ocean-surface/20">
              <div className="flex items-center gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about region, time, or variable…"
                  className="flex-1 rounded-2xl px-4 py-3 bg-ocean-surface/60 backdrop-blur border border-ocean-border focus:outline-none focus:ring-2 focus:ring-ocean-accent text-ocean-text-primary placeholder:text-ocean-text-muted"
                />
                <button
                  onClick={() => {
                    if (!input.trim()) return;
                    setMessages((prev) => [
                      ...prev,
                      { role: "user", text: input },
                    ]);
                    setInput("");
                  }}
                  className="rounded-2xl px-4 py-3 bg-gradient-to-r from-ocean-accent to-ocean-cyan text-ocean-bg hover:from-ocean-cyan hover:to-ocean-accent shadow-lg font-medium transition-all"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* SQL Box */}
          <div className="mt-5 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 shadow-2xl border border-slate-700/50 backdrop-blur">
            <div className="px-5 py-3 border-b border-slate-700 text-xs uppercase tracking-wider text-ocean-cyan font-semibold">
              Generated SQL Query
            </div>
            <pre className="p-5 text-xs leading-6 overflow-x-auto text-slate-300">
              {`WITH filtered AS (
  SELECT profile_id, time_utc, latitude, longitude
  FROM profiles
  WHERE latitude BETWEEN -5 AND 5
    AND time_utc >= '2023-03-01' AND time_utc < '2023-04-01'
)
SELECT * FROM filtered LIMIT 200;`}
            </pre>
          </div>
        </section>

        {/* Right Column: Map + Analytics */}
        <section className="lg:col-span-8 space-y-6">
          {/* Interactive Map */}
          <div className="relative h-80 rounded-3xl border border-ocean-border bg-gradient-to-br from-ocean-card/60 to-ocean-deep/60 backdrop-blur shadow-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-ocean-border bg-ocean-surface/20 text-sm font-semibold flex items-center justify-between">
              <span className="text-ocean-text-primary">Global Ocean View</span>
              <span className="text-xs text-ocean-accent bg-ocean-accent/10 px-3 py-1 rounded-full">Equator band: ±5°</span>
            </div>
            <div className="relative h-[calc(100%-56px)] bg-gradient-to-br from-ocean-deep to-ocean-card">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(transparent 95%, rgba(0,255,255,0.1) 5%), linear-gradient(90deg, transparent 95%, rgba(0,255,255,0.1) 5%)",
                  backgroundSize: "60px 60px",
                }}
              />
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent shadow-lg" />
              {[
                { top: "41%", left: "65%", label: "WMO 2902745" },
                { top: "54%", left: "58%", label: "WMO 2903321" },
                { top: "47%", left: "52%", label: "WMO 2901358" },
                { top: "51%", left: "46%", label: "WMO 2904112" },
              ].map((p, i) => (
                <div
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: p.top, left: p.left }}
                >
                  <div className="h-4 w-4 rounded-full bg-gradient-to-br from-ocean-accent to-ocean-cyan shadow-lg ring-2 ring-ocean-accent/30 animate-pulse" />
                  <div className="text-xs mt-2 text-ocean-accent font-medium bg-ocean-card/80 px-2 py-1 rounded-lg backdrop-blur">{p.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { label: "Total Profiles", value: 52, color: "from-ocean-accent to-ocean-cyan" },
              { label: "Active Floats", value: 17, color: "from-ocean-cyan to-ocean-teal" },
              { label: "Avg Salinity (PSU)", value: 35.0, color: "from-ocean-teal to-ocean-blue" },
              { label: "Max Depth (m)", value: 2000, color: "from-ocean-blue to-ocean-accent" },
            ].map((k, i) => (
              <div
                key={i}
                className="rounded-3xl bg-gradient-to-br from-ocean-card/60 to-ocean-deep/60 backdrop-blur border border-ocean-border p-5 shadow-2xl hover:shadow-3xl transition-all"
              >
                <p className="text-xs text-ocean-text-muted uppercase tracking-wider font-medium">{k.label}</p>
                <p className={`text-3xl font-bold mt-2 bg-gradient-to-r ${k.color} bg-clip-text text-transparent`}>{k.value}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-gradient-to-br from-ocean-card/60 to-ocean-deep/60 backdrop-blur border border-ocean-border shadow-2xl p-5">
              <div className="text-base font-semibold mb-4 text-ocean-text-primary flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gradient-to-r from-ocean-accent to-ocean-cyan"></div>
                Salinity vs Depth Profile
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={depthSeries}
                    margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,255,0.1)" />
                    <XAxis
                      dataKey="salinity"
                      type="number"
                      domain={[34, 36]}
                      tickFormatter={(v) => v.toFixed(1)}
                      tick={{ fill: '#A0AEC0', fontSize: 12 }}
                      axisLine={{ stroke: '#4A5568' }}
                    />
                    <YAxis
                      dataKey="depth"
                      type="number"
                      reversed
                      domain={[0, 2000]}
                      tick={{ fill: '#A0AEC0', fontSize: 12 }}
                      axisLine={{ stroke: '#4A5568' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(26, 32, 44, 0.9)',
                        border: '1px solid rgba(0,255,255,0.3)',
                        borderRadius: '12px',
                        color: '#F7FAFC'
                      }}
                      formatter={(v, n) => [v, n === "salinity" ? "Salinity (PSU)" : "Depth (m)"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="salinity"
                      stroke="url(#salinity-gradient)"
                      strokeWidth={3}
                      dot={{ fill: '#00FFFF', strokeWidth: 2, r: 4 }}
                      name="Salinity"
                    />
                    <defs>
                      <linearGradient id="salinity-gradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#00FFFF" />
                        <stop offset="100%" stopColor="#4FD1C7" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-ocean-text-muted mt-3">
                Surface water ~34.2 PSU, deep ocean ~35.2 PSU (Indian Ocean, March 2023)
              </p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-ocean-card/60 to-ocean-deep/60 backdrop-blur border border-ocean-border shadow-2xl p-5">
              <div className="text-base font-semibold mb-4 text-ocean-text-primary flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gradient-to-r from-ocean-cyan to-ocean-teal"></div>
                Profile Discovery Timeline
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={timeline}
                    margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
                  >
                    <defs>
                      <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#4FD1C7" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,255,0.1)" />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fill: '#A0AEC0', fontSize: 12 }}
                      axisLine={{ stroke: '#4A5568' }}
                    />
                    <YAxis 
                      tick={{ fill: '#A0AEC0', fontSize: 12 }}
                      axisLine={{ stroke: '#4A5568' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(26, 32, 44, 0.9)',
                        border: '1px solid rgba(0,255,255,0.3)',
                        borderRadius: '12px',
                        color: '#F7FAFC'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="profiles"
                      stroke="#00FFFF"
                      strokeWidth={2}
                      fill="url(#area-gradient)"
                      name="Profiles Found"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="rounded-3xl bg-gradient-to-br from-ocean-card/60 to-ocean-deep/60 backdrop-blur border border-ocean-border shadow-2xl p-5">
            <div className="text-base font-semibold mb-4 text-ocean-text-primary flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-ocean-teal to-ocean-blue"></div>
              ARGO Float Profiles (Equatorial Region • March 2023)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-ocean-border">
                    <th className="py-3 text-ocean-accent font-semibold">Profile / Float ID</th>
                    <th className="py-3 text-ocean-accent font-semibold">Latitude</th>
                    <th className="py-3 text-ocean-accent font-semibold">Longitude</th>
                    <th className="py-3 text-ocean-accent font-semibold">Time (UTC)</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleProfiles.map((p, i) => (
                    <tr key={i} className="border-b border-ocean-border/30 hover:bg-ocean-surface/20 transition-colors">
                      <td className="py-3 font-medium text-ocean-text-primary">{p.id}</td>
                      <td className="py-3 text-ocean-text-secondary">{p.lat}</td>
                      <td className="py-3 text-ocean-text-secondary">{p.lon}</td>
                      <td className="py-3 text-ocean-text-secondary font-mono text-xs">{p.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-6 pb-8">
        <div className="text-center">
          <p className="text-xs text-ocean-text-muted">
            Ocean Data Explorer • SIH 2025 • Realistic ARGO oceanographic data visualization
          </p>
        </div>
      </footer>
    </div>
  );
}