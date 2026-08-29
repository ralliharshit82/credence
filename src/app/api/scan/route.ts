import { NextRequest, NextResponse } from 'next/server';
import { analyzeLender } from '@/lib/risk-engine/engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, scenarioId } = body;

    if (!url && !scenarioId) {
      return NextResponse.json(
        { error: 'Missing required field: url or scenarioId' },
        { status: 400 }
      );
    }

    const assessment = analyzeLender({ url, scenarioId });
    return NextResponse.json(assessment, { status: 200 });
  } catch (error) {
    console.error('Scan API error:', error);
    return NextResponse.json(
      { error: 'Failed to process risk assessment' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const url = searchParams.get('url');
  const scenarioId = searchParams.get('scenarioId');

  const assessment = analyzeLender({
    url: url || undefined,
    scenarioId: scenarioId || undefined,
  });

  return NextResponse.json(assessment);
}
