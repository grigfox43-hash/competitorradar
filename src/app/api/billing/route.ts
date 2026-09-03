import { NextRequest, NextResponse } from 'next/server';
import { db, PLAN_LIMITS } from '@/lib/db';
import { PlanType } from '@/lib/types';

export async function GET(req: NextRequest) {
  try {
    const user = await db.getUser();
    return NextResponse.json({
      plan: user.plan,
      plan_status: user.plan_status,
      limits: PLAN_LIMITS[user.plan],
      allPlans: PLAN_LIMITS,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetPlan } = body;

    if (!['solopreneur', 'business', 'enterprise'].includes(targetPlan)) {
      return NextResponse.json({ error: 'Некорректный тарифный план' }, { status: 400 });
    }

    const updated = await db.updateUserPlan(targetPlan as PlanType, 'active');

    return NextResponse.json({
      success: true,
      user: updated,
      message: `Тариф успешно изменён на ${PLAN_LIMITS[targetPlan as PlanType].name}!`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
