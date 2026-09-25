const MODEL = process.env.QWEN_MODEL || "Qwen/Qwen3-Coder-Next";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const token = process.env.HF_TOKEN;
  if (!token) {
    return json(503, { error: "AI tutor is temporarily unavailable." });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON body." });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (!messages.length) {
    return json(400, { error: "At least one message is required." });
  }

  const safeMessages = messages.slice(-12).map((message) => ({
    role: message.role === "assistant" ? "assistant" : "user",
    content: String(message.content || "").slice(0, 6000)
  }));

  const mode = ["coach", "socratic", "debug", "quiz"].includes(body.mode) ? body.mode : "coach";
  const modeInstruction = {
    coach: "Coach mode: explain clearly, give progressive hints, and encourage the learner to write the code.",
    socratic: "Socratic mode: teach mainly by asking one useful question at a time. Avoid giving the solution unless the learner has genuinely tried.",
    debug: "Debugger mode: trace the bug systematically, ask what was expected versus observed, identify the smallest likely cause, and propose a test before a fix.",
    quiz: "Quiz mode: test the learner with short questions or tiny coding tasks. Do not reveal the answer until they attempt it."
  }[mode];

  const system = {
    role: "system",
    content:
      "You are the Coding Learning V2 AI Tutor. Teach Python accurately and patiently. " +
      modeInstruction + " " +
      "Adapt to the learner's level. Prefer active learning over giving complete solutions. " +
      "When code is shown, explain reasoning and suggest a test. Never pretend code was executed when it was not. " +
      `Current course: ${String(body.course || "unknown")}. Current lesson: ${String(body.lesson || "unknown")}.`
  };

  try {
    const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [system, ...safeMessages],
        stream: false,
        temperature: 0.35,
        max_tokens: 1200
      })
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      return json(response.status, { error: "AI tutor is temporarily unavailable." });
    }

    const message = payload?.choices?.[0]?.message?.content;
    if (!message) {
      return json(502, { error: "The model returned an empty response." });
    }

    return json(200, { message, model: MODEL });
  } catch (error) {
    return json(500, { error: "Could not reach the AI provider." });
  }
};

function json(statusCode, value) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(value)
  };
}