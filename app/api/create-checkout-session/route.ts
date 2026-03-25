import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      metadata: {
        user_id: userId,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
    });

    return Response.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return Response.json(
      { error: error?.message || "Failed to create checkout session." },
      { status: 500 }
    );
  }
}