
import { Platform } from 'react-native';
import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: Platform.OS === 'ios',
          title: 'Audio Stream Connect',
          headerBackVisible: false, // Hide back button
          headerBackButtonMenuEnabled: false, // Disable back button menu
        }}
      />
    </Stack>
  );
}
