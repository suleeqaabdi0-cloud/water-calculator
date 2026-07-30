import { useEffect, useState } from "react";

export default function Usage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("waterHistory")) || [];

    setHistory(saved);
  }, []);

  const totalUsed = history.reduce(
    (sum, item) => sum + item.used,
    0
  );

  const totalBill = history.reduce(
    (sum, item) => sum + item.bill,
    0
  );

  const average =
    history.length > 0
      ? totalUsed / history.length
      : 0;

  const highest =
    history.length > 0
      ? Math.max(...history.map((item) => item.used))
      : 0;

  const lowest =
    history.length > 0
      ? Math.min(...history.map((item) => item.used))
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-blue-600 font-semibold">
          ANALYTICS
        </p>

        <h2 className="text-3xl font-bold text-slate-800 mt-1">
          Water Usage Statistics
        </h2>

        <p className="text-slate-500 mt-2">
          Understand how much water you are consuming.
        </p>
      </div>

      {/* Main statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card
          title="Total Usage"
          value={`${totalUsed.toFixed(2)} m³`}
          icon="💧"
        />

        <Card
          title="Average Usage"
          value={`${average.toFixed(2)} m³`}
          icon="📊"
        />

        <Card
          title="Highest Usage"
          value={`${highest.toFixed(2)} m³`}
          icon="📈"
        />

        <Card
          title="Lowest Usage"
          value={`${lowest.toFixed(2)} m³`}
          icon="📉"
        />
      </div>

      {/* Usage bars */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mt-8">
        <div className="mb-6">
          <h3 className="text-xl font-bold">
            Usage per Reading
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Visual representation of your water usage.
          </p>
        </div>

        {history.length > 0 ? (
          <div className="space-y-5">
            {history.slice(0, 10).map((item, index) => {
              const percentage =
                highest > 0
                  ? (item.used / highest) * 100
                  : 0;

              return (
                <div key={item.id}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">
                      Reading #{history.length - index}
                    </span>

                    <span className="text-sm font-bold text-blue-600">
                      {item.used.toFixed(2)} m³
                    </span>
                  </div>

                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl">📊</div>

            <h3 className="font-bold text-lg mt-4">
              No data yet
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Add some readings to see your statistics.
            </p>
          </div>
        )}
      </div>

      {/* Bill summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-blue-600 text-white rounded-2xl p-7">
          <p className="text-blue-100">
            Total Water Consumption
          </p>

          <h3 className="text-4xl font-bold mt-3">
            {totalUsed.toFixed(2)} m³
          </h3>

          <p className="text-blue-100 text-sm mt-3">
            Based on {history.length} recorded readings.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-7">
          <p className="text-slate-500">
            Total Amount Paid
          </p>

          <h3 className="text-4xl font-bold mt-3 text-green-600">
            ${totalBill.toFixed(2)}
          </h3>

          <p className="text-slate-400 text-sm mt-3">
            Total calculated bill from all records.
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-xl font-bold">
          💡 Water Saving Tips
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <Tip
            title="Fix Leaks"
            text="Check taps and pipes regularly for leaks."
          />

          <Tip
            title="Shorter Showers"
            text="Reduce shower time to lower water consumption."
          />

          <Tip
            title="Reuse Water"
            text="Reuse suitable household water when possible."
          />
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="text-2xl font-bold mt-2">
            {value}
          </h3>
        </div>

        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}

function Tip({ title, text }) {
  return (
    <div className="bg-slate-50 rounded-xl p-5">
      <h4 className="font-bold">{title}</h4>

      <p className="text-sm text-slate-500 mt-2 leading-6">
        {text}
      </p>
    </div>
  );
}