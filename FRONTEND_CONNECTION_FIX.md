# Frontend Connection Troubleshooting

## Issue: Frontend shows "Failed to fetch" but curl works

This means the backend is running correctly, but the browser can't connect due to CORS or browser security policies.

## Quick Fix Steps

### 1. Restart Backend with CORS Enabled

The backend code has CORS support, but you need to restart it:

```zsh
# In your backend terminal, press Ctrl+C to stop
# Then restart:
cd /Users/timothylauw/Documents/Github\ Repos/typescripture/backend
./gradlew clean run
```

**Look for these messages:**
```
✅ Server started successfully on port 8080
✅ CORS enabled for frontend access
```

### 2. Verify Frontend is Served via HTTP (NOT file://)

**❌ WRONG - Opening file directly:**
```
file:///Users/timothylauw/Documents/Github Repos/typescripture/prototype/index.html
```
This will **always fail** due to CORS restrictions.

**✅ CORRECT - Using HTTP server:**
```zsh
cd /Users/timothylauw/Documents/Github\ Repos/typescripture/prototype
python3 -m http.server 3000
```

Then open: `http://localhost:3000`

### 3. Check Browser Console

Open browser Developer Tools (F12 or Cmd+Option+I) and check:

**Console Tab:**
- Look for CORS errors
- Look for network errors
- Check if requests are being made

**Network Tab:**
- Reload the page
- Look for requests to `http://localhost:8080`
- Check if they're blocked (red) or successful (green)
- Click on failed requests to see error details

### 4. Test CORS Manually

Open browser console and run:
```javascript
fetch('http://localhost:8080/')
  .then(r => r.text())
  .then(console.log)
  .catch(console.error)
```

**If you see CORS error:**
- Backend CORS isn't working
- Need to restart backend

**If you see connection error:**
- Backend might not be running
- Check with: `curl http://localhost:8080/`

## Common Issues

### Issue 1: CORS Error in Console
```
Access to fetch at 'http://localhost:8080/...' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

**Solution:**
1. Restart backend (CORS was just added)
2. Verify backend shows "✅ CORS enabled" message
3. Clear browser cache and reload

### Issue 2: Mixed Content Error
```
Mixed Content: The page at 'https://...' was loaded over HTTPS, but requested 
an insecure resource 'http://localhost:8080'
```

**Solution:**
- Make sure you're using `http://localhost:3000` (not https://)
- If using a service like GitHub Pages, you'll need HTTPS backend or a proxy

### Issue 3: Connection Refused
```
Failed to fetch: net::ERR_CONNECTION_REFUSED
```

**Solution:**
- Verify backend is running: `curl http://localhost:8080/`
- Check backend terminal for errors
- Verify port 8080 is correct

### Issue 4: Browser Cache
Old JavaScript might be cached.

**Solution:**
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Or open DevTools → Network tab → Check "Disable cache"
- Or clear browser cache completely

## Verification Checklist

- [ ] Backend shows "✅ CORS enabled" message
- [ ] Frontend is accessed via `http://localhost:3000` (not file://)
- [ ] Browser console shows no CORS errors
- [ ] Network tab shows successful requests to `localhost:8080`
- [ ] `curl http://localhost:8080/` works
- [ ] Browser cache cleared

## Test Commands

```zsh
# 1. Test backend health
curl http://localhost:8080/

# 2. Test CORS headers
curl -v -H "Origin: http://localhost:3000" http://localhost:8080/ 2>&1 | grep -i "access-control"

# Should see:
# < access-control-allow-origin: *
# < access-control-allow-credentials: true

# 3. Test API endpoint
curl http://localhost:8080/api/cpdv/v1/typing/chapter/OT/Psalms/116
```

## Still Not Working?

1. **Check backend logs** - Look for any errors when requests come in
2. **Check browser Network tab** - See exact error messages
3. **Try different browser** - Sometimes browser extensions block requests
4. **Check firewall** - Make sure localhost connections aren't blocked
5. **Try incognito mode** - Rules out browser extensions

## Quick Test Script

Save this as `test-connection.html` in prototype folder:

```html
<!DOCTYPE html>
<html>
<head><title>Connection Test</title></head>
<body>
    <h1>Backend Connection Test</h1>
    <div id="result"></div>
    <script>
        fetch('http://localhost:8080/')
            .then(r => r.text())
            .then(text => {
                document.getElementById('result').innerHTML = 
                    '<p style="color: green;">✅ Connected: ' + text + '</p>';
            })
            .catch(err => {
                document.getElementById('result').innerHTML = 
                    '<p style="color: red;">❌ Error: ' + err.message + '</p>';
            });
    </script>
</body>
</html>
```

Open via HTTP server and check if it connects.
