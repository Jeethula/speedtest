"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SpeedGauge } from "@/components/speed-gauge";
import { Button } from "@/components/ui/button";
import { History, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface SpeedTest {
  timestamp: string;
  downloadSpeed: number;
  uploadSpeed: number;
}

export default function Home() {
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [calculating, setCalculating] = useState(false);
  const [history, setHistory] = useState<SpeedTest[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("speedTestHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = (downloadSpeed: number, uploadSpeed: number) => {
    const newTest = {
      timestamp: new Date().toISOString(),
      downloadSpeed,
      uploadSpeed,
    };
    const updatedHistory = [newTest, ...history].slice(0, 7);
    setHistory(updatedHistory);
    localStorage.setItem("speedTestHistory", JSON.stringify(updatedHistory));
  };

  const testSpeed = async () => {
    setCalculating(true);
    setDownloadSpeed(0);
    setUploadSpeed(0);

    try {
      const response = await fetch('/api/getSpeed',
        {
          cache: 'no-store',
          method: 'GET',
        }
      );
      if (!response.ok) throw new Error('Speed test failed');
      
      const { downloadSpeed, uploadSpeed } = await response.json();
      
      setDownloadSpeed(downloadSpeed);
      setUploadSpeed(uploadSpeed);
      
      saveToHistory(downloadSpeed, uploadSpeed);
      toast.success("Speed test completed successfully!");
    } catch (error) {
      console.error("Speed test failed", error);
      toast.error("Failed to complete speed test. Please try again.");
    } finally {
      setCalculating(false);
    }
  };

  return (
    <main className="p-8 min-h-screen">
      <div className="mx-auto max-w-4xl">
        <div className="flex sm:flex-row flex-col justify-between items-center mb-8">
          <h1 className="mb-4 sm:mb-0 font-bold text-3xl">Speed Test</h1>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Info className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Understanding Speed Units</DialogTitle>
                  <DialogDescription>
                    <p className="mt-4">
                      <strong>Mbps (Megabits per second):</strong> This is the standard unit used by internet service providers. 1 Mbps = 1,000,000 bits per second.
                    </p>
                    <p className="mt-2">
                      <strong>MBps (Megabytes per second):</strong> This unit is commonly used for file downloads. 1 MBps = 8 Mbps.
                    </p>
                    <p className="mt-2">
                      For example, a 100 Mbps connection equals 12.5 MBps, meaning you can download a 12.5 MB file in one second.
                    </p>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <History className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Speed Test History</DialogTitle>
                  <DialogDescription>
                    Last 7 speed test results
                  </DialogDescription>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Download (Mbps)</TableHead>
                      <TableHead>Upload (Mbps)</TableHead>
                      <TableHead>Download (MBps)</TableHead>
                      <TableHead>Upload (MBps)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map((test, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date(test.timestamp).toLocaleString()}</TableCell>
                        <TableCell>{test.downloadSpeed?.toFixed(2) ?? 'N/A'}</TableCell>
                        <TableCell>{test.uploadSpeed?.toFixed(2) ?? 'N/A'}</TableCell>
                        <TableCell>{test.downloadSpeed ? (test.downloadSpeed / 8).toFixed(2) : 'N/A'}</TableCell>
                        <TableCell>{test.uploadSpeed ? (test.uploadSpeed / 8).toFixed(2) : 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>

            <ThemeToggle />
          </div>
        </div>

        <SpeedGauge speed={downloadSpeed} calculating={calculating} />

        <div className="flex justify-center mt-8">
          <Button
            size="lg"
            onClick={testSpeed}
            disabled={calculating}
            className="w-full max-w-md"
          >
            {calculating ? "Calculating Speed..." : "Test Again"}
          </Button>
        </div>
      </div>
    </main>
  );
}