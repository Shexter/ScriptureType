# Local Testing Environment Setup Guide

This guide will walk you through setting up your local environment to test the ScriptureType backend and frontend prototype, plus the Monkeytype UI via Docker from this repo.

> **Note:** This guide is written for **zsh** shell (default on macOS Catalina and later). All commands use `zsh` syntax. If you're using bash, most commands will work the same, but environment variable setup may differ.

## Prerequisites

### 1. Java Development Kit (JDK)

The backend requires **Java 11 or higher**.

#### Check if Java is installed:
```zsh
java -version
```

#### Install Java (if needed):

**macOS (using Homebrew):**
```zsh
brew install openjdk@11
# Or for Java 17 (recommended)
brew install openjdk@17

# Add to your ~/.zshrc file (zsh shell)
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
echo 'export PATH="$JAVA_HOME/bin:$PATH"' >> ~/.zshrc

# Reload your zsh configuration
source ~/.zshrc
```

**macOS (using SDKMAN - recommended):**
```zsh
# Install SDKMAN (works with zsh)
curl -s "https://get.sdkman.io" | zsh
source "$HOME/.sdkman/bin/sdkman-init.sh"

# Install Java 17
sdk install java 17.0.9-tem

# Set as default
sdk default java 17.0.9-tem
```

**Linux (Ubuntu/Debian):**
```zsh
sudo apt update
sudo apt install openjdk-11-jdk
# Or for Java 17
sudo apt install openjdk-17-jdk

# Verify installation
java -version
```

**Windows:**
1. Download OpenJDK from [Adoptium](https://adoptium.net/)
2. Install Java 11 or 17
3. Set `JAVA_HOME` environment variable:
   - `JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot`
   - Add `%JAVA_HOME%\bin` to your PATH

### 2. Gradle (Optional)

The project includes a Gradle Wrapper, so you don't need to install Gradle separately. However, if you want to install it:

**macOS (zsh):**
```zsh
brew install gradle
```

**Linux:**
```zsh
sudo apt install gradle
```

**Windows:**
```powershell
choco install gradle
# Or download from https://gradle.org/install/
```

### 3. Network Access

The backend needs internet access to download:
- Bible data from GitHub (CPDV and Vulgate JSON files)
- Maven dependencies during build

Make sure your firewall allows outbound connections.

## Backend Setup (Kotlin Verse API)

### Step 1: Navigate to Backend Directory

```zsh
cd /Users/timothylauw/Documents/Github\ Repos/typescripture/backend
```

### Step 2: Verify Java Installation

```zsh
java -version
# Should show version 11 or higher
```

### Step 3: Make Gradle Wrapper Executable (if needed)

```zsh
chmod +x gradlew
```

### Step 4: Test Build (Optional but Recommended)

This will download dependencies and verify everything compiles:

```zsh
./gradlew clean build -x test
```

**Expected output:**
- Downloads Gradle wrapper (first time only)
- Downloads Maven dependencies
- Compiles all Kotlin source files
- Creates JAR files

**If you see errors:**
- Check Java version: `java -version` should show 11+
- Check network connection (needs to download dependencies)
- Try: `./gradlew --refresh-dependencies clean build -x test`

### Step 5: Start the Backend Server

```zsh
./gradlew clean run
```

**Expected output:**
```
> Task :server:run
Starting Biblia Sacra Vulgata server...
Server started on port 8080
```

**What happens:**
1. Server starts on `http://localhost:8080`
2. Downloads Bible data from GitHub (CPDV and Vulgate JSON)
3. Loads data into in-memory database
4. Ready to accept requests

**First startup may take 30-60 seconds** while downloading Bible data.

### Step 6: Verify Backend is Running

Open a new terminal and test the health endpoint:

```zsh
curl http://localhost:8080/
```

**Expected response:**
```
Gloria Patri, et filio, et spiritui sancto in saecula saeculorum! Biblia Sacra Vulgata is UP!!
```

## Frontend Setup (Prototype)

The frontend prototype is a simple HTML file that doesn't require any build process.

### Step 1: Open the Prototype

**Option A: Direct File Open**
1. Navigate to: `/Users/timothylauw/Documents/Github Repos/typescripture/prototype/`
2. Double-click `index.html`
3. Opens in your default browser

**Option B: Local HTTP Server (Recommended)**

Using Python 3:
```zsh
cd /Users/timothylauw/Documents/Github\ Repos/typescripture/prototype
python3 -m http.server 3000
```

Then open: `http://localhost:3000`

Using Node.js (http-server):
```zsh
npm install -g http-server
cd /Users/timothylauw/Documents/Github\ Repos/typescripture/prototype
http-server -p 3000
```

### Step 2: Test Frontend Connection

1. Make sure backend is running (`./gradlew clean run` in backend directory)
2. Open the prototype in browser
3. You should see the interface without errors
4. Try clicking "Random Verse" button to test the connection

## Testing the Endpoints (Verse API)

### Using curl (Command Line)

**1. Health Check:**
```zsh
curl http://localhost:8080/
```

**2. Load a Chapter (PRD-aligned endpoint):**
```zsh
curl http://localhost:8080/api/cpdv/v1/typing/chapter/OT/Psalms/116
```

**Expected response:**
```json
{
  "ref": {
    "t": "OT",
    "b": "Psalms",
    "c": 116
  },
  "vs": [
    { "v": 1, "tx": "Alleluia. All nations, praise the Lord..." },
    { "v": 2, "tx": "For his mercy has been confirmed..." }
  ],
  "hash": "sha256:abc123..."
}
```

**3. Load Notes:**
```zsh
curl http://localhost:8080/api/cpdv/v1/notes/OT/Psalms/116
```

**4. Test ETag Caching:**
```zsh
# First request - save the ETag from headers
curl -v http://localhost:8080/api/cpdv/v1/typing/chapter/OT/Psalms/116 2>&1 | grep -i etag

# Second request with If-None-Match (should return 304 Not Modified)
curl -v -H "If-None-Match: sha256:abc123..." http://localhost:8080/api/cpdv/v1/typing/chapter/OT/Psalms/116
```

**5. Random Verse (Legacy endpoint):**
```zsh
curl http://localhost:8080/api/cpdv/v1/typing/verse
```

### Using the Frontend Prototype

1. **Load a Chapter:**
   - Select Testament: "Old Testament" or "New Testament"
   - Enter Book name: e.g., "Psalms", "Matthew", "John"
   - Enter Chapter number: e.g., 116, 1, 3
   - Click "Load Chapter"
   - Should display verses in the text area

2. **Load Random Verse:**
   - Click "Random Verse" button
   - Should display a random verse

3. **Check Status:**
   - Look at the "Status" stat box
   - Should show "Loaded" when successful
   - Shows ETag information if available

## Monkeytype UI (Docker from this repo)

This uses the compose file in `monkeytype/docker/docker-compose.yml` so the Docker build pulls **this repo’s** Monkeytype UI and backend.

### Step 1: Prepare .env

```zsh
cd /Users/timothylauw/Documents/Github\ Repos/typescripture/monkeytype/docker
cp example.env .env
```

If the Kotlin verse API is running on your host at `http://localhost:8080`, keep:

```
SCRIPTURE_API_URL=http://host.docker.internal:8080
```

### Step 2: Build and run

From repo root:

```zsh
cd /Users/timothylauw/Documents/Github\ Repos/typescripture
docker compose -f monkeytype/docker/docker-compose.yml up -d --build
```

### Step 3: Open the UI

Open: `http://localhost:8080`

If you see the default Monkeytype UI after edits, rebuild with `--no-cache`:

```zsh
docker compose -f monkeytype/docker/docker-compose.yml build --no-cache
docker compose -f monkeytype/docker/docker-compose.yml up -d
```

## Troubleshooting

### Backend Won't Start

**Problem: Java not found**
```zsh
Error: JAVA_HOME is not set
```
**Solution:**
```zsh
# macOS (zsh)
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export PATH="$JAVA_HOME/bin:$PATH"

# Add to ~/.zshrc to make permanent
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
echo 'export PATH="$JAVA_HOME/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Linux
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH="$JAVA_HOME/bin:$PATH"

# Verify
echo $JAVA_HOME
java -version
```

**Problem: Port 8080 already in use**
```bash
Error: Address already in use
```
**Solution:**
```zsh
# Find what's using port 8080
lsof -i :8080

# Kill the process (replace PID with actual process ID)
kill -9 <PID>

# Or change port in application.json
# Edit: backend/utils/config/src/main/resources/application.json
# Change "port": 8080 to another port like 8081
```

**Problem: Network error downloading Bible data**
```
Failed to download CPDV data
```
**Solution:**
- Check internet connection
- Verify URLs in `application.json` are accessible
- Try accessing URLs directly in browser:
  - https://raw.githubusercontent.com/aseemsavio/Latin-Vulgate-English-Translation-JSON/master/Generated-JSON/Bibles/cpdv.json

### Frontend Can't Connect to Backend

**Problem: CORS errors in browser console**
```
Access to fetch at 'http://localhost:8080/...' from origin 'file://' has been blocked by CORS policy
```
**Solution:**
- Use a local HTTP server instead of opening file directly
- Run: `python3 -m http.server 3000` in prototype directory
- Access via: `http://localhost:3000`

**Problem: Connection refused**
```
Failed to fetch: net::ERR_CONNECTION_REFUSED
```
**Solution:**
- Verify backend is running: `curl http://localhost:8080/`
- Check backend terminal for errors
- Verify port matches (default is 8080)

### Build Errors

**Problem: Gradle wrapper download fails**
```
Could not download gradle-wrapper.jar
```
**Solution:**
```zsh
# Manually download wrapper
cd backend
./gradlew wrapper --gradle-version 7.0
```

**Problem: Dependency download fails**
```
Could not resolve all dependencies
```
**Solution:**
```zsh
# Refresh dependencies
./gradlew --refresh-dependencies clean build

# Check network/firewall settings
# Verify Maven Central is accessible
```

## Quick Start Checklist

- [ ] Java 11+ installed and verified (`java -version`)
- [ ] Navigated to backend directory
- [ ] Made gradlew executable (`chmod +x gradlew`)
- [ ] Built project (`./gradlew clean build -x test`)
- [ ] Started backend (`./gradlew clean run`)
- [ ] Verified health endpoint (`curl http://localhost:8080/`)
- [ ] Opened frontend prototype (via HTTP server)
- [ ] Tested loading a chapter
- [ ] Tested random verse endpoint

## Development Tips

### Running Backend in Background

```zsh
# Start backend in background
./gradlew clean run > backend.log 2>&1 &

# Check if running
ps aux | grep gradle

# View logs
tail -f backend.log

# Stop backend
pkill -f gradle
```

### Hot Reload (Development)

The backend doesn't have hot reload by default. To see changes:
1. Stop the server (Ctrl+C)
2. Rebuild: `./gradlew clean build -x test`
3. Restart: `./gradlew clean run`

### Testing Different Books/Chapters

Common test cases:
- **Psalms 116** (OT) - Short chapter
- **Psalms 119** (OT) - Very long chapter (tests payload size)
- **Matthew 1** (NT) - Genealogy chapter
- **John 1** (NT) - Prologue
- **Genesis 1** (OT) - Creation account

### Monitoring Performance

```zsh
# Time the response
time curl http://localhost:8080/api/cpdv/v1/typing/chapter/OT/Psalms/116

# Check response size
curl -s http://localhost:8080/api/cpdv/v1/typing/chapter/OT/Psalms/116 | wc -c
```

## Next Steps

Once everything is working:
1. Test all endpoints from the PRD
2. Verify ETag caching works correctly
3. Test with various books and chapters
4. Check payload sizes meet PRD targets (<= 25KB)
5. Measure response times (target: p50 <= 50ms, p95 <= 150ms)
6. Integrate with the full Monkeytype frontend

## Getting Help

If you encounter issues:
1. Check backend logs for error messages
2. Verify all prerequisites are installed correctly
3. Check network connectivity
4. Review the `IMPLEMENTATION_SUMMARY.md` for API details
5. Check the PRD document for expected behavior
