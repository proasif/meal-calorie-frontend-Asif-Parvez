import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { dish_name, servings } = await req.json();

  if (!dish_name || !servings) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const servingsNum = Number(servings);
  const calories_per_serving = 280; // placeholder value
  const total_calories = calories_per_serving * servingsNum;

  return NextResponse.json({
    dish_name,
    servings: servingsNum,
    calories_per_serving,
    total_calories,
    source: 'Sample Data',
  });
}
