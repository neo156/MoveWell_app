// API Configuration
// For physical devices/emulators, you need to use your computer's IP address instead of localhost
// 
// TO FIND YOUR IP ADDRESS:
//   Mac/Linux: Run `ifconfig | grep "inet " | grep -v 127.0.0.1` in terminal
//   Windows: Run `ipconfig` and look for "IPv4 Address"
//   Or check Expo DevTools - it shows your local IP at the top
//
// IMPORTANT: Make sure your phone and computer are on the same WiFi network!

import { Platform } from 'react-native';

// Replace this with your actual local IP address
// Common IP ranges: 192.168.x.x, 10.0.x.x, 172.16.x.x
// The detected IP on this machine appears to be: 10.240.30.1
// If this doesn't work, try finding your IP with: ifconfig (Mac) or ipconfig (Windows)
const LOCAL_IP = '10.240.30.1'; // ⚠️ CHANGE THIS TO YOUR IP ADDRESS IF DIFFERENT

let API_BASE_URL;
if (Platform.OS === 'web') {
  // Web can use localhost
  API_BASE_URL = 'http://localhost:4000';
} else {
  // Mobile devices need the actual IP address
  API_BASE_URL = `http://${LOCAL_IP}:4000`;
}

// Log the API URL for debugging (remove in production)
if (__DEV__) {
  console.log('API_BASE_URL:', API_BASE_URL);
  console.log('Platform:', Platform.OS);
}

// Test connection helper
export const testConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    console.log('Server connection test:', data);
    return true;
  } catch (error) {
    console.error('Connection test failed:', error);
    console.error('Make sure:');
    console.error('1. Server is running (cd server && npm start)');
    console.error('2. Phone and computer are on the same WiFi');
    console.error('3. Firewall allows port 4000');
    console.error('4. IP address is correct:', LOCAL_IP);
    return false;
  }
};

export { API_BASE_URL };

