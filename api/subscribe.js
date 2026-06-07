const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sendJson(response, statusCode, payload) {
  response.status(statusCode).json(payload);
}

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

async function readBody(request) {
  if (request.body && typeof request.body === "object") return request.body;

  const chunks = [];
  for await (const chunk of request) {
    chunks.push(Buffer.from(chunk));
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");
  const contentType = request.headers["content-type"] || "";

  if (contentType.includes("application/json")) {
    return rawBody ? JSON.parse(rawBody) : {};
  }

  const params = new URLSearchParams(rawBody);
  return Object.fromEntries(params.entries());
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendJson(response, 405, { ok: false, code: "method_not_allowed" });
  }

  let body;
  try {
    body = await readBody(request);
  } catch {
    return sendJson(response, 400, { ok: false, code: "invalid_body" });
  }

  const email = normalizeString(body.email).toLowerCase();
  const name = normalizeString(body.name);
  const locale = normalizeString(body.locale);
  const sourcePath = normalizeString(body.sourcePath);
  const honeypot = normalizeString(body.website);

  if (honeypot) {
    return sendJson(response, 200, { ok: true });
  }

  if (!emailPattern.test(email)) {
    return sendJson(response, 400, { ok: false, code: "invalid_email" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return sendJson(response, 503, { ok: false, code: "missing_resend_key" });
  }

  const resendResponse = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "omribz.me/1.0",
    },
    body: JSON.stringify({
      email,
      first_name: name || undefined,
      unsubscribed: false,
      properties: {
        source: "omribz.me",
        locale: locale || "unknown",
        source_path: sourcePath || "unknown",
      },
    }),
  });

  if (resendResponse.ok || resendResponse.status === 409) {
    return sendJson(response, 200, { ok: true });
  }

  return sendJson(response, 502, { ok: false, code: "resend_error" });
}
