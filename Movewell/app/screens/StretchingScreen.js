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

const stretchRoutines = [
  {
    id: 1,
    title: 'Morning Mobility',
    duration: '15 min',
    focus: 'Full Body',
    stretches: 12,
    color: '#4f46e5',
  },
  {
    id: 2,
    title: 'Post-Workout Recovery',
    duration: '20 min',
    focus: 'Muscle Recovery',
    stretches: 10,
    color: '#14b8a6',
  },
  {
    id: 3,
    title: 'Hip Flexibility',
    duration: '25 min',
    focus: 'Hips & Lower Back',
    stretches: 15,
    color: '#f59e0b',
  },
  {
    id: 4,
    title: 'Neck & Shoulders',
    duration: '10 min',
    focus: 'Upper Body',
    stretches: 8,
    color: '#ef4444',
  },
  {
    id: 5,
    title: 'Evening Relaxation',
    duration: '30 min',
    focus: 'Stress Relief',
    stretches: 18,
    color: '#8b5cf6',
  },
  {
    id: 6,
    title: 'Yoga Flow',
    duration: '40 min',
    focus: 'Balance & Flexibility',
    stretches: 20,
    color: '#ec4899',
  },
];

export default function StretchingScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.backgroundDecor}>
        <View style={[styles.blob, styles.blobOne]} />
        <View style={[styles.blob, styles.blobTwo]} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Stretch & Mobility</Text>
          <Text style={styles.subtitle}>Improve flexibility and reduce tension</Text>
        </View>

        {stretchRoutines.map((routine) => (
          <TouchableOpacity key={routine.id} style={styles.routineCard}>
            <View style={[styles.colorBar, { backgroundColor: routine.color }]} />
            <View style={styles.routineContent}>
              <View style={styles.routineHeader}>
                <Text style={styles.routineTitle}>{routine.title}</Text>
              </View>
              <View style={styles.routineInfo}>
                <View style={styles.infoItem}>
                  <Ionicons name="time-outline" size={16} color="#9ca3af" />
                  <Text style={styles.infoText}>{routine.duration}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="target-outline" size={16} color="#9ca3af" />
                  <Text style={styles.infoText}>{routine.focus}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="fitness-outline" size={16} color="#9ca3af" />
                  <Text style={styles.infoText}>{routine.stretches} stretches</Text>
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
  routineCard: {
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
  routineContent: {
    flex: 1,
    padding: 18,
  },
  routineHeader: {
    marginBottom: 12,
  },
  routineTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f9fafb',
  },
  routineInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
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

