import nodemailer from "nodemailer";

// Configure your email service here
// For development, you can use Ethereal Email (nodemailer's testing service)
// For production, use services like SendGrid, Gmail, or other SMTP providers

async function getTransporter() {
  // If you want to use a real email service, uncomment and configure:
  
  // Option 1: Using SendGrid
  // return nodemailer.createTransport({
  //   host: "smtp.sendgrid.net",
  //   port: 587,
  //   auth: {
  //     user: "apikey",
  //     pass: process.env.SENDGRID_API_KEY,
  //   },
  // });

  // Option 2: Using Gmail
  // return nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: process.env.GMAIL_USER,
  //     pass: process.env.GMAIL_PASSWORD,
  //   },
  // });

  // Option 3: Using a custom SMTP server
  // return nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: process.env.SMTP_PORT,
  //   secure: true,
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASSWORD,
  //   },
  // });

  // For development/testing, use Ethereal Email
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Get transporter
    const transporter = await getTransporter();

    // Email to your team
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL || "noreply@nextjs-starter.com",
      to: process.env.CONTACT_EMAIL || "contact@nextjs-starter.com",
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: email,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL || "noreply@nextjs-starter.com",
      to: email,
      subject: "We received your message",
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message summary:</strong></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>Best regards,<br>The Next.js Starter Team</p>
      `,
    });

    return Response.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
