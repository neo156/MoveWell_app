import React from 'react';
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

const workoutPrograms = [
  {
    id: 1,
    title: 'Full Body Strength',
    duration: '45 min',
    difficulty: 'Intermediate',
    exercises: 8,
    color: '#4f46e5',
  },
  {
    id: 2,
    title: 'Cardio Blast',
    duration: '30 min',
    difficulty: 'Beginner',
    exercises: 6,
    color: '#14b8a6',
  },
  {
    id: 3,
    title: 'Upper Body Focus',
    duration: '40 min',
    difficulty: 'Advanced',
    exercises: 10,
    color: '#f59e0b',
  },
  {
    id: 4,
    title: 'Lower Body Power',
    duration: '35 min',
    difficulty: 'Intermediate',
    exercises: 7,
    color: '#ef4444',
  },
  {
    id: 5,
    title: 'HIIT Training',
    duration: '20 min',
    difficulty: 'Advanced',
    exercises: 5,
    color: '#8b5cf6',
  },
  {
    id: 6,
    title: 'Core Strength',
    duration: '25 min',
    difficulty: 'Beginner',
    exercises: 6,
    color: '#ec4899',
  },
];

export default function WorkoutsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.backgroundDecor}>
        <View style={[styles.blob, styles.blobOne]} />
        <View style={[styles.blob, styles.blobTwo]} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Workout Programs</Text>
          <Text style={styles.subtitle}>Choose a program to get started</Text>
        </View>

        {workoutPrograms.map((workout) => (
          <TouchableOpacity key={workout.id} style={styles.workoutCard}>
            <View style={[styles.colorBar, { backgroundColor: workout.color }]} />
            <View style={styles.workoutContent}>
              <View style={styles.workoutHeader}>
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <View style={[styles.difficultyBadge, styles[`difficulty${workout.difficulty}`]]}>
                  <Text style={styles.difficultyText}>{workout.difficulty}</Text>
                </View>
              </View>
              <View style={styles.workoutInfo}>
                <View style={styles.infoItem}>
                  <Ionicons name="time-outline" size={16} color="#9ca3af" />
                  <Text style={styles.infoText}>{workout.duration}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="barbell-outline" size={16} color="#9ca3af" />
                  <Text style={styles.infoText}>{workout.exercises} exercises</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
  workoutCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 12,
  },
  colorBar: {
    width: 6,
  },
  workoutContent: {
    flex: 1,
    padding: 18,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f9fafb',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  difficultyBeginner: {
    backgroundColor: '#0f2f1f',
  },
  difficultyIntermediate: {
    backgroundColor: '#1e3a5f',
  },
  difficultyAdvanced: {
    backgroundColor: '#3b0d0c',
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#bbf7d0',
  },
  workoutInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '500',
  },
});

