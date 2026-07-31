import { useState } from "react";

export default function Settings() {
  const [rate, setRate] = useState(
    Number(localStorage.getItem("waterRate")) || 0.5
  );

  const [saved, setSaved] = useState(false);

  const saveSettings = () => {
    const newRate = Number(rate);

    if (newRate < 0) {
      return;
    }

    localStorage.setItem(
      "waterRate",
      newRate.toString()
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const resetAllData = () => {
    const confirmed = window.confirm(
      "This will delete all water history and reset settings. Continue?"
    );

    if (!confirmed) return;

    localStorage.removeItem("waterHistory");

    localStorage.setItem("waterRate", "0.5");

    setRate(0.5);

    alert("All data has been reset.");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-blue-600 font-semibold">
          CONFIGURATION
        </p>

        <h2 className="text-3xl font-bold text-slate-800 mt-1">
          Settings
        </h2>

        <p className="text-slate-500 mt-2">
          Customize your water calculator.
        </p>
      </div>

      {/* Price */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
            💰
          </div>

          <div>
            <h3 className="font-bold text-lg">
              Water Price
            </h3>

            <p className="text-sm text-slate-500">
              Set the price for one cubic meter.
            </p>
          </div>
        </div>

        <div className="mt-7">
          <label className="block font-medium text-slate-700 mb-2">
            Price per m³
          </label>

          <div className="relative">
            <span className="absolute left-4 top-4 text-slate-400">
              $
            </span>

            <input
              type="number"
              min="0"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-4 pl-9 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <p className="text-xs text-slate-400 mt-2">
            Example: If price is $0.50, then 10 m³ costs $5.00.
          </p>
        </div>

        <button
          onClick={saveSettings}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Save Settings
        </button>

        {saved && (
          <div className="mt-4 bg-green-50 border border-green-200 text-green-600 p-3 rounded-xl text-sm">
            ✓ Settings saved successfully.
          </div>
        )}
      </div>

      {/* Current setting */}
      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-6">
        <h3 className="font-bold text-blue-800">
          Current Price
        </h3>

        <p className="text-3xl font-bold text-blue-600 mt-2">
          ${Number(rate).toFixed(2)}
          <span className="text-base font-medium ml-2">
            per m³
          </span>
        </p>
      </div>

      {/* Danger zone */}
      <div className="mt-8 bg-white border border-red-200 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center text-xl">
            ⚠️
          </div>

          <div>
            <h3 className="font-bold text-red-600">
              Reset Data
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Delete all history and reset the water price.
            </p>
          </div>
        </div>

        <button
          onClick={resetAllData}
          className="mt-5 border border-red-300 text-red-600 px-5 py-3 rounded-xl font-semibold hover:bg-red-50 transition"
        >
          Reset Everything
        </button>
      </div>

      {/* About */}
      <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="font-bold text-lg">
          About this application
        </h3>

        <p className="text-sm text-slate-500 leading-7 mt-3">
          Water Meter Calculator is a simple React application
          for calculating water consumption and estimated bills.
          Your readings are saved locally in your browser.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          <Technology name="React" />
          <Technology name="Tailwind CSS" />
          <Technology name="Router" />
          <Technology name="LocalStorage" />
        </div>
      </div>
    </div>
  );
}

function Technology({ name }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg py-3 text-center text-sm font-medium">
      {name}
    </div>
  );
}