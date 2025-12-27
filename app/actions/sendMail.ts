"use server"

import nodemailer from "nodemailer"

export async function sendMail(data: {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
}) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const fullName = `${data.firstName} ${data.lastName}`

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: data.email,
      subject: `[${data.subject}] ${fullName}`,

      /* ---------- TEXT FALLBACK ---------- */
      text: `
New contact form submission

Name: ${fullName}
Email: ${data.email}
Phone: ${data.phone}
Subject: ${data.subject}

Message:
${data.message}
      `.trim(),

      /* ---------- HTML EMAIL UI ---------- */
      html: `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#0b0f0d;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:30px 16px;">
          <table width="100%" max-width="600" cellpadding="0" cellspacing="0"
            style="background:#041b13;border-radius:16px;border:1px solid rgba(16,185,129,0.25);">

            <!-- HEADER -->
            <tr>
              <td style="padding:24px 24px 12px;">
                <h2 style="margin:0;color:#34d399;font-size:20px;">
                  New Contact Message
                </h2>
                <p style="margin:6px 0 0;color:#9ca3af;font-size:14px;">
                  Portfolio Contact Form
                </p>
              </td>
            </tr>

            <!-- CONTENT -->
            <tr>
              <td style="padding:16px 24px;">
                <table width="100%" cellpadding="0" cellspacing="0">

                  ${infoRow("Name", fullName)}
                  ${infoRow("Email", data.email)}
                  ${infoRow("Phone", data.phone)}
                  ${infoRow("Subject", data.subject)}

                </table>
              </td>
            </tr>

            <!-- MESSAGE -->
            <tr>
              <td style="padding:16px 24px;">
                <p style="margin:0 0 8px;color:#9ca3af;font-size:13px;">
                  Message
                </p>
                <div style="
                  background:#020617;
                  border-radius:12px;
                  padding:16px;
                  color:#e5e7eb;
                  font-size:14px;
                  line-height:1.6;
                  border:1px solid rgba(255,255,255,0.08);
                ">
                  ${escapeHtml(data.message).replace(/\n/g, "<br/>")}
                </div>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="padding:20px 24px;color:#6b7280;font-size:12px;text-align:center;">
                Reply directly to this email to respond to the sender.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
      `,
    })

    return { success: true }
  } catch (err) {
    console.error("Mail error:", err)
    return { success: false }
  }
}

/* ---------- HELPERS ---------- */

function infoRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:6px 0;color:#9ca3af;font-size:13px;width:120px;">
        ${label}
      </td>
      <td style="padding:6px 0;color:#e5e7eb;font-size:14px;">
        ${escapeHtml(value)}
      </td>
    </tr>
  `
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
