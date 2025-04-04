"use client";
// Updated React + Tailwind component with grouped inputs and messaging cost calculation
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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

    // Connectivity cost
    let minutesPerMonth = 43800;
    if (connectivityOption === "half") minutesPerMonth = 21900;
    if (connectivityOption === "custom") minutesPerMonth = customMinutes;
    const perMinuteCostUSD = 0.000000096;
    const connectivityCostUSD = minutesPerMonth * perMinuteCostUSD;

    // Messaging cost
    const billableMessages = totalMonthlyMsgs *1.2;
    const messageCostPerUnit = 0.0000012;
    const messagingCostUSD = billableMessages * messageCostPerUnit;

    // Rule Trigger cost
    const billableRuleTriggers = totalMonthlyMsgs *2;
    const ruleTriggersPerUnit = 0.00000018;
    const ruleTriggerCostUSD = billableRuleTriggers * ruleTriggersPerUnit;

    const totalMonthlyCostUSD = parseFloat(connectivityCostUSD.toFixed(4)) * totalDevices + messagingCostUSD * totalDevices + grafanaAnnual/12+modelHostAnnual/12+ruleTriggerCostUSD * totalDevices;
    const totalDevelopmentCostINR =  twinCost + modelDevTotal;


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
      totalMonthlyCostUSD: totalMonthlyCostUSD.toFixed(2),
      totalDevelopmentCostINR: totalDevelopmentCostINR.toFixed(2),
      totalMonthlyCostINR: (totalDevelopmentCostINR / 12).toFixed(2),
      totalAnnualCostINR: totalDevelopmentCostINR.toFixed(2),
        ruleTriggerCostUSD: ruleTriggerCostUSD.toFixed(2),

    };
  };

  const result = calculate();

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">IoT Digital Twin Estimator</h2>
         <div className="flex justify-center">
            <Image src="/projects/BIMDigitalTwin/EndToEndArchitecture.png" alt="End-to-End" width={700} height={700}  />
          </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">📟 Device & Message Configuration</h3>
          <label className="flex flex-col">
            <span className="mb-1 text-sm">Device Types</span>
            <Input type="number" value={deviceTypes} onChange={(e) => setDeviceTypes(+e.target.value)} />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 text-sm">Devices per Type</span>
            <Input type="number" value={devicesPerType} onChange={(e) => setDevicesPerType(+e.target.value)} />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 text-sm">Sensors per Device</span>
            <Input type="number" value={sensorsPerDevice} onChange={(e) => setSensorsPerDevice(+e.target.value)} />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 text-sm">Messages per Minute</span>
            <Input type="number" value={msgFreqPerMin} onChange={(e) => setMsgFreqPerMin(+e.target.value)} />
          </label>
        </div>


        <div className="space-y-4">
          <h3 className="text-lg font-semibold">💰 Cost Inputs</h3>
          <label className="flex flex-col">
            <span className="mb-1 text-sm">Grafana Cost (INR/mo)</span>
            <Input type="number" value={grafanaMonthly} onChange={(e) => setGrafanaMonthly(+e.target.value)} />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 text-sm">Twin Cost per Device (INR)</span>
            <Input type="number" value={twinCostPerDevice} onChange={(e) => setTwinCostPerDevice(+e.target.value)} />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 text-sm">Model Development Cost (INR)</span>
            <Input type="number" value={modelDevCost} onChange={(e) => setModelDevCost(+e.target.value)} />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 text-sm">Model Hosting Cost (INR/mo)</span>
            <Input type="number" value={modelHostMonthly} onChange={(e) => setModelHostMonthly(+e.target.value)} />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 text-sm">Connectivity Duration</span>
            <select value={connectivityOption} onChange={(e) => setConnectivityOption(e.target.value)} className="p-2 border rounded">
              <option value="full">All Day (43800 mins)</option>
              <option value="half">Half Day (21900 mins)</option>
              <option value="custom">Custom</option>
            </select>
          </label>
          {connectivityOption === "custom" && (
            <label className="flex flex-col">
              <span className="mb-1 text-sm">Custom Minutes per Month</span>
              <Input type="number" value={customMinutes} onChange={(e) => setCustomMinutes(+e.target.value)} />
            </label>
          )}
        </div>
      </div>

      <label className="flex flex-col">
        <span className="mb-1 text-sm">Sample JSON Message</span>
        <Textarea value={sampleMsg} onChange={(e) => setSampleMsg(e.target.value)} className="w-full p-2 border rounded min-h-[100px]" />
      </label>

      <Card className="rounded-xl shadow-md">
        <CardContent className="space-y-2 p-4">
          <h3 className="text-lg font-semibold">📊 Estimation Result</h3>
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
          <p>Messaging Cost (USD/month): ${result.messagingCostUSD} * (#devices){result.totalDevices} = ${(parseFloat(result.messagingCostUSD) * result.totalDevices).toFixed(2)}</p>
          <p>Rule Trigger Cost (USD/month): ${result.ruleTriggerCostUSD} * (#devices){result.totalDevices} = ${(parseFloat(result.ruleTriggerCostUSD) * result.totalDevices).toFixed(2)}</p>

          <p className="font-semibold text-green-700">
            ✅ Total Monthly Cost (USD): ${result.totalMonthlyCostUSD}
            </p>
            <p className="font-semibold text-blue-700">
            💰 Total Development Cost (INR): ₹{result.totalDevelopmentCostINR}
            </p>

        </CardContent>
      </Card>

      <AIModelSamples />
    </div>
  );
}