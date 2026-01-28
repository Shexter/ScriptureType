# Quick Start Reference

> **Note:** Commands are for **zsh** shell (default on macOS).

## Prerequisites Check

```zsh
# Check Java version (need 11+)
java -version

# Check if Gradle wrapper exists
ls backend/gradlew
```

## Backend Commands

```zsh
# Navigate to backend
cd backend

# Build project
./gradlew clean build -x test

# Start server
./gradlew clean run

# Stop server
# Press Ctrl+C in the terminal running the server
```

## Frontend Commands

```zsh
# Navigate to prototype
cd prototype

# Start local server (Python 3)
python3 -m http.server 3000

# Or using Node.js
npx http-server -p 3000

# Open in browser
open http://localhost:3000
```

## Test Endpoints

```zsh
# Health check
curl http://localhost:8080/

# Load chapter (PRD endpoint)
curl http://localhost:8080/api/cpdv/v1/typing/chapter/OT/Psalms/116

# Load notes
curl http://localhost:8080/api/cpdv/v1/notes/OT/Psalms/116

# Random verse (legacy)
curl http://localhost:8080/api/cpdv/v1/typing/verse
```

## Common Issues

**Port 8080 in use:**
```zsh
lsof -i :8080
kill -9 <PID>
```

**Java not found:**
```zsh
# macOS (zsh) - temporary
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export PATH="$JAVA_HOME/bin:$PATH"

# Make permanent (add to ~/.zshrc)
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
echo 'export PATH="$JAVA_HOME/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

**CORS errors:**
- Use HTTP server, don't open HTML file directly

## Full Setup Guide

See `SETUP_GUIDE.md` for detailed instructions.
