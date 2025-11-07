
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

/**
 * Screenshot Helper Component
 * 
 * This component helps create consistent, professional screenshots for the App Store.
 * Use this to add overlays, titles, and descriptions to your screenshots.
 * 
 * Usage:
 * 1. Take base screenshots using iOS Simulator or device
 * 2. Import screenshots into this component
 * 3. Add text overlays and styling
 * 4. Export final screenshots
 */

interface ScreenshotOverlayProps {
  title: string;
  subtitle?: string;
  position?: 'top' | 'bottom';
  backgroundColor?: string;
}

export const ScreenshotOverlay: React.FC<ScreenshotOverlayProps> = ({
  title,
  subtitle,
  position = 'top',
  backgroundColor = 'rgba(0, 0, 0, 0.7)',
}) => {
  return (
    <View style={[
      styles.overlay,
      position === 'top' ? styles.overlayTop : styles.overlayBottom,
      { backgroundColor }
    ]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

/**
 * Screenshot Templates
 * 
 * Pre-configured layouts for each screenshot type
 */

// Screenshot 1: Home Screen
export const HomeScreenshot = () => (
  <View style={styles.container}>
    {/* Your home screen component here */}
    <ScreenshotOverlay
      title="Connect Instantly"
      subtitle="Enter IP and port or scan QR code"
      position="top"
    />
  </View>
);

// Screenshot 2: QR Scanner
export const QRScannerScreenshot = () => (
  <View style={styles.container}>
    {/* Your QR scanner component here */}
    <ScreenshotOverlay
      title="Scan & Connect"
      subtitle="Instant setup with QR codes"
      position="top"
    />
  </View>
);

// Screenshot 3: Active Stream
export const ActiveStreamScreenshot = () => (
  <View style={styles.container}>
    {/* Your webview/stream component here */}
    <ScreenshotOverlay
      title="Stream & Listen"
      subtitle="High-quality audio streaming"
      position="bottom"
    />
  </View>
);

// Screenshot 4: Saved Streams
export const SavedStreamsScreenshot = () => (
  <View style={styles.container}>
    {/* Your saved streams component here */}
    <ScreenshotOverlay
      title="Quick Access Library"
      subtitle="Save and organize your streams"
      position="top"
    />
  </View>
);

// Screenshot 5: Background Playback
export const BackgroundPlaybackScreenshot = () => (
  <View style={styles.container}>
    <View style={styles.lockScreenMockup}>
      <View style={styles.lockScreenTime}>
        <Text style={styles.lockScreenTimeText}>9:41</Text>
      </View>
      <View style={styles.lockScreenPlayer}>
        <Text style={styles.lockScreenAppName}>StreamConnect</Text>
        <Text style={styles.lockScreenStreamName}>Living Room Audio</Text>
        <View style={styles.lockScreenControls}>
          <Text style={styles.controlButton}>⏮</Text>
          <Text style={styles.controlButton}>⏸</Text>
          <Text style={styles.controlButton}>⏭</Text>
        </View>
      </View>
    </View>
    <ScreenshotOverlay
      title="Listen Anywhere"
      subtitle="Continues playing with screen locked"
      position="bottom"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  overlayTop: {
    top: 0,
  },
  overlayBottom: {
    bottom: 0,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#e0e0e0',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  // Lock screen mockup styles
  lockScreenMockup: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockScreenTime: {
    position: 'absolute',
    top: 60,
    alignItems: 'center',
  },
  lockScreenTimeText: {
    fontSize: 80,
    fontWeight: '300',
    color: '#ffffff',
  },
  lockScreenPlayer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 30,
    width: '85%',
    alignItems: 'center',
    backdropFilter: 'blur(20px)',
  },
  lockScreenAppName: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.7,
    marginBottom: 8,
  },
  lockScreenStreamName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 30,
  },
  lockScreenControls: {
    flexDirection: 'row',
    gap: 40,
    alignItems: 'center',
  },
  controlButton: {
    fontSize: 40,
    color: '#ffffff',
  },
});

/**
 * Screenshot Dimensions Reference
 * 
 * Use these dimensions when exporting screenshots:
 */
export const SCREENSHOT_DIMENSIONS = {
  // iPhone
  iPhone_6_7: { width: 1290, height: 2796 }, // iPhone 15 Pro Max, 14 Pro Max, etc.
  iPhone_6_5: { width: 1242, height: 2688 }, // iPhone 11 Pro Max, XS Max
  iPhone_5_5: { width: 1242, height: 2208 }, // iPhone 8 Plus, 7 Plus, 6s Plus
  
  // iPad
  iPad_12_9: { width: 2048, height: 2732 }, // iPad Pro 12.9"
  iPad_11: { width: 1668, height: 2388 }, // iPad Pro 11"
};

/**
 * Export Instructions:
 * 
 * 1. Run your app in iOS Simulator
 * 2. Navigate to each screen
 * 3. Press Cmd+S to save screenshot
 * 4. Use image editing software to add overlays (or use this component)
 * 5. Export in required dimensions
 * 6. Upload to App Store Connect
 */

export default {
  ScreenshotOverlay,
  HomeScreenshot,
  QRScannerScreenshot,
  ActiveStreamScreenshot,
  SavedStreamsScreenshot,
  BackgroundPlaybackScreenshot,
  SCREENSHOT_DIMENSIONS,
};
