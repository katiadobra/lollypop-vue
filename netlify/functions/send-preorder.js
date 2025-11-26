import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({ region: process.env.SES_REGION || 'eu-central-1' });
const FROM = process.env.EMAIL_FROM;
const TO = process.env.EMAIL_TO;

function formatLine(item) {
  const parts = [];
  parts.push(item.name || item.id);
  if (item.boxSize) parts.push(`Size: ${item.boxSize} pcs`);
  if (item.flavor) parts.push(`Flavor: ${item.flavor}`);
  parts.push(`Qty: ${item.quantity}`);
  parts.push(`Unit: ${item.unitPrice}`);
  parts.push(`Line: ${item.lineTotal}`);
  return `- ${parts.join(' | ')}`;
}

function buildEmailBody(payload) {
  const lines = [];
  lines.push('New pre-order received:');
  lines.push('');
  lines.push(`Subtotal: ${payload.subtotal}`);
  lines.push(`Fulfilment: ${payload.fulfilment || 'n/a'}`);
  lines.push(`Date: ${payload.date || 'n/a'}`);
  lines.push(`Time: ${payload.time || 'n/a'}`);
  lines.push('');
  if (payload.contact) {
    lines.push(`Name: ${payload.contact.name || 'n/a'}`);
    lines.push(`Email: ${payload.contact.email || 'n/a'}`);
    lines.push(`Phone: ${payload.contact.phone || 'n/a'}`);
    lines.push('');
  }
  lines.push('Items:');
  payload.items.forEach((item) => lines.push(formatLine(item)));
  return lines.join('\n');
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (!FROM || !TO) {
    return { statusCode: 500, body: 'Email configuration missing' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (err) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    return { statusCode: 400, body: 'No items in order' };
  }

  const subject = `Pre-order (${payload.fulfilment || 'n/a'}) - ${payload.items.length} item(s)`;
  const text = buildEmailBody(payload);

  const command = new SendEmailCommand({
    Destination: { ToAddresses: [TO] },
    Message: {
      Body: { Text: { Data: text } },
      Subject: { Data: subject },
    },
    Source: FROM,
    ReplyToAddresses: payload.contact?.email ? [payload.contact.email] : undefined,
  });

  try {
    await ses.send(command);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error('SES send failed', err);
    return { statusCode: 500, body: 'Failed to send' };
  }
};
