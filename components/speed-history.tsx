"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SpeedTest {
  timestamp: string;
  downloadMbps: number;
  uploadMbps: number;
}

interface SpeedHistoryProps {
  history: SpeedTest[];
}

export function SpeedHistory({ history }: SpeedHistoryProps) {
  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>Speed Test History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Download (Mbps)</TableHead>
              <TableHead>Upload (Mbps)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((test, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(test.timestamp).toLocaleString()}</TableCell>
                <TableCell>{test.downloadMbps.toFixed(2)}</TableCell>
                <TableCell>{test.uploadMbps.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}