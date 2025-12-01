import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add webhook secret in env");
  }

  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    return new Response("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;

 // Handling 'user.created' event
  if (eventType === "user.created") {
  try {
    const data: any = evt.data;

    const emailAddresses = Array.isArray(data.email_addresses)
      ? data.email_addresses
      : [];

    // Fallback logic
    const primaryEmail =
      emailAddresses.find(
        (email: any) => email.id === data.primary_email_address_id
      ) ?? emailAddresses[0]; // fallback to first email

    console.log("Primary email:", primaryEmail?.email_address);
    console.log("All emails:", emailAddresses);

    if (!primaryEmail) {
      return new Response("No email found", { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        id: data.id!,
        email: primaryEmail.email_address, // required
        isSubscribed: false,
      },
    });

    console.log("New user created:", newUser);
  } catch (error) {
    console.error("Error creating user in DB:", error);
    return new Response("Error creating user", { status: 500 });
  }
}


  return new Response("Webhook received successfully", { status: 200 });
}
