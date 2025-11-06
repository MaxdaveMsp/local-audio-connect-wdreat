
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { 
  ScrollView, 
  Pressable, 
  StyleSheet, 
  View, 
  Text, 
  TextInput,
  Alert, 
  Platform,
  KeyboardAvoidingView 
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import { colors, commonStyles } from "@/styles/commonStyles";

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [ipAddress, setIpAddress] = useState("");
  const [port, setPort] = useState("");

  const handleConnect = () => {
    if (!ipAddress.trim()) {
      Alert.alert("Error", "Please enter an IP address");
      return;
    }
    
    if (!port.trim()) {
      Alert.alert("Error", "Please enter a port number");
      return;
    }

    const url = `http://${ipAddress.trim()}:${port.trim()}`;
    console.log("Connecting to:", url);
    
    router.push({
      pathname: "/webview",
      params: { url }
    });
  };

  const handleQRScan = () => {
    console.log("Opening QR scanner");
    router.push("/qr-scanner");
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => Alert.alert("Info", "Enter IP:Port or scan QR code to connect to audio streams")}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="info.circle" color={colors.primary} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Audio Stream Connect",
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <KeyboardAvoidingView 
        style={[styles.container, { backgroundColor: colors.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <IconSymbol name="waveform" color={colors.card} size={48} />
              </View>
            </View>

            <Text style={styles.title}>Join Audio Stream</Text>
            <Text style={styles.subtitle}>
              Connect to local audio streaming by entering IP and port or scanning a QR code
            </Text>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Manual Connection</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>IP Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 192.168.1.100"
                  placeholderTextColor={colors.textSecondary}
                  value={ipAddress}
                  onChangeText={setIpAddress}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Port</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 8080"
                  placeholderTextColor={colors.textSecondary}
                  value={port}
                  onChangeText={setPort}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <Pressable 
                style={[styles.button, styles.primaryButton]}
                onPress={handleConnect}
              >
                <IconSymbol name="play.circle.fill" color={colors.card} size={20} />
                <Text style={styles.buttonText}>Connect</Text>
              </Pressable>
            </View>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>QR Code Scanner</Text>
              <Text style={styles.cardDescription}>
                Scan a QR code containing the stream address
              </Text>
              
              <Pressable 
                style={[styles.button, styles.secondaryButton]}
                onPress={handleQRScan}
              >
                <IconSymbol name="qrcode.viewfinder" color={colors.card} size={20} />
                <Text style={styles.buttonText}>Scan QR Code</Text>
              </Pressable>
            </View>

            <View style={styles.infoBox}>
              <IconSymbol name="lightbulb.fill" color={colors.accent} size={20} />
              <Text style={styles.infoText}>
                The QR code should contain the full address (IP:Port) of the audio stream
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 100,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 122, 255, 0.3)',
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.highlight,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.highlight,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    width: '100%',
    gap: 12,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  headerButtonContainer: {
    padding: 6,
  },
});
