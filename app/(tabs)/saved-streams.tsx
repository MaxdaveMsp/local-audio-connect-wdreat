
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  TextInput,
  Modal,
  Platform,
} from 'react-native';
import { Stack, useRouter, useFocusEffect } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@saved_streams';

export interface SavedStream {
  id: string;
  name: string;
  url: string;
  createdAt: string;
}

export default function SavedStreamsScreen() {
  const router = useRouter();
  const [savedStreams, setSavedStreams] = useState<SavedStream[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingStream, setEditingStream] = useState<SavedStream | null>(null);
  const [editName, setEditName] = useState('');

  // Load saved streams
  const loadSavedStreams = async () => {
    try {
      console.log('Loading saved streams...');
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        const streams = JSON.parse(jsonValue);
        console.log('Loaded streams:', streams.length);
        setSavedStreams(streams);
      } else {
        console.log('No saved streams found');
        setSavedStreams([]);
      }
    } catch (e) {
      console.error('Error loading saved streams:', e);
      Alert.alert('Error', 'Failed to load saved streams');
    } finally {
      setLoading(false);
    }
  };

  // Reload streams when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadSavedStreams();
    }, [])
  );

  useEffect(() => {
    loadSavedStreams();
  }, []);

  const handleConnect = (stream: SavedStream) => {
    console.log('Connecting to saved stream:', stream.name, stream.url);
    router.push({
      pathname: '/webview',
      params: { url: stream.url },
    });
  };

  const handleEdit = (stream: SavedStream) => {
    setEditingStream(stream);
    setEditName(stream.name);
    setEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (!editingStream || !editName.trim()) {
      Alert.alert('Error', 'Please enter a name');
      return;
    }

    try {
      const updatedStreams = savedStreams.map((stream) =>
        stream.id === editingStream.id
          ? { ...stream, name: editName.trim() }
          : stream
      );

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStreams));
      setSavedStreams(updatedStreams);
      setEditModalVisible(false);
      setEditingStream(null);
      setEditName('');
      console.log('Stream renamed successfully');
    } catch (e) {
      console.error('Error saving edit:', e);
      Alert.alert('Error', 'Failed to save changes');
    }
  };

  const handleDelete = (stream: SavedStream) => {
    Alert.alert(
      'Delete Stream',
      `Are you sure you want to delete "${stream.name}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedStreams = savedStreams.filter((s) => s.id !== stream.id);
              await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStreams));
              setSavedStreams(updatedStreams);
              console.log('Stream deleted successfully');
            } catch (e) {
              console.error('Error deleting stream:', e);
              Alert.alert('Error', 'Failed to delete stream');
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Saved Streams',
            headerShown: true,
          }}
        />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Saved Streams',
          headerShown: true,
        }}
      />

      {savedStreams.length === 0 ? (
        <View style={styles.emptyContainer}>
          <IconSymbol name="bookmark.slash" color={colors.textSecondary} size={64} />
          <Text style={styles.emptyTitle}>No Saved Streams</Text>
          <Text style={styles.emptyText}>
            Save your frequently used audio streams for quick access
          </Text>
          <Text style={styles.emptySubtext}>
            Connect to a stream and tap the bookmark icon to save it
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Your Saved Streams</Text>
            <Text style={styles.headerSubtitle}>
              {savedStreams.length} {savedStreams.length === 1 ? 'stream' : 'streams'} saved
            </Text>
          </View>

          {savedStreams.map((stream) => (
            <View key={stream.id} style={styles.streamCard}>
              <Pressable
                style={styles.streamContent}
                onPress={() => handleConnect(stream)}
              >
                <View style={styles.streamIcon}>
                  <IconSymbol name="waveform" color={colors.primary} size={24} />
                </View>
                <View style={styles.streamInfo}>
                  <Text style={styles.streamName}>{stream.name}</Text>
                  <Text style={styles.streamUrl} numberOfLines={1}>
                    {stream.url}
                  </Text>
                  <Text style={styles.streamDate}>
                    Saved on {formatDate(stream.createdAt)}
                  </Text>
                </View>
              </Pressable>

              <View style={styles.streamActions}>
                <Pressable
                  style={styles.actionButton}
                  onPress={() => handleEdit(stream)}
                >
                  <IconSymbol name="pencil" color={colors.primary} size={20} />
                </Pressable>
                <Pressable
                  style={styles.actionButton}
                  onPress={() => handleDelete(stream)}
                >
                  <IconSymbol name="trash" color={colors.accent} size={20} />
                </Pressable>
              </View>
            </View>
          ))}

          <View style={styles.bottomPadding} />
        </ScrollView>
      )}

      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setEditModalVisible(false)}
        >
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Rename Stream</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter stream name"
              placeholderTextColor={colors.textSecondary}
              value={editName}
              onChangeText={setEditName}
              autoFocus
              autoCapitalize="words"
            />
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => {
                  setEditModalVisible(false);
                  setEditingStream(null);
                  setEditName('');
                }}
              >
                <Text style={styles.modalButtonTextCancel}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={handleSaveEdit}
              >
                <Text style={styles.modalButtonTextSave}>Save</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 100,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 24,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  streamCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    overflow: 'hidden',
  },
  streamContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  streamIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  streamInfo: {
    flex: 1,
  },
  streamName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  streamUrl: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  streamDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  streamActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.highlight,
    paddingHorizontal: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  bottomPadding: {
    height: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: colors.highlight,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: colors.highlight,
  },
  modalButtonSave: {
    backgroundColor: colors.primary,
  },
  modalButtonTextCancel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  modalButtonTextSave: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
});
