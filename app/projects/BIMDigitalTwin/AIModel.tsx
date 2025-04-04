"use client";
import React from "react";

const aiModels = [
  {
    name: "Predictive Maintenance",
    description:
      "Predicts equipment failures based on vibration, temperature, and power usage.",
    sampleInput: {
      timestamp: "2025-04-04T10:00:00Z",
      vibration_rms: 0.031,
      temperature: 56.3,
      current_draw: 4.1
    },
    sampleOutput: {
      failure_risk: "High",
      estimated_days_to_failure: 7
    }
  },
  {
    name: "Energy Optimization",
    description:
      "Suggests optimal AHU and chiller settings based on occupancy and weather.",
    sampleInput: {
      external_temp: 32,
      occupancy: 87,
      humidity: 61,
      zone_temp: 24
    },
    sampleOutput: {
      ahu_speed: "Medium",
      chiller_setpoint: 7,
      expected_savings_kwh: 3.6
    }
  },
  {
    name: "Zone Comfort Balancer",
    description:
      "Balances airflow and temperature across building zones in real time.",
    sampleInput: {
      zone: "Floor2-East",
      current_temp: 27.5,
      target_temp: 24,
      pressure_diff: 1.2
    },
    sampleOutput: {
      damper_adjustment: -12,
      fan_speed_percent: 68
    }
  },
  {
    name: "Chiller Load Forecast",
    description:
      "Forecasts chiller load over the next hour based on weather and usage.",
    sampleInput: {
      forecast_time: "2025-04-04T11:00:00Z",
      ext_temp: 35,
      past_load_kw: [45, 48, 51, 53, 55],
      occupancy_index: 92
    },
    sampleOutput: {
      predicted_load_kw: 59.4,
      confidence: "±2.5"
    }
  }
];

export default function AIModelSamples() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">AI Model Inputs & Outputs</h2>
      {aiModels.map((model, index) => (
        <div key={index} className="border rounded-xl p-4 shadow-sm bg-white">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            {model.name}
          </h3>
          <p className="mb-2 text-gray-700">{model.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800">Sample Input:</h4>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {JSON.stringify(model.sampleInput, null, 2)}
              </pre>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Sample Output:</h4>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {JSON.stringify(model.sampleOutput, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}