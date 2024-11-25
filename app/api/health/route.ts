import { NextResponse } from 'next/server';
import dbConnect from '@/app/clients/mongodb';

export async function GET() {
  try {
    const readyState = mongoose.connection.readyState;

    if (readyState === 1) {
      return NextResponse.json({ status: 'healthy', db: 'connected' }, { status: 200 });
    } else {
      return NextResponse.json(
        { status: 'unhealthy', db: 'disconnected', debug: { readyState } },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { status: 'unhealthy', db: 'error', message: error.message },
      { status: 500 }
    );
  }
}
