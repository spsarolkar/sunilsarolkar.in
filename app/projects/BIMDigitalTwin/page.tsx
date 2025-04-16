"use client";
import { useState } from "react";
import AIModelSamples from "./AIModel";
import Image from 'next/image';

export default function IoTTwinEstimator() {
  const [deviceTypes, setDeviceTypes] = useState(5);
  const [devicesPerType, setDevicesPerType] = useState(10);
  const [sensorsPerDevice, setSensorsPerDevice] = useState(4);
  const [msgFreqPerMin, setMsgFreqPerMin] = useState(1);
  const [sampleMsg, setSampleMsg] = useState('{"device_id":"AHU-3F-07","temp":24.8,"co2":417,"status":"OK"}');
  const [grafanaMonthly, setGrafanaMonthly] = useState(5000);
  const [twinCostPerDevice, setTwinCostPerDevice] = useState(300);
  const [modelDevCost, setModelDevCost] = useState(100000);
  const [modelHostMonthly, setModelHostMonthly] = useState(2000);
  const [connectivityOption, setConnectivityOption] = useState("full");
  const [customMinutes, setCustomMinutes] = useState(0);

  const calculate = () => {
    const totalDevices = deviceTypes * devicesPerType;
    const totalSensors = totalDevices * sensorsPerDevice;
    const msgsPerDayPerDevice = msgFreqPerMin * 60 * 24;
    const totalDailyMsgs = totalDevices * msgsPerDayPerDevice;
    const totalMonthlyMsgs = totalDailyMsgs * 30;
    let payloadBytes = 0;
    try {
      payloadBytes = new TextEncoder().encode(JSON.stringify(JSON.parse(sampleMsg))).length;
    } catch (e) {
      payloadBytes = new TextEncoder().encode(sampleMsg).length;
    }
    const totalMonthlyMB = (totalMonthlyMsgs * payloadBytes) / (1024 * 1024);
    const grafanaAnnual = grafanaMonthly * 12;
    const twinCost = twinCostPerDevice * totalDevices;
    const modelDevTotal = modelDevCost * 4;
    const modelHostAnnual = modelHostMonthly * 12 * 4;
    let minutesPerMonth = 43800;
    if (connectivityOption === "half") minutesPerMonth = 21900;
    if (connectivityOption === "custom") minutesPerMonth = customMinutes;
    const perMinuteCostUSD = 0.000000096;
    const connectivityCostUSD = minutesPerMonth * perMinuteCostUSD;
    const billableMessages = totalMonthlyMsgs * 1.2;
    const messageCostPerUnit = 0.0000012;
    const messagingCostUSD = billableMessages * messageCostPerUnit;
    const billableRuleTriggers = totalMonthlyMsgs * 2;
    const ruleTriggersPerUnit = 0.00000018;
    const ruleTriggerCostUSD = billableRuleTriggers * ruleTriggersPerUnit;
    const totalMonthlyCostINR = parseFloat(connectivityCostUSD.toFixed(4)) * totalDevices * 100 + messagingCostUSD  * 100 * totalDevices + grafanaAnnual / 12 + modelHostAnnual / 12 + ruleTriggerCostUSD * 100 * totalDevices;
    const totalDevelopmentCostINR = twinCost + modelDevTotal;
    return {
      totalDevices,
      totalSensors,
      payloadBytes,
      totalDailyMsgs,
      totalMonthlyMsgs,
      totalMonthlyMB: totalMonthlyMB.toFixed(2),
      grafanaAnnual,
      twinCost,
      modelDevTotal,
      modelHostAnnual,
      connectivityCostUSD: connectivityCostUSD.toFixed(4),
      messagingCostUSD: messagingCostUSD.toFixed(2),
      totalDevelopmentCostINR: totalDevelopmentCostINR.toFixed(2),
      totalMonthlyCostINR: (totalDevelopmentCostINR / 12).toFixed(2),
      totalAnnualCostINR: totalDevelopmentCostINR.toFixed(2),
      ruleTriggerCostUSD: ruleTriggerCostUSD.toFixed(2),
    };
  };

  const result = calculate();

  return (
    <div className="p-6 space-y-6 bg-neutral text-neutral-content">
      <h2 className="text-2xl font-bold">IoT Digital Twin Estimator</h2>
      <div className="flex justify-center">
        <Image src="/projects/BIMDigitalTwin/EndToEndArchitecture.png" alt="End-to-End" width={700} height={700} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">📟 Device & Message Configuration</h3>
          <label className="form-control w-full">
            <span className="label-text">Device Types</span>
            <input type="number" className="input input-bordered w-full" value={deviceTypes} onChange={(e) => setDeviceTypes(+e.target.value)} />
          </label>
          <label className="form-control w-full">
            <span className="label-text">Devices per Type</span>
            <input type="number" className="input input-bordered w-full" value={devicesPerType} onChange={(e) => setDevicesPerType(+e.target.value)} />
          </label>
          <label className="form-control w-full">
            <span className="label-text">Sensors per Device</span>
            <input type="number" className="input input-bordered w-full" value={sensorsPerDevice} onChange={(e) => setSensorsPerDevice(+e.target.value)} />
          </label>
          <label className="form-control w-full">
            <span className="label-text">Messages per Minute</span>
            <input type="number" className="input input-bordered w-full" value={msgFreqPerMin} onChange={(e) => setMsgFreqPerMin(+e.target.value)} />
          </label>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">💰 Cost Inputs</h3>
          <label className="form-control w-full">
            <span className="label-text">Grafana Cost (INR/mo)</span>
            <input type="number" className="input input-bordered w-full" value={grafanaMonthly} onChange={(e) => setGrafanaMonthly(+e.target.value)} />
          </label>
          <label className="form-control w-full">
            <span className="label-text">Twin Cost per Device (INR)</span>
            <input type="number" className="input input-bordered w-full" value={twinCostPerDevice} onChange={(e) => setTwinCostPerDevice(+e.target.value)} />
          </label>
          <label className="form-control w-full">
            <span className="label-text">Model Development Cost (INR)</span>
            <input type="number" className="input input-bordered w-full" value={modelDevCost} onChange={(e) => setModelDevCost(+e.target.value)} />
          </label>
          <label className="form-control w-full">
            <span className="label-text">Model Hosting Cost (INR/mo)</span>
            <input type="number" className="input input-bordered w-full" value={modelHostMonthly} onChange={(e) => setModelHostMonthly(+e.target.value)} />
          </label>
          <label className="form-control w-full">
            <span className="label-text">Connectivity Duration</span>
            <select value={connectivityOption} onChange={(e) => setConnectivityOption(e.target.value)} className="select select-bordered w-full">
              <option value="full">All Day (43800 mins)</option>
              <option value="half">Half Day (21900 mins)</option>
              <option value="custom">Custom</option>
            </select>
          </label>
          {connectivityOption === "custom" && (
            <label className="form-control w-full">
              <span className="label-text">Custom Minutes per Month</span>
              <input type="number" className="input input-bordered w-full" value={customMinutes} onChange={(e) => setCustomMinutes(+e.target.value)} />
            </label>
          )}
        </div>
      </div>

      <label className="form-control">
        <span className="label-text">Sample JSON Message</span>
        <textarea className="textarea textarea-bordered h-32" value={sampleMsg} onChange={(e) => setSampleMsg(e.target.value)} />
      </label>

      <div className="card bg-base-200 text-base-content shadow-xl">
        <div className="card-body">
          <h3 className="card-title">📊 Estimation Result</h3>
          <p>Total Devices: {result.totalDevices}</p>
          <p>Total Sensors: {result.totalSensors}</p>
          <p>Message Size (Bytes): ~{result.payloadBytes}</p>
          <p>Monthly Messages: {result.totalMonthlyMsgs}</p>
          <p>Monthly Data Volume: {result.totalMonthlyMB} MB</p>
          <p>Grafana Annual Cost: ₹{result.grafanaAnnual}</p>
          <p>Digital Twin Cost: ₹{result.twinCost}</p>
          <p>AI Model Development (4 Models): ₹{result.modelDevTotal}</p>
          <p>AI Model Hosting (Annual): ₹{result.modelHostAnnual}</p>
          <p>Connectivity Cost (USD/month): ${result.connectivityCostUSD} * (#devices){result.totalDevices} = ${(parseFloat(result.connectivityCostUSD) * result.totalDevices).toFixed(2)}</p>
          <p>Messaging Cost (USD/month): ${result.messagingCostUSD} * (#devices){result.totalDevices} = {(parseFloat(result.messagingCostUSD) * result.totalDevices).toFixed(2)}</p>
          <p>Rule Trigger Cost (USD/month): ${result.ruleTriggerCostUSD} * (#devices){result.totalDevices} = {(parseFloat(result.ruleTriggerCostUSD) * result.totalDevices).toFixed(2)}</p>
          <p className="font-semibold text-success">✅ Total Monthly Cost (INR): ₹{result.totalMonthlyCostINR}</p>
          <p className="font-semibold text-primary">💰 Total Development Cost (INR): ₹{result.totalDevelopmentCostINR}</p>
        </div>
      </div>

      <AIModelSamples />
    </div>
  );
}