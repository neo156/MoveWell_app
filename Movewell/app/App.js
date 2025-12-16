import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar as RNStatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import WorkoutsScreen from './screens/WorkoutsScreen';
import StretchingScreen from './screens/StretchingScreen';
import HabitsScreen from './screens/HabitsScreen';
import ProfileScreen from './screens/ProfileScreen';
import BottomNavBar from './components/BottomNavBar';
import { API_BASE_URL } from './config';

const TOKEN_KEY = '@movewell_token';
const USER_KEY = '@movewell_user';

export default function App() {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null); // { type: 'error' | 'success', text: string }
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home' | 'workouts' | 'stretching' | 'habits' | 'profile'

  // Check for stored token on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Test server connection first
        try {
          const healthCheck = await fetch(`${API_BASE_URL}/health`);
          if (healthCheck.ok) {
            console.log('✅ Server connection successful');
          }
        } catch (err) {
          console.error('❌ Cannot connect to server:', API_BASE_URL);
          console.error('Make sure:');
          console.error('1. Server is running: cd server && npm start');
          console.error('2. Phone and computer are on the SAME WiFi network');
          console.error('3. Firewall allows port 4000');
          console.error('4. IP address in config.js matches your computer IP');
        }

        const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
        const storedUser = await AsyncStorage.getItem(USER_KEY);
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Error loading auth:', err);
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, []);

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async () => {
    if (!email || !password || (mode === 'register' && !name)) {
      setMessage({ type: 'error', text: 'Please fill out all fields.' });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const url = `${API_BASE_URL}${endpoint}`;
      console.log('Attempting to connect to:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data?.error || 'Request failed');
      }

      // Save token and user to AsyncStorage
      await AsyncStorage.setItem(TOKEN_KEY, data.token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));
      
      setToken(data.token);
      setUser(data.user);
      setMessage({ type: 'success', text: mode === 'login' ? 'Welcome back!' : 'Account created.' });
      resetForm();
    } catch (err) {
      console.error('Login/Register error:', err);
      let errorMessage = err.message || 'Something went wrong.';
      
      // Provide more helpful error messages
      if (err.message.includes('Network request failed') || err.message.includes('Failed to fetch')) {
        errorMessage = `Cannot connect to server at ${API_BASE_URL}. Make sure:\n1. Server is running\n2. Phone and computer are on same WiFi\n3. IP address in config.js is correct`;
      }
      
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    resetForm();
    setMessage(null);
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
    } catch (err) {
      console.error('Error signing out:', err);
    }
    setToken(null);
    setUser(null);
    setMessage(null);
    setCurrentScreen('home');
  };

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'workouts':
        return <WorkoutsScreen />;
      case 'stretching':
        return <StretchingScreen />;
      case 'habits':
        return <HabitsScreen />;
      case 'profile':
        return (
          <ProfileScreen
            user={user}
            token={token}
            onUserUpdate={handleUserUpdate}
            onSignOut={handleSignOut}
            showBackButton={false}
          />
        );
      case 'home':
      default:
        return <HomeScreen user={user} onNavigate={handleNavigate} />;
    }
  };

  const handleUserUpdate = async (updatedUser) => {
    setUser(updatedUser);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  };

  const ModeSwitch = () => (
    <View style={styles.switchRow}>
      {['login', 'register'].map((item) => {
        const active = mode === item;
        return (
          <TouchableOpacity
            key={item}
            style={[styles.switchButton, active && styles.switchButtonActive]}
            onPress={() => {
              setMode(item);
              resetForm();
              setMessage(null);
            }}
            disabled={loading}
          >
            <Text style={[styles.switchText, active && styles.switchTextActive]}>
              {item === 'login' ? 'Login' : 'Register'}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  // Show loading screen while checking auth
  if (checkingAuth) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4f46e5" />
        </View>
      </SafeAreaView>
    );
  }

  // Show main app screens if authenticated
  if (token && user) {
    return (
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.screenContainer}>
          {renderScreen()}
        </View>
        <BottomNavBar currentScreen={currentScreen} onNavigate={handleNavigate} />
      </SafeAreaView>
    );
  }

  // Show auth screen
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.backgroundDecor}>
        <View style={[styles.blob, styles.blobOne]} />
        <View style={[styles.blob, styles.blobTwo]} />
      </View>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.kicker}>MoveWell</Text>
          <Text style={styles.title}>
            {mode === 'login' ? 'Welcome back ' : 'Create your account '}
          </Text>
          <Text style={styles.subtitle}>
            Track your progress and stay on top of your movement goals.
          </Text>

          <View style={styles.card}>
            <ModeSwitch />

            {message && (
              <View
                style={[
                  styles.banner,
                  message.type === 'error' ? styles.bannerError : styles.bannerSuccess,
                ]}
              >
                <Text
                  style={[
                    styles.bannerText,
                    message.type === 'error' ? styles.bannerTextError : styles.bannerTextSuccess,
                  ]}
                >
                  {message.text}
                </Text>
              </View>
            )}

            {mode === 'register' && (
              <View style={styles.field}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  placeholder="Jane Doe"
                  placeholderTextColor="#6b7280"
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                  autoCapitalize="words"
                />
              </View>
            )}

            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="you@example.com"
                placeholderTextColor="#6b7280"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor="#6b7280"
                  value={password}
                  onChangeText={setPassword}
                  style={styles.passwordInput}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color="#9ca3af"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>{mode === 'login' ? 'Login' : 'Create account'}</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleMode} disabled={loading}>
              <Text style={styles.link}>
                {mode === 'login'
                  ? "Don't have an account? Register"
                  : 'Already have an account? Login'}
              </Text>
            </TouchableOpacity>
          </View>

         
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#07060d',
  },
  screenContainer: {
    flex: 1,
  },
  safe: {
    flex: 1,
    backgroundColor: '#07060d',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  scroll: {
    padding: 24,
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight || 0) + 24 : 24,
    paddingBottom: 48,
  },
  backgroundDecor: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 200,
    opacity: 0.32,
  },
  blobOne: {
    backgroundColor: '#4f46e5',
    top: -80,
    right: -60,
  },
  blobTwo: {
    backgroundColor: '#14b8a6',
    bottom: -120,
    left: -80,
  },
  kicker: {
    color: '#a5b4fc',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    fontWeight: '700',
    marginBottom: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#f9fafb',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#d1d5db',
    marginBottom: 22,
    lineHeight: 21,
  },
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 12,
  },
  switchRow: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    padding: 6,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  switchButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  switchButtonActive: {
    backgroundColor: '#1f2937',
  },
  switchText: {
    color: '#9ca3af',
    fontWeight: '600',
  },
  switchTextActive: {
    color: '#e5e7eb',
  },
  banner: {
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  bannerError: {
    backgroundColor: '#3b0d0c',
  },
  bannerSuccess: {
    backgroundColor: '#0f2f1f',
  },
  bannerText: {
    fontWeight: '600',
  },
  bannerTextError: {
    color: '#fecdd3',
  },
  bannerTextSuccess: {
    color: '#bbf7d0',
  },
  field: {
    marginBottom: 12,
  },
  label: {
    color: '#d1d5db',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 14,
    color: '#f8fafc',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  passwordInput: {
    flex: 1,
    padding: 14,
    color: '#f8fafc',
    fontSize: 16,
  },
  eyeButton: {
    padding: 14,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  link: {
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 6,
    fontWeight: '600',
  },
  successBox: {
    backgroundColor: '#0b1d17',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#134e4a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  successText: {
    color: '#dcfce7',
    fontWeight: '700',
  },
  successSub: {
    color: '#a7f3d0',
  },
  signOut: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#134e4a',
  },
  signOutText: {
    color: '#ecfeff',
    fontWeight: '700',
  },
  hint: {
    color: '#6b7280',
    marginTop: 14,
    textAlign: 'center',
    fontSize: 12,
  },
});
