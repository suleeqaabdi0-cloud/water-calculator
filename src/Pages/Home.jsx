import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const [history, setHistory] = useState([]);

  const [rate, setRate] = useState(
    Number(localStorage.getItem("waterRate")) || 0.5
  );

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("waterHistory")) || [];

    setHistory(savedHistory);

    const savedRate =
      Number(localStorage.getItem("waterRate")) || 0.5;

    setRate(savedRate);
  }, []);

  const totalUsed = history.reduce(
    (total, item) => total + item.used,
    0
  );

  const totalBill = history.reduce(
    (total, item) => total + item.bill,
    0
  );

  const latest = history.length > 0 ? history[0] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 md:p-12 text-white overflow-hidden">
        <div className="max-w-2xl">
          <p className="text-blue-100 font-medium mb-3">
            WATER MANAGEMENT
          </p>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Track your water consumption easily.
          </h2>

          <p className="mt-4 text-blue-50 text-lg">
            Calculate your water usage, monitor your bills,
            and keep track of your meter readings.
          </p>

          <div className="flex flex-wrap gap-3 mt-7">
            <Link
              to="/calculator"
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
            >
              Calculate Now
            </Link>

            <Link
              to="/history"
              className="border border-white/40 px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
            >
              View History
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        <StatCard
          title="Total Records"
          value={history.length}
          icon="📋"
          color="blue"
        />

        <StatCard
          title="Total Usage"
          value={`${totalUsed.toFixed(2)} m³`}
          icon="💧"
          color="cyan"
        />

        <StatCard
          title="Total Bills"
          value={`$${totalBill.toFixed(2)}`}
          icon="💵"
          color="green"
        />

        <StatCard
          title="Current Rate"
          value={`$${rate}/m³`}
          icon="💰"
          color="purple"
        />
      </section>

      {/* Recent Reading */}
      <section className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Latest Reading
            </h3>

            <p className="text-sm text-slate-500">
              Your most recent water calculation
            </p>
          </div>

          <Link
            to="/history"
            className="text-blue-600 text-sm font-semibold hover:underline"
          >
            See all
          </Link>
        </div>

        {latest ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <InfoBox
              label="Previous"
              value={`${latest.previous} m³`}
            />

            <InfoBox
              label="Current"
              value={`${latest.current} m³`}
            />

            <InfoBox
              label="Water Used"
              value={`${latest.used.toFixed(2)} m³`}
            />

            <InfoBox
              label="Bill"
              value={`$${latest.bill.toFixed(2)}`}
            />
          </div>
        ) : (
          <div className="text-center py-10 bg-slate-50 rounded-xl">
            <div className="text-4xl mb-3">💧</div>

            <p className="font-semibold text-slate-700">
              No readings yet
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Start by adding your first meter reading.
            </p>

            <Link
              to="/calculator"
              className="inline-block mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium"
            >
              Add Reading
            </Link>
          </div>
        )}
      </section>

      {/* Features */}
      <section className="mt-8">
        <h3 className="text-2xl font-bold text-slate-800 text-center">
          What can you do?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          <Feature
            icon="🧮"
            title="Calculate"
            text="Calculate exactly how much water you have used."
          />

          <Feature
            icon="📊"
            title="Monitor"
            text="View your consumption history and statistics."
          />

          <Feature
            icon="⚙️"
            title="Customize"
            text="Change the water price per cubic meter."
          />
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h3 className="text-2xl font-bold text-slate-800 mt-2">
            {value}
          </h3>
        </div>

        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-5">
      <p className="text-sm text-slate-500">{label}</p>

      <p className="text-xl font-bold text-slate-800 mt-2">
        {value}
      </p>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
      <div className="text-4xl">{icon}</div>

      <h4 className="font-bold text-lg mt-4">
        {title}
      </h4>

      <p className="text-sm text-slate-500 mt-2 leading-6">
        {text}
      </p>
    </div>
  );
}