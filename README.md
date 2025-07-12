# 🎮 Game Meta Assistant (Powered by Gemini AI)

Welcome to the ultimate game strategy assistant! ✨  
This web-based tool is designed to deliver lightning-fast, focused advice on **game builds**, **meta tips**, and **strategies** using Google's Gemini API. Whether you're battling in the jungle or dominating the mid lane, this assistant knows what's hot — and what's just patch history. 🚀

---

## 🧩 What It Does

- 📌 Connects to **Gemini 2.0 Flash** for game expertise
- 🔍 Responds to questions about game meta, builds, and tips
- 📚 Follows strict formatting and patch rules
- 🧠 Filters out non-game-related questions
- 💬 Returns responses in Markdown and converts to HTML

---

## ⚙️ Tech Stack

| Feature                | Technology               |
|------------------------|--------------------------|
| UI/DOM                | JavaScript (Vanilla)     |
| API Integration        | Gemini Language API      |
| Response Formatting    | Markdown ➡️ HTML (`Showdown.js`) |
| Form Handling & Events | HTML5 + JS               |

---

## 📜 How It Works

1. User enters:
   - Game title
   - Question
   - API key
2. The app sends a structured prompt with game context
3. Gemini responds with concise Markdown (500 characters max!)
4. Response is rendered beautifully in the UI 🖼️

```js
const markdownToHTML = (text) => {
    const converter = new showdown.Converter();
    return converter.makeHTML(text);
}
```

---

## 🛡️ Prompt Rules

- No fluff: "Respond only with useful info"
- Honesty check: "Don't invent if you're unsure"
- Patch awareness: "Only mention what exists in current meta"
- Formatting flair: Markdown responses make strategy **pop!** 🎯

---

## 🚨 Example Input

> Game: League of Legends  
> Question: Best jungle build for Rengar?

✅ You'll get something like:

```markdown
**Itens:** Eclipse, Essence Reaver, Collector  
**Runas:** First Strike, Sudden Impact  
Patch: 14.7
```

---

## 🔐 Security Notes

This project requires a **Gemini API key** for requests.  
Make sure to keep your key private and don’t expose it in public repos!

---

## 🙋 Author’s Note

I created this project to learn more about LLMs, real-time form handling, and markdown rendering — all while helping gamers optimize their play! Got tips, feedback, or memes? I'm all ears. 🎧

---

## 📄 License

MIT — Free to use, remix, and conquer your ranked games.
