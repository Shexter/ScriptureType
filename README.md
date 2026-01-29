# ═══════════════════════════════════════
#       ◇◇ ScriptureType ◇◇      
# ═══════════════════════════════════════

**A Catholic typing practice tool with Scripture, Creeds, and Prayers**

Refactoring in progress: the backend is being rebuilt on the open-source Bible API, and the frontend is being rebuilt from the open-source Monkeytype UI while I reshape it to my own style.

---

## Repository Layout (Current vs Target)

**Current layout**
- `backend/` → Kotlin Scripture API (verse data)
- `monkeytype/` → Monkeytype monorepo
  - `frontend/` → Monkeytype UI app
  - `backend/` → Monkeytype API (accounts/stats)
  - `docker/`, `docs/`, `packages/`
- `prototype/` + `old-prototype/` → historical UI prototypes

**Target layout (plan only, no moves yet)**
- `apps/frontend` → Monkeytype UI app
- `apps/monkeytype-api` → Monkeytype API (accounts/stats)
- `apps/verse-api` → Kotlin Scripture API
- `packages/` → shared tooling/config
- `docs/architecture/` → runbooks and structure

See the refactor plan for rationale and mapping: `plans/refactor-monorepo-plan.md`.

---

## What is ScriptureType?

A clean, distraction-free typing test that helps you:
- ✝️ Practice typing Scripture passages
- 🙏 Master Catholic prayers and creeds
- 📊 Track your WPM and accuracy
- 🎯 Choose timer or word-count mode

---

## Features

| Feature | Description |
|---------|-------------|
| 🎚️ **Two Modes** | Timer (15s-120s) or Word Count (10-100) |
| 📖 **Catholic Content** | Scripture, Nicene Creed, Hail Mary, and more |
| 🔤 **Smart Tracking** | WPM, accuracy, and verse reference display |
| 🎨 **Clean UI** | Minimalist design with golden accents |
| ⚡ **Instant Start** | Just type - no accounts needed |
| 🏆 **Learn More** | Context about each verse/prayer |

---

## Content Library

- **Bible Books:** Genesis, Psalm 23, John, Matthew, Proverbs
- **Catholic Creeds:** Nicene Creed (21 phrases), Apostles Creed (10 phrases)
- **Prayers:** Hail Mary, Glory Be, Lord's Prayer
- **Theology:** Catholic Theology section with key doctrinal verses

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/yourusername/scripturetype.git
cd scripturetype

# Prototype (simple HTML)
open prototype/index.html
```

Or serve the prototype with a local HTTP server from `prototype/`.

### Docker (Repo Compose)

For the Monkeytype frontend + backend using this repo’s code, use:

- `monkeytype/docker/docker-compose.yml`
- `monkeytype/docker/.env` (copy from `monkeytype/docker/example.env`)

Run from repo root:

```bash
docker compose -f monkeytype/docker/docker-compose.yml up -d --build
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Restart test |
| `Esc` | Restart test |
| `Any letter` | Start timer & begin typing |

---

## Tech Stack

- **Frontend:** Plain HTML/CSS/JS (no frameworks needed!)
- **Fonts:** JetBrains Mono
- **Design:** Dark theme with golden accents
- **Icons:** ✝️ ◇ 📖 🙏 🎯

---

## Contributing

Found a bug? Have a verse suggestion? 

1. Open an issue
2. Or submit a PR
3. Or just send me a message

All contributions welcome! 🙏

---

## License

MIT License - feel free to use, modify, and share!

---

## Credits

Built with ❤️ for Catholics who love typing and Scripture.

---

**Type. Pray. Improve.**

✝️ 📖 🙏
