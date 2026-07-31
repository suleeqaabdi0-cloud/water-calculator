import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState([]);

  const loadHistory = () => {
    const saved =
      JSON.parse(localStorage.getItem("waterHistory")) || [];

    setHistory(saved);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const deleteRecord = (id) => {
    const updated = history.filter(
      (item) => item.id !== id
    );

    setHistory(updated);

    localStorage.setItem(
      "waterHistory",
      JSON.stringify(updated)
    );
  };

  const clearHistory = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all history?"
    );

    if (!confirmed) return;

    setHistory([]);

    localStorage.removeItem("waterHistory");
  };

  const totalUsed = history.reduce(
    (sum, item) => sum + item.used,
    0
  );

  const totalBill = history.reduce(
    (sum, item) => sum + item.bill,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-blue-600 font-semibold">
            RECORDS
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-1">
            Water Usage History
          </h2>

          <p className="text-slate-500 mt-2">
            All your previous water meter calculations.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="bg-red-50 text-red-600 border border-red-200 px-5 py-3 rounded-xl font-medium hover:bg-red-100 transition"
          >
            Delete All
          </button>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <Summary
          title="Total Records"
          value={history.length}
          icon="📋"
        />

        <Summary
          title="Total Water Used"
          value={`${totalUsed.toFixed(2)} m³`}
          icon="💧"
        />

        <Summary
          title="Total Bills"
          value={`$${totalBill.toFixed(2)}`}
          icon="💵"
        />
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Date
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Previous
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Current
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Used
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Bill
              </th>

              <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-sm text-slate-600">
                  {item.date}
                </td>

                <td className="px-6 py-4 font-medium">
                  {item.previous} m³
                </td>

                <td className="px-6 py-4 font-medium">
                  {item.current} m³
                </td>

                <td className="px-6 py-4">
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {item.used.toFixed(2)} m³
                  </span>
                </td>

                <td className="px-6 py-4 font-bold text-green-600">
                  ${item.bill.toFixed(2)}
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => deleteRecord(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {history.length === 0 && (
          <EmptyHistory />
        )}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-slate-400">
                  DATE
                </p>

                <p className="text-sm font-medium mt-1">
                  {item.date}
                </p>
              </div>

              <button
                onClick={() => deleteRecord(item.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5">
              <Info
                label="Previous"
                value={`${item.previous} m³`}
              />

              <Info
                label="Current"
                value={`${item.current} m³`}
              />

              <Info
                label="Used"
                value={`${item.used.toFixed(2)} m³`}
              />

              <Info
                label="Bill"
                value={`$${item.bill.toFixed(2)}`}
              />
            </div>
          </div>
        ))}

        {history.length === 0 && (
          <EmptyHistory />
        )}
      </div>
    </div>
  );
}

function Summary({ title, value, icon }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between">
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

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="font-bold mt-1">
        {value}
      </p>
    </div>
  );
}

function EmptyHistory() {
  return (
    <div className="text-center py-16">
      <div className="text-5xl">📋</div>

      <h3 className="font-bold text-xl mt-4">
        No history found
      </h3>

      <p className="text-slate-500 text-sm mt-2">
        Your calculations will appear here.
      </p>
    </div>
  );
}