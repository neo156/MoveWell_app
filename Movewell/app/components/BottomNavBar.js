import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNavBar({ currentScreen, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: 'home-outline', iconFilled: 'home' },
    { id: 'workouts', label: 'Workouts', icon: 'barbell-outline', iconFilled: 'barbell' },
    { id: 'stretching', label: 'Stretch', icon: 'fitness-outline', iconFilled: 'fitness' },
    { id: 'habits', label: 'Habits', icon: 'checkmark-circle-outline', iconFilled: 'checkmark-circle' },
    { id: 'profile', label: 'Profile', icon: 'person-outline', iconFilled: 'person' },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.navItem}
              onPress={() => onNavigate(item.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, isActive && styles.iconContainerActive]}>
                <Ionicons
                  name={isActive ? item.iconFilled : item.icon}
                  size={24}
                  color={isActive ? '#fff' : '#9ca3af'}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    paddingTop: 10,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 15,
    // Glassmorphism effect simulation
    overflow: 'hidden',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  iconContainerActive: {
    backgroundColor: '#4f46e5',
    shadowColor: '#4f46e5',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
  },
});

