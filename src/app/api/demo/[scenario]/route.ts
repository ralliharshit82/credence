import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ scenario: string }> }
) {
  const { scenario } = await params;

  const scenarios: Record<string, string> = {
    verified: 'https://verified-demo.loanshield.local',
    quickrupee: 'https://quickrupee.demo',
  };

  if (!scenarios[scenario]) {
    return NextResponse.json(
      { error: 'Invalid scenario. Use verified or quickrupee.' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    scenario,
    url: scenarios[scenario],
    label: 'SYNTHETIC DEMO',
  });
}
