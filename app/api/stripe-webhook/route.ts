import Stripe from "stripe";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    if (
      event.type === "checkout.session.completed" ||
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated"
    ) {
      const session = event.data.object as Stripe.Checkout.Session;

      const customerId =
        typeof session.customer === "string" ? session.customer : null;
      const subscriptionId =
        typeof session.subscription === "string" ? session.subscription : null;

      const userId = session.metadata?.user_id ?? null;

      if (customerId && subscriptionId && userId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        const { error } = await supabaseAdmin.from("subscribers").upsert(
          {
            user_id: userId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            status: subscription.status,
          },
          { onConflict: "user_id" }
        );

        if (error) {
          console.error("Supabase upsert error:", error);
          return new Response("Database error", { status: 500 });
        }
      }
    }

    return new Response("ok", { status: 200 });
  } catch (err: any) {
    console.error("Webhook handler error:", err);
    return new Response("Webhook handler failed", { status: 500 });
  }
}