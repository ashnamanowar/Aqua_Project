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
  { depth: 0, salinity: 34.2 },    // surface fresher water
  { depth: 100, salinity: 34.4 },
  { depth: 300, salinity: 34.6 },
  { depth: 500, salinity: 34.8 },
  { depth: 1000, salinity: 35.0 },
  { depth: 1500, salinity: 35.1 },
  { depth: 2000, salinity: 35.2 }, // stable deep salinity
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
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-sky-600 text-white grid place-items-center shadow-md">
              🌊
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">
                Ocean Data Explorer
              </h1>
              <p className="text-xs text-slate-500">AI-powered ARGO insights</p>
            </div>
          </div>
          <div className="hidden md:block text-sm text-slate-600">
            Query:{" "}
            <span className="font-semibold">
              "Show me salinity profiles near the equator in March 2023"
            </span>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Chat Column */}
        <section className="lg:col-span-4 flex flex-col">
          <div className="rounded-2xl bg-white shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b bg-slate-50/60 text-sm font-semibold">
              Chat
            </div>

            <div className="flex-1 p-4 space-y-3 overflow-auto">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`max-w-[90%] rounded-2xl px-4 py-2 shadow-sm ${
                    m.role === "user"
                      ? "bg-sky-600 text-white ml-auto"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{m.text}</p>
                </div>
              ))}

              {/* Assistant rich summary card */}
              <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-[13px] text-slate-600 mb-2">Summary</p>
                <ul className="text-sm space-y-1 list-disc pl-5">
                  <li>
                    Spatial filter:{" "}
                    <span className="font-medium">±5° latitude</span> around the
                    Equator
                  </li>
                  <li>
                    Time window:{" "}
                    <span className="font-medium">Mar 1–31, 2023</span>
                  </li>
                  <li>
                    Profiles found: <span className="font-medium">52</span>{" "}
                    across 17 floats
                  </li>
                  <li>Representative profile plotted below</li>
                </ul>
              </div>
            </div>

            <div className="p-3 border-t bg-slate-50/60">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about region, time, or variable…"
                  className="flex-1 rounded-xl px-3 py-2 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600"
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
                  className="rounded-xl px-3 py-2 bg-sky-600 text-white hover:bg-sky-700 shadow"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* SQL Box (non-functional mock) */}
          <div className="mt-4 rounded-2xl bg-slate-900 text-slate-100 shadow-sm border border-slate-800">
            <div className="px-4 py-2 border-b border-slate-800 text-xs uppercase tracking-wide text-slate-400">
              Generated SQL (mock)
            </div>
            <pre className="p-4 text-[11px] leading-5 overflow-x-auto">
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
        <section className="lg:col-span-8 space-y-5">
          {/* Map */}
          <div className="relative h-72 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b bg-slate-50/60 text-sm font-semibold flex items-center justify-between">
              <span>Interactive Map (mock)</span>
              <span className="text-xs text-slate-500">Equator band: ±5°</span>
            </div>
            <div className="relative h-[calc(100%-44px)] bg-sky-100">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(transparent 95%, rgba(0,0,0,0.06) 5%), linear-gradient(90deg, transparent 95%, rgba(0,0,0,0.06) 5%)",
                  backgroundSize: "60px 60px",
                }}
              />
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-rose-500" />
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
                  <div className="h-3 w-3 rounded-full bg-sky-600 shadow ring-2 ring-white" />
                  <div className="text-[10px] mt-1 text-slate-600">{p.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Profiles", value: 52 },
              { label: "Floats", value: 17 },
              { label: "Avg Salinity (PSU)", value: 35.0 },
              { label: "Depth Max (m)", value: 2000 },
            ].map((k, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm"
              >
                <p className="text-xs text-slate-500">{k.label}</p>
                <p className="text-2xl font-semibold mt-1">{k.value}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
              <div className="text-sm font-semibold mb-3">
                Salinity vs Depth (Representative Profile)
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={depthSeries}
                    margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="salinity"
                      type="number"
                      domain={[34, 36]}
                      tickFormatter={(v) => v.toFixed(1)}
                      label={{
                        value: "Salinity (PSU)",
                        position: "insideBottom",
                        offset: -2,
                      }}
                    />
                    <YAxis
                      dataKey="depth"
                      type="number"
                      reversed
                      domain={[0, 2000]}
                      label={{
                        value: "Depth (m)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip
                      formatter={(v, n) => [
                        v,
                        n === "salinity" ? "Salinity" : "Depth",
                      ]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="salinity"
                      dot={true}
                      strokeWidth={2}
                      name="Salinity"
                      stroke="#0284c7" // added color for visibility
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Surface water ~34.2 PSU, deep ocean ~35.2 PSU (Indian Ocean,
                March 2023).
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
              <div className="text-sm font-semibold mb-3">
                Profiles Found in March 2023
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={timeline}
                    margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
                  >
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0284c7" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="#0284c7" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="profiles"
                      stroke="#0284c7"
                      fill="url(#g1)"
                      name="Profiles"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
            <div className="text-sm font-semibold mb-3">
              Sample Profiles (near Equator · March 2023)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className="py-2">Profile / Float</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Time (UTC)</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleProfiles.map((p, i) => (
                    <tr key={i} className="border-t">
                      <td className="py-2 font-medium">{p.id}</td>
                      <td>{p.lat}</td>
                      <td>{p.lon}</td>
                      <td>{p.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-4 pb-8">
        <p className="text-[11px] text-slate-500">
          Mock UI for SIH 2025 – Data values reflect realistic ARGO float
          observations.
        </p>
      </footer>
    </div>
  );
}