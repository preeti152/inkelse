import { NextResponse } from 'next/server';

/**
 * POST /api/quote — receives the "Let's Get Started" form submission.
 *
 * V1 implementation: logs to server console + returns success.
 * V2 will:
 *  - Persist to Supabase `quote_requests` table
 *  - Send WhatsApp + email notification to admin via Resend / WhatsApp Cloud API
 */
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, company, message } = data ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields (name, email, message).' },
        { status: 400 },
      );
    }

    // V1 — just log it for now.
    console.log('[QUOTE REQUEST]', {
      name,
      email,
      phone: phone ?? null,
      company: company ?? null,
      message,
      receivedAt: new Date().toISOString(),
    });

    // TODO Phase 4:
    // await supabase.from('quote_requests').insert({ name, email, phone, company, message });
    // await resend.emails.send({ to: adminEmail, subject: 'New quote', html: ... });

    return NextResponse.json({ ok: true, message: 'Received' });
  } catch (err) {
    console.error('[QUOTE REQUEST ERROR]', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
