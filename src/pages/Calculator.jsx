import { useState } from "react";
import { Link } from "react-router-dom";

export default function Calculator() {
  const [previous, setPrevious] = useState("");
  const [current, setCurrent] = useState("");

  const [used, setUsed] = useState(0);
  const [bill, setBill] = useState(0);

  const [error, setError] = useState("");

  const [rate, setRate] = useState(
    Number(localStorage.getItem("waterRate")) || 0.5
  );

  const calculate = () => {
    setError("");

    if (previous === "" || current === "") {
      setError("Please enter both meter readings.");
      return;
    }

    const previousValue = Number(previous);
    const currentValue = Number(current);

    if (currentValue < previousValue) {
      setError(
        "Current reading cannot be smaller than previous reading."
      );

      setUsed(0);
      setBill(0);

      return;
    }

    const waterUsed = currentValue - previousValue;
    const totalBill = waterUsed * rate;

    setUsed(waterUsed);
    setBill(totalBill);

    const oldHistory =
      JSON.parse(localStorage.getItem("waterHistory")) || [];

    const newRecord = {
      id: Date.now(),
      previous: previousValue,
      current: currentValue,
      used: waterUsed,
      bill: totalBill,
      rate: rate,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "waterHistory",
      JSON.stringify([newRecord, ...oldHistory])
    );
  };

  const clearForm = () => {
    setPrevious("");
    setCurrent("");
    setUsed(0);
    setBill(0);
    setError("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-blue-600 font-semibold">
          WATER CALCULATOR
        </p>

        <h2 className="text-3xl font-bold text-slate-800 mt-1">
          Calculate Water Consumption
        </h2>

        <p className="text-slate-500 mt-2">
          Enter your previous and current meter readings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              💧
            </div>

            <div>
              <h3 className="font-bold text-lg">
                Meter Readings
              </h3>

              <p className="text-sm text-slate-500">
                Current rate: ${rate}/m³
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm">
              ⚠️ {error}
            </div>
          )}

          <label className="block mb-2 font-medium text-slate-700">
            Previous Reading
          </label>

          <div className="relative mb-5">
            <input
              type="number"
              min="0"
              placeholder="Example: 100"
              value={previous}
              onChange={(e) => setPrevious(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-4 pr-16 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
            />

            <span className="absolute right-4 top-4 text-slate-400">
              m³
            </span>
          </div>

          <label className="block mb-2 font-medium text-slate-700">
            Current Reading
          </label>

          <div className="relative mb-6">
            <input
              type="number"
              min="0"
              placeholder="Example: 150"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-4 pr-16 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
            />

            <span className="absolute right-4 top-4 text-slate-400">
              m³
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={calculate}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition"
            >
              Calculate
            </button>

            <button
              onClick={clearForm}
              className="px-5 border border-slate-300 hover:bg-slate-50 rounded-xl font-medium transition"
            >
              Clear
            </button>
          </div>

          <Link
            to="/settings"
            className="block text-center text-sm text-blue-600 mt-5 hover:underline"
          >
            Change water price →
          </Link>
        </div>

        {/* Result */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold">
            Calculation Result
          </h3>

          <p className="text-blue-100 text-sm mt-1">
            Your current water consumption
          </p>

          <div className="mt-8">
            <p className="text-blue-100 text-sm">
              Water Used
            </p>

            <h2 className="text-5xl font-bold mt-2">
              {used.toFixed(2)}
              <span className="text-2xl ml-2 font-medium">
                m³
              </span>
            </h2>
          </div>

          <div className="border-t border-white/20 my-7" />

          <div>
            <p className="text-blue-100 text-sm">
              Total Bill
            </p>

            <h2 className="text-4xl font-bold mt-2">
              ${bill.toFixed(2)}
            </h2>
          </div>

          <div className="mt-8 bg-white/10 rounded-xl p-4">
            <div className="flex justify-between text-sm">
              <span>Previous</span>
              <span>
                {previous || 0} m³
              </span>
            </div>

            <div className="flex justify-between text-sm mt-3">
              <span>Current</span>
              <span>
                {current || 0} m³
              </span>
            </div>

            <div className="flex justify-between text-sm mt-3">
              <span>Price</span>
              <span>${rate} / m³</span>
            </div>
          </div>
        </div>
      </div>

      {/* Formula */}
      <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="font-bold text-lg">
          How is it calculated?
        </h3>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-xl p-5">
            <p className="text-sm text-blue-600 font-medium">
              Water Used
            </p>

            <p className="font-bold mt-2">
              Current Reading − Previous Reading
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-sm text-green-600 font-medium">
              Total Bill
            </p>

            <p className="font-bold mt-2">
              Water Used × Price per m³
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}