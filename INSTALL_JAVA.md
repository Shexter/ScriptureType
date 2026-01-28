# Installing Java on macOS (zsh)

This guide will help you install Java on macOS and configure it for zsh.

## Quick Install (Recommended)

### Option 1: Using Homebrew (Easiest)

```zsh
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Java 17 (recommended)
brew install openjdk@17

# Link it so it's available system-wide
sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk

# Add to your ~/.zshrc
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
echo 'export JAVA_HOME="/opt/homebrew/opt/openjdk@17"' >> ~/.zshrc

# Reload your shell configuration
source ~/.zshrc

# Verify installation
java -version
```

**Expected output:**
```
openjdk version "17.0.x" 2024-xx-xx
OpenJDK Runtime Environment (build 17.0.x+x)
OpenJDK 64-Bit Server VM (build 17.0.x+x, mixed mode, sharing)
```

### Option 2: Using SDKMAN (Best for managing multiple Java versions)

```zsh
# Install SDKMAN
curl -s "https://get.sdkman.io" | zsh

# Reload your shell or run:
source "$HOME/.sdkman/bin/sdkman-init.sh"

# Install Java 17
sdk install java 17.0.9-tem

# Set as default
sdk default java 17.0.9-tem

# Verify installation
java -version
```

### Option 3: Manual Download (If Homebrew/SDKMAN don't work)

1. **Download OpenJDK:**
   - Visit: https://adoptium.net/
   - Select: macOS, x64, JDK 17, .pkg installer
   - Download and install the .pkg file

2. **Configure zsh:**
   ```zsh
   # Find where Java was installed (usually)
   /usr/libexec/java_home -V
   
   # Add to ~/.zshrc (replace with actual path from above command)
   echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
   echo 'export PATH="$JAVA_HOME/bin:$PATH"' >> ~/.zshrc
   
   # Reload shell
   source ~/.zshrc
   
   # Verify
   java -version
   ```

## Troubleshooting

### Check if Java is installed but not in PATH

```zsh
# Check what Java versions are available
/usr/libexec/java_home -V

# If you see output, Java is installed but PATH isn't set
# Use one of the methods above to add it to ~/.zshrc
```

### Verify JAVA_HOME is set

```zsh
# Check if JAVA_HOME is set
echo $JAVA_HOME

# If empty, add to ~/.zshrc:
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
source ~/.zshrc
```

### Check your current shell

```zsh
# Verify you're using zsh
echo $SHELL

# Should show: /bin/zsh or /usr/bin/zsh
# If not, switch to zsh:
chsh -s /bin/zsh
```

### After installing, verify everything works

```zsh
# Check Java version
java -version

# Check JAVA_HOME
echo $JAVA_HOME

# Check javac (Java compiler)
javac -version

# All should work without errors
```

## Quick Test

After installation, test with Gradle:

```zsh
cd /Users/timothylauw/Documents/Github\ Repos/typescripture/backend
./gradlew --version
```

This should show Gradle version and confirm Java is working.

## Still Having Issues?

1. **Restart your terminal** after installing Java
2. **Check ~/.zshrc** - make sure the export lines are there:
   ```zsh
   cat ~/.zshrc | grep JAVA
   ```
3. **Try a new terminal window** - sometimes environment variables don't reload properly
4. **Check Homebrew installation** (if using Homebrew):
   ```zsh
   brew --version
   brew list | grep openjdk
   ```
