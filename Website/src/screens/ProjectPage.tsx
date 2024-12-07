import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationProps } from '../types/navigation';
import { darkTheme } from '../theme';

export default function ProjectPage({ route }: NavigationProps<'ProjectPage'>) {
  const { name } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: darkTheme.background }]}>
      <Text style={[styles.title, { color: darkTheme.primary }]}>{name}</Text>
      <Text style={[styles.text, { color: darkTheme.text }]}>
        This is where {name}'s details will go.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  text: { fontSize: 16 },
});
