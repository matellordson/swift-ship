import Email from "@/components/email/template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { user_id } = await request.json();
  try {
    const { data, error } = await resend.emails.send({
      from: "Swift Ship <onboarding@resend.dev>",
      to: ["snr.mn.lordson@gmail.com"],
      subject: "New Message",
      react: Email({ user_id }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
