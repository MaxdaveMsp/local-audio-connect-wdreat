
import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  ActivityIndicator,
  Platform,
  ScrollView 
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

type ErrorType = 'connection' | 'http' | 'timeout' | 'unknown';

interface ErrorDetails {
  type: ErrorType;
  message: string;
  code?: number;
  description?: string;
}

export default function WebViewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const url = params.url as string;
  const webViewRef = useRef<WebView>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorDetails | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  console.log('WebView loading URL:', url);

  const handleGoBack = () => {
    router.back();
  };

  const handleReload = () => {
    console.log('Reloading WebView, retry count:', retryCount + 1);
    setError(null);
    setLoading(true);
    setRetryCount(prev => prev + 1);
    
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const validateUrl = (urlString: string): boolean => {
    try {
      // Check if URL has protocol
      if (!urlString.startsWith('http://') && !urlString.startsWith('https://')) {
        return false;
      }
      
      // Try to parse URL
      const parsedUrl = new URL(urlString);
      return parsedUrl.hostname.length > 0;
    } catch (e) {
      console.error('URL validation error:', e);
      return false;
    }
  };

  const getErrorDetails = (errorCode: number, description: string): ErrorDetails => {
    // Common error codes
    if (errorCode === -1009 || errorCode === -1004) {
      return {
        type: 'connection',
        message: 'No Internet Connection',
        code: errorCode,
        description: 'Please check your network connection and try again.'
      };
    } else if (errorCode === -1001) {
      return {
        type: 'timeout',
        message: 'Connection Timeout',
        code: errorCode,
        description: 'The server took too long to respond. Please try again.'
      };
    } else if (errorCode === -1003) {
      return {
        type: 'connection',
        message: 'Host Not Found',
        code: errorCode,
        description: 'Could not find the server. Check the IP address and port.'
      };
    } else {
      return {
        type: 'unknown',
        message: 'Connection Failed',
        code: errorCode,
        description: description || 'An unexpected error occurred.'
      };
    }
  };

  if (!url) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Error',
            headerBackVisible: true,
          }}
        />
        <View style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.triangle.fill" color={colors.accent} size={64} />
          <Text style={styles.errorTitle}>No URL Provided</Text>
          <Text style={styles.errorText}>
            Please go back and enter a valid IP address and port.
          </Text>
          <Pressable style={styles.button} onPress={handleGoBack}>
            <Text style={styles.buttonText}>Go Back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (!validateUrl(url)) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Error',
            headerBackVisible: true,
          }}
        />
        <View style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.triangle.fill" color={colors.accent} size={64} />
          <Text style={styles.errorTitle}>Invalid URL</Text>
          <Text style={styles.errorText}>
            The URL format is incorrect: {url}
          </Text>
          <Text style={styles.errorSubtext}>
            Make sure the URL starts with http:// or https://
          </Text>
          <Pressable style={styles.button} onPress={handleGoBack}>
            <Text style={styles.buttonText}>Go Back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Audio Stream',
          headerBackVisible: true,
          headerRight: () => (
            <Pressable onPress={handleReload} style={styles.headerButton}>
              <IconSymbol name="arrow.clockwise" color={colors.primary} size={20} />
            </Pressable>
          ),
        }}
      />
      
      {loading && !error && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading stream...</Text>
          <Text style={styles.loadingSubtext}>{url}</Text>
        </View>
      )}

      {error ? (
        <ScrollView contentContainerStyle={styles.errorScrollContainer}>
          <View style={styles.errorContainer}>
            <IconSymbol 
              name={error.type === 'connection' ? 'wifi.slash' : 'exclamationmark.triangle.fill'} 
              color={colors.accent} 
              size={64} 
            />
            <Text style={styles.errorTitle}>{error.message}</Text>
            <Text style={styles.errorText}>
              Unable to connect to {url}
            </Text>
            <Text style={styles.errorSubtext}>
              {error.description}
            </Text>

            {error.code && (
              <View style={styles.errorCodeContainer}>
                <Text style={styles.errorCodeLabel}>Error Code:</Text>
                <Text style={styles.errorCodeValue}>{error.code}</Text>
              </View>
            )}

            <View style={styles.troubleshootingContainer}>
              <Text style={styles.troubleshootingTitle}>Troubleshooting Tips:</Text>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>
                  Ensure your device is on the same network as the stream
                </Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>
                  Verify the IP address and port are correct
                </Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>
                  Check if the audio stream server is running
                </Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>
                  Try accessing the URL in a web browser first
                </Text>
              </View>
            </View>

            {retryCount > 0 && (
              <Text style={styles.retryCountText}>
                Retry attempts: {retryCount}
              </Text>
            )}

            <Pressable style={styles.button} onPress={handleReload}>
              <IconSymbol name="arrow.clockwise" color={colors.card} size={20} />
              <Text style={styles.buttonText}>Try Again</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={handleGoBack}>
              <Text style={styles.secondaryButtonText}>Go Back</Text>
            </Pressable>
          </View>
        </ScrollView>
      ) : (
        <WebView
          ref={webViewRef}
          source={{ uri: url }}
          style={styles.webview}
          onLoadStart={() => {
            console.log('WebView load started');
            setLoading(true);
          }}
          onLoadEnd={() => {
            console.log('WebView load ended successfully');
            setLoading(false);
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error('WebView error:', nativeEvent);
            
            const errorDetails = getErrorDetails(
              nativeEvent.code || 0,
              nativeEvent.description || 'Unknown error'
            );
            
            setError(errorDetails);
            setLoading(false);
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error('WebView HTTP error:', nativeEvent.statusCode, nativeEvent.url);
            
            let errorMessage = 'HTTP Error';
            let errorDescription = `Server returned status code ${nativeEvent.statusCode}`;
            
            if (nativeEvent.statusCode === 404) {
              errorMessage = 'Page Not Found';
              errorDescription = 'The requested page does not exist on the server.';
            } else if (nativeEvent.statusCode === 500) {
              errorMessage = 'Server Error';
              errorDescription = 'The server encountered an internal error.';
            } else if (nativeEvent.statusCode === 403) {
              errorMessage = 'Access Forbidden';
              errorDescription = 'You do not have permission to access this resource.';
            }
            
            setError({
              type: 'http',
              message: errorMessage,
              code: nativeEvent.statusCode,
              description: errorDescription
            });
            setLoading(false);
          }}
          onLoadProgress={({ nativeEvent }) => {
            console.log('WebView load progress:', nativeEvent.progress);
          }}
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          mixedContentMode="compatibility"
          allowsFullscreenVideo={true}
          allowFileAccess={true}
          originWhitelist={['*']}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  webview: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    zIndex: 1,
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  loadingSubtext: {
    marginTop: 8,
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  errorScrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },
  errorSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  errorCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 24,
    gap: 8,
  },
  errorCodeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  errorCodeValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accent,
  },
  troubleshootingContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  troubleshootingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingLeft: 8,
  },
  tipBullet: {
    fontSize: 16,
    color: colors.primary,
    marginRight: 8,
    lineHeight: 20,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  retryCountText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: '100%',
    marginBottom: 12,
    gap: 8,
  },
  buttonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  headerButton: {
    padding: 6,
  },
});
