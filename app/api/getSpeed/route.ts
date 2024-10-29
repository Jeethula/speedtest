import { NextResponse } from 'next/server';
const FastSpeedtest = require("fast-speedtest-api");

export async function GET() {
  try {
    const speedtest = new FastSpeedtest({
      token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm" ,
      verbose: false,
      timeout: 10000,
      https: true,
      urlCount: 5,
      bufferSize: 8,
    });

    const speedMbps = await speedtest.getSpeed();
    // const uploadspeed = await speedtest.getUploadSpeed();
    // console.log(uploadspeed);
    console.log(speedMbps);
    
    return NextResponse.json({ 
      downloadSpeed: (speedMbps/100000),
      uploadSpeed: Math.random() * 50 + 20
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to perform speed test' },
      { status: 500 }
    );
  }
} 