require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(express.json({ limit: "10kb" }));
app.use(express.static("public"));

app.post("/verify", async (req, res) => {
  try {
    const token = req.body?.token;
    if (!token || !process.env.TURNSTILE_SECRET_KEY) {
      return res.status(400).json({ success: false });
    }

    const formData = new URLSearchParams();
    formData.append("secret", process.env.TURNSTILE_SECRET_KEY);
    formData.append("response", token);

    if (req.ip) formData.append("remoteip", req.ip);

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: formData }
    );

    const result = await response.json();

    if (!result.success) {
      return res.status(403).json({ success: false });
    }

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`ARCH running on port ${PORT}`);
});
