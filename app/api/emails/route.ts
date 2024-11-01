import Email from "@/components/email/template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { user } = await request.json();
  try {
    const { data, error } = await resend.emails.send({
      from: "Swift Ship <onboarding@resend.dev>",
      to: ["swiftshiplogistics00@gmail.com", "snr.mn.lordson@gmail.com"],
      subject: "New message",
      react: Email({ user }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
