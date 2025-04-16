import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type MainPanelProps = {
    votes: number | string;
    onDecline?: () => void;
    onDelegate?: () => void;
    onAutoDelegate?: () => void;
    onVoteYes?: () => void;
    onVoteNo?: () => void;
};

export default function VotePanel({
    votes,
    onDecline,
    onDelegate,
    onAutoDelegate,
    onVoteYes,
    onVoteNo,
}: MainPanelProps) {
    return (
        <View style={styles.main}>
            {/* Stat card */}
            <View style={styles.card}>
                <FontAwesome5
                    name="award"
                    size={20}
                    color="#2E005E"
                    style={styles.cardIcon}
                />
                <Text style={styles.cardCount}>{votes}</Text>
                <Text style={styles.cardLabel}>votes in my hand</Text>
            </View>

            {/* Action buttons */}
            <TouchableOpacity
                style={[styles.button, styles.decline]}
                onPress={onDecline}
            >
                <MaterialCommunityIcons name="cancel" size={20} color="#fff" />
                <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.delegate]}
                onPress={onDelegate}
            >
                <MaterialCommunityIcons name="plus-circle" size={20} color="#fff" />
                <Text style={styles.buttonText}>Delegate</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.autoDelegate]}
                onPress={onAutoDelegate}
            >
                <MaterialCommunityIcons name="rocket" size={20} color="#fff" />
                <Text style={styles.buttonText}>Auto Delegate</Text>
            </TouchableOpacity>

            {/* Cast vote section */}
            <Text style={styles.sectionHeader}>Cast Vote</Text>
            <View style={styles.voteRow}>
                <TouchableOpacity
                    style={[styles.voteButton, styles.yes]}
                    onPress={onVoteYes}
                >
                    <Feather name="thumbs-up" size={24} color="#fff" />
                    <Text style={styles.voteText}>YES</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.voteButton, styles.no]}
                    onPress={onVoteNo}
                >
                    <Feather name="thumbs-down" size={24} color="#fff" />
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
    card: {
        backgroundColor: '#DDF5D8',
        width: '90%',
        height: 120,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    cardIcon: {
        position: 'absolute',
        top: 12,
        left: 12,
    },
    cardCount: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#000',
    },
    cardLabel: {
        fontSize: 14,
        color: '#000',
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
    delegate: { backgroundColor: '#45008F' },
    autoDelegate: { backgroundColor: '#FCA5A5' },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 8,
        fontWeight: '500',
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 16,
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
    voteText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 4,
    },
});