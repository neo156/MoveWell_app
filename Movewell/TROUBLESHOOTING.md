# Troubleshooting Login Issues in Expo Go

## Common Issues and Solutions

### 1. Network Request Failed

**Problem:** Cannot connect to the server from your phone.

**Solutions:**

#### Check Your IP Address
1. Open Terminal (Mac/Linux) or Command Prompt (Windows)
2. Run:
   - **Mac/Linux:** `ifconfig | grep "inet " | grep -v 127.0.0.1`
   - **Windows:** `ipconfig` (look for "IPv4 Address")
3. Update `app/config.js` with your actual IP address

#### Verify Server is Running
1. Make sure your server is running:
   ```bash
   cd server
   npm start
   ```
2. You should see: "Server running on http://localhost:4000"
3. Test in browser: `http://localhost:4000/health` should return `{"status":"ok"}`

#### Check WiFi Connection
- **CRITICAL:** Your phone and computer MUST be on the same WiFi network
- If using mobile data on your phone, it won't work - switch to WiFi
- Some corporate/school networks block device-to-device communication

#### Check Firewall
- Your computer's firewall might be blocking port 4000
- **Mac:** System Preferences → Security & Privacy → Firewall → Allow Node.js
- **Windows:** Allow Node.js through Windows Firewall

### 2. Wrong IP Address

**Problem:** The IP in `config.js` doesn't match your current IP.

**Solution:**
- IP addresses can change when you reconnect to WiFi
- Check your IP again and update `config.js`
- Restart Expo after changing the IP

### 3. Server Not Listening on Network

**Problem:** Server only accepts localhost connections.

**Solution:**
- The server should already be configured to listen on `0.0.0.0`
- If not, check `server/src/index.js` - it should have:
  ```javascript
  app.listen(port, '0.0.0.0', () => {
    // ...
  });
  ```

### 4. Test Connection

**Quick Test:**
1. On your phone, open a browser
2. Try to access: `http://YOUR_IP:4000/health`
   - Replace `YOUR_IP` with the IP from `config.js`
3. If this doesn't work, the network connection is the issue

### 5. Check Console Logs

**In Expo Go:**
- Shake your device or press `Cmd+D` (iOS) / `Cmd+M` (Android)
- Open "Debug Remote JS"
- Check the console for error messages
- Look for the logged `API_BASE_URL` value

**In Terminal:**
- Check your server logs for incoming requests
- If you don't see any requests, the phone isn't reaching the server

## Step-by-Step Debugging

1. **Verify IP Address:**
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

2. **Update config.js** with the correct IP

3. **Restart Expo:**
   - Stop Expo (Ctrl+C)
   - Run `npm start` again

4. **Test Server Locally:**
   ```bash
   curl http://localhost:4000/health
   ```

5. **Test Server from Network:**
   ```bash
   curl http://YOUR_IP:4000/health
   ```

6. **Check Phone Connection:**
   - Make sure phone is on same WiFi
   - Try accessing `http://YOUR_IP:4000/health` in phone's browser

## Alternative: Use ngrok for Testing

If WiFi issues persist, you can use ngrok to create a public tunnel:

```bash
npx ngrok http 4000
```

Then use the ngrok URL in `config.js` (but this is only for testing, not production).

