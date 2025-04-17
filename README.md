# 🕵️‍♂️ Email Pixel Tracker — Cloudflare Worker Edition

Ever wanted to know *who* opened your emails, *when*, and from *where* — without looking like an evil supervillain?

Well... too bad. You **are** one now 😈

This is a **1x1 pixel email tracking service** disguised as an innocent PNG image, running entirely on **Cloudflare Workers** + **D1**. So lightweight, it makes SMTP jealous.

---

## 💡 What It Does

- Accepts requests like `/gallery/abc123.png`
- Logs who opened the email: UID, IP (kinda), UA, and Referer
- Stores it in Cloudflare D1 (SQLite in the sky)
- Returns a transparent 1x1 PNG so tiny even Gmail says "meh"
- Pretends to be Amazon S3 when things go wrong (404s never looked so corporate)

---

## 🖼️ How to Use

Put this into your email's HTML body like a stealthy ninja:

```html
<img src="https://your-domain.com/gallery/abc123.png" width="1" height="1" style="display:none;" alt="">
```

That's it. Every time someone opens your email, your Worker goes:

📬 *"Ah, someone blinked at us. Let’s write that down."*

---

## 🧠 Tech Stack

- Cloudflare Workers (serverless sneakiness)
- D1 (SQLite but ✨ on the edge ✨)
- 1 PNG (base64, transparent, glorious)
- Zero shame

---

## 🧪 Example Output (in your logs)

```
[2025-04-16T23:10:12.834Z] Tracking hit: uid=abc123, ip=203.0.113.4
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Referer: https://mail.google.com/
```

---

## 🧯 But… is this ethical?

Yes. No. Maybe. Probably depends on whether you tell your users you're doing it.
Just don’t be weird about it.

---

## 🛡️ Disclaimer

This project is for educational purposes only. Use responsibly. Don’t get sued.
Also: Gmail might cache images. Outlook might ghost you.
Trust issues are part of email relationships.

---

## 🧃 Bonus Features?

Want a dashboard? Campaign support? Click tracking? Real-time confetti when someone opens an email?

[Open an issue](https://github.com/you/email-tracker/issues) or bribe the dev with bubble tea. 🧋

---

## 👋 License

MIT. Track freely, my friend.
```

---

你要不要我给它配一个爆改的 logo？比如一张 1x1 px 的图片截图，然后写上 "world's tiniest backend"? 😂
