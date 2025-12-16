import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const defaultHabits = [
  { id: 1, name: 'Morning Workout', icon: 'barbell', completed: false },
  { id: 2, name: '10K Steps', icon: 'footsteps', completed: false },
  { id: 3, name: 'Stretch Session', icon: 'fitness', completed: false },
  { id: 4, name: 'Drink Water', icon: 'water', completed: false },
  { id: 5, name: 'Meditation', icon: 'leaf', completed: false },
  { id: 6, name: 'Evening Walk', icon: 'moon', completed: false },
];

export default function HabitsScreen() {
  const [habits, setHabits] = useState(defaultHabits);

  const toggleHabit = (id) => {
    setHabits(habits.map((habit) => (habit.id === id ? { ...habit, completed: !habit.completed } : habit)));
  };

  const completedCount = habits.filter((h) => h.completed).length;
  const completionPercentage = Math.round((completedCount / habits.length) * 100);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.backgroundDecor}>
        <View style={[styles.blob, styles.blobOne]} />
        <View style={[styles.blob, styles.blobTwo]} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Habits</Text>
          <Text style={styles.subtitle}>Track your daily movement habits</Text>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Today's Progress</Text>
            <Text style={styles.progressPercentage}>{completionPercentage}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${completionPercentage}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {completedCount} of {habits.length} habits completed
          </Text>
        </View>

        <View style={styles.habitsList}>
          {habits.map((habit) => (
            <TouchableOpacity
              key={habit.id}
              style={[styles.habitCard, habit.completed && styles.habitCardCompleted]}
              onPress={() => toggleHabit(habit.id)}
            >
              <View style={styles.habitLeft}>
                <Ionicons
                  name={habit.icon}
                  size={24}
                  color={habit.completed ? '#bbf7d0' : '#9ca3af'}
                  style={styles.habitIcon}
                />
                <Text style={[styles.habitName, habit.completed && styles.habitNameCompleted]}>
                  {habit.name}
                </Text>
              </View>
              <View style={[styles.checkbox, habit.completed && styles.checkboxCompleted]}>
                {habit.completed && (
                  <Ionicons name="checkmark" size={18} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.streakCard}>
          <View style={styles.streakHeader}>
            <Ionicons name="flame" size={20} color="#f59e0b" />
            <Text style={styles.streakTitle}>Current Streak</Text>
          </View>
          <Text style={styles.streakNumber}>7 days</Text>
          <Text style={styles.streakSubtext}>Keep it up! You're doing great.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#07060d',
  },
  scroll: {
    padding: 24,
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight || 0) + 24 : 24,
    paddingBottom: 100,
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
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f9fafb',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#9ca3af',
  },
  progressCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f9fafb',
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4f46e5',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#111827',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4f46e5',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#9ca3af',
  },
  habitsList: {
    marginBottom: 24,
  },
  habitCard: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  habitCardCompleted: {
    backgroundColor: '#0b1d17',
    borderColor: '#134e4a',
  },
  habitLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  habitIcon: {
    marginRight: 4,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f9fafb',
  },
  habitNameCompleted: {
    color: '#bbf7d0',
    textDecorationLine: 'line-through',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#4f46e5',
    borderColor: '#4f46e5',
  },
  streakCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f9fafb',
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#f59e0b',
    marginBottom: 4,
  },
  streakSubtext: {
    fontSize: 14,
    color: '#9ca3af',
  },
});

