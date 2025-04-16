import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type PanelProps = {
  avatarUri: string;
  delegateName: string;
  hasVoted: boolean;
  onOpenProfile?: () => void;
  onDecline?: () => void;
  onSwitch?: () => void;
  onVoteMyself?: () => void;
  onVoteYes?: () => void;
  onVoteNo?: () => void;
};

export default function DelegationPanel({
  avatarUri,
  delegateName,
  hasVoted,
  onOpenProfile,
  onDecline,
  onSwitch,
  onVoteMyself,
  onVoteYes,
  onVoteNo,
}: PanelProps) {
  return (
    <View style={styles.main}>
      {/* Delegated to */}
      <Text style={styles.delegatedLabel}>Delegated to:</Text>
      <Image source={{ uri: avatarUri }} style={styles.avatar} />
      <TouchableOpacity
        style={styles.nameRow}
        onPress={onOpenProfile}
      >
        <Text style={styles.name}>{delegateName}</Text>
        <MaterialCommunityIcons
          name="open-in-new"
          size={20}
          color="#000"
          style={{ marginLeft: 6 }}
        />
      </TouchableOpacity>

      {/* Action buttons */}
      <TouchableOpacity
        style={[styles.button, styles.decline]}
        onPress={onDecline}
      >
        <MaterialCommunityIcons name="cancel" size={20} color="#fff" />
        <Text style={styles.buttonText}>Decline</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.switch]}
        onPress={onSwitch}
      >
        <MaterialCommunityIcons name="plus-circle" size={20} color="#fff" />
        <Text style={styles.buttonText}>Switch</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.voteMyself]}
        onPress={onVoteMyself}
      >
        <FontAwesome5 name="award" size={20} color="#fff" />
        <Text style={styles.buttonText}>Vote Myself</Text>
      </TouchableOpacity>

      {/* Voter Status */}
      <Text style={styles.sectionHeader}>{delegateName}</Text>
      <Text style={styles.voterStatus}>
        {hasVoted ? 'has already voted' : 'has not voted yet'}
      </Text>
      <View style={styles.voteRow}>
        <TouchableOpacity
          style={[styles.voteButton, styles.yes]}
          onPress={onVoteYes}
          disabled={true}
        >
          <Feather name="thumbs-up" size={24} color="#fff" />
          {!hasVoted && (
            <MaterialCommunityIcons
              name="lock"
              size={16}
              color="#fff"
              style={styles.lockIcon}
            />
          )}
          <Text style={styles.voteText}>YES</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.voteButton, styles.no]}
          onPress={onVoteNo}
          disabled={true}
        >
          <Feather name="thumbs-down" size={24} color="#fff" />
          {!hasVoted && (
            <MaterialCommunityIcons
              name="lock"
              size={16}
              color="#fff"
              style={styles.lockIcon}
            />
          )}
          <Text style={styles.voteText}>NO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
  },
  delegatedLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#45008F',
    marginBottom: 5,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    width: '90%',
    height: 40,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  decline: { backgroundColor: '#D93025' },
  switch: { backgroundColor: '#45008F' },
  voteMyself: { backgroundColor: '#34A853' },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  voterStatus: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  voteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  voteButton: {
    width: '48%',
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yes: { backgroundColor: '#3366FF' },
  no: { backgroundColor: '#FF7C7C' },
  lockIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  voteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
});