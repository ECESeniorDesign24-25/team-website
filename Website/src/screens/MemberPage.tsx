import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationProps } from '../types/navigation';
import { darkTheme } from '../theme';

export default function MemberPage({ route }: NavigationProps<'MemberPage'>) {
  const { name } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: darkTheme.background }]}>
      <Text style={[styles.title, { color: darkTheme.primary }]}>{name}'s Page</Text>
      <Text style={[styles.text, { color: darkTheme.text }]}>
        This is where {name}'s bio, projects, and contact information will go.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  text: { fontSize: 16 },
});
