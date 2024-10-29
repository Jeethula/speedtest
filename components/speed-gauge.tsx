"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Dynamic import to avoid SSR issues
const GaugeComponent = dynamic(() => import("react-gauge-component"), { ssr: false });

interface SpeedGaugeProps {
  speed: number;
  calculating: boolean;
}

export function SpeedGauge({ speed, calculating }: SpeedGaugeProps) {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Internet Speed</CardTitle>
        <CardDescription className="text-center">
          {calculating ? "Calculating..." : "Ready"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-8">
          <GaugeComponent
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              subArcs: [
                {
                  limit: 20,
                  color: "#EA4228",
                  showTick: true,
                  tooltip: {
                    text: "Poor Connection",
                  },
                },
                {
                  limit: 40,
                  color: "#F5CD19",
                  showTick: true,
                  tooltip: {
                    text: "Fair Speed",
                  },
                },
                {
                  limit: 60,
                  color: "#5BE12C",
                  showTick: true,
                  tooltip: {
                    text: "Good Speed",
                  },
                },
                {
                  limit: 80,
                  color: "#F5CD19",
                  showTick: true,
                  tooltip: {
                    text: "Very Good Speed",
                  },
                },
                {
                  color: "#EA4228",
                  tooltip: {
                    text: "Excellent Speed",
                  },
                },
              ],
            }}
            pointer={{
              color: "#345243",
              length: 0.8,
              width: 15,
              elastic: true,
            }}
            labels={{
              valueLabel: {
                formatTextValue: (value) => `${value} Mbps`,
                style: { textShadow: "none" },
              },
              tickLabels: {
                type: "outer",
                ticks: [
                  { value: 0 },
                  { value: 25 },
                  { value: 50 },
                  { value: 75 },
                  { value: 100 },
                ],
              },
            }}
            value={calculating ? Math.random() * speed : speed}
            minValue={0}
            maxValue={100}
          />

          <div className="gap-4 grid grid-cols-2 w-full">
            <div className="bg-muted p-4 rounded-lg text-center">
              <div className="font-bold text-3xl">{speed.toFixed(2)}</div>
              <div className="text-muted-foreground text-sm">Mbps</div>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <div className="font-bold text-3xl">{(speed / 8).toFixed(2)}</div>
              <div className="text-muted-foreground text-sm">MBps</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
