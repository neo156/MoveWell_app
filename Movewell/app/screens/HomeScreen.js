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

export default function HomeScreen({ user, onNavigate }) {
  const featuredWorkouts = [
    { id: 1, title: 'Full Body Strength', duration: '45 min', color: '#4f46e5' },
    { id: 2, title: 'Cardio Blast', duration: '30 min', color: '#14b8a6' },
  ];

  const featuredStretches = [
    { id: 1, title: 'Morning Mobility', duration: '15 min', color: '#f59e0b' },
    { id: 2, title: 'Post-Workout Recovery', duration: '20 min', color: '#8b5cf6' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.backgroundDecor}>
        <View style={[styles.blob, styles.blobOne]} />
        <View style={[styles.blob, styles.blobTwo]} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.name}>{user?.name || 'User'}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Overview</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Steps</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.cardTitle}>Featured Workouts</Text>
            <TouchableOpacity onPress={() => onNavigate('workouts')}>
              <Text style={styles.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>
          {featuredWorkouts.map((workout) => (
            <TouchableOpacity
              key={workout.id}
              style={styles.featuredItem}
              onPress={() => onNavigate('workouts')}
            >
              <View style={[styles.featuredColorBar, { backgroundColor: workout.color }]} />
              <View style={styles.featuredContent}>
                <Text style={styles.featuredTitle}>{workout.title}</Text>
                <Text style={styles.featuredDuration}>{workout.duration}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.cardTitle}>Stretch Routines</Text>
            <TouchableOpacity onPress={() => onNavigate('stretching')}>
              <Text style={styles.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>
          {featuredStretches.map((stretch) => (
            <TouchableOpacity
              key={stretch.id}
              style={styles.featuredItem}
              onPress={() => onNavigate('stretching')}
            >
              <View style={[styles.featuredColorBar, { backgroundColor: stretch.color }]} />
              <View style={styles.featuredContent}>
                <Text style={styles.featuredTitle}>{stretch.title}</Text>
                <Text style={styles.featuredDuration}>{stretch.duration}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <TouchableOpacity style={styles.actionButton} onPress={() => onNavigate('workouts')}>
            <Ionicons name="barbell" size={20} color="#4f46e5" style={styles.actionIcon} />
            <Text style={styles.actionButtonText}>Start Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => onNavigate('stretching')}>
            <Ionicons name="fitness" size={20} color="#14b8a6" style={styles.actionIcon} />
            <Text style={styles.actionButtonText}>Begin Stretch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => onNavigate('habits')}>
            <Ionicons name="checkmark-circle" size={20} color="#f59e0b" style={styles.actionIcon} />
            <Text style={styles.actionButtonText}>Track Habits</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f9fafb',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAll: {
    color: '#4f46e5',
    fontWeight: '600',
    fontSize: 14,
  },
  featuredItem: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  featuredColorBar: {
    width: 4,
  },
  featuredContent: {
    flex: 1,
    padding: 14,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f9fafb',
    marginBottom: 4,
  },
  featuredDuration: {
    fontSize: 14,
    color: '#9ca3af',
  },
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f9fafb',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4f46e5',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  actionButton: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1f2937',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  actionIcon: {
    marginRight: 4,
  },
  actionButtonText: {
    color: '#e5e7eb',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 6,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#4b5563',
    textAlign: 'center',
  },
});

