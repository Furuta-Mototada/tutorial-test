import {
    Feather
} from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DelegationPanel from './DelegationPanel';
import VotePanel from './VotePanel';

type VotingWidgetProps = {
    mode?: 'vote' | 'delegation';

    // for Vote Panel
    votes?: number | string;
    onDecline?: () => void;
    onDelegate?: () => void;
    onAutoDelegate?: () => void;
    onVoteYes?: () => void;
    onVoteNo?: () => void;

    // for Delegation Panel
    avatarUri?: string;
    delegateName?: string;
    hasVoted?: boolean;
    onOpenProfile?: () => void;
    onSwitch?: () => void;
    onVoteMyself?: () => void;

    // always shown in the right bar
    actTitle?: string;
    category?: string;
    onExternalLink?: () => void;
};

export default function VotingWidget({
    mode = 'vote',

    // Vote props
    votes,
    onDecline,
    onDelegate,
    onAutoDelegate,
    onVoteYes,
    onVoteNo,

    // Delegation props
    avatarUri,
    delegateName,
    hasVoted,
    onOpenProfile,
    onSwitch,
    onVoteMyself,

    // Right‑bar props
    actTitle,
    category,
    onExternalLink,
}: VotingWidgetProps) {
    return (
        <View style={styles.container}>
            {/* Left bar */}
            <View style={styles.leftbar}>
                {mode === 'delegation' ? (
                    <DelegationPanel
                        avatarUri={avatarUri!}
                        delegateName={delegateName!}
                        hasVoted={hasVoted!}
                        onOpenProfile={onOpenProfile}
                        onDecline={onDecline}
                        onSwitch={onSwitch}
                        onVoteMyself={onVoteMyself}
                        onVoteYes={onVoteYes}
                        onVoteNo={onVoteNo}
                    />
                ) : (
                    <VotePanel
                        votes={votes!}
                        onDecline={onDecline}
                        onDelegate={onDelegate}
                        onAutoDelegate={onAutoDelegate}
                        onVoteYes={onVoteYes}
                        onVoteNo={onVoteNo}
                    />
                )}
            </View>
            {/* Right bar */}
            <View style={styles.rightbar}>
                <View style={styles.topbar}>
                    <View style={styles.verticalSubtitleContainer}>
                        {Array.from(actTitle || '').map((char, idx) => (
                            <Text key={idx} style={styles.verticalSubtitleChar}>
                                {char}
                            </Text>
                        ))}
                    </View>
                    <View style={styles.category}>
                        <View style={styles.verticalTitleContainer}>
                            {Array.from('国会投票').map((char, idx) => (
                                <Text key={idx} style={styles.verticalTitleChar}>
                                    {char}
                                </Text>
                            ))}
                        </View>
                        <View style={styles.categoryContainer}>
                            {Array.from(category || '').map((char, idx) => (
                                <Text key={idx} style={styles.categoryTextChar}>
                                    {char}
                                </Text>
                            ))}
                        </View>
                    </View>
                </View>
                {/* External link */}
                <TouchableOpacity
                    style={styles.externalLink}
                    onPress={onExternalLink}
                >
                    <Feather name="external-link" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFEBD0',
    },
    // Rightbar
    rightbar: {
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
    externalLink: {
        backgroundColor: '#D93025',
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topbar: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    verticalSubtitleContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap-reverse', // wraps extra characters into a new column on the left
        alignContent: 'flex-end',  // right-aligns the columns,
        alignItems: 'center',
        height: '95%',
        marginRight: 8,
    },
    verticalSubtitleChar: {
        fontSize: 12,
        fontWeight: 'bold',
        lineHeight: 13,   // adjust spacing between characters
    },
    category: {
        alignItems: 'center',
    },
    verticalTitleContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    verticalTitleChar: {
        fontSize: 30,
        fontWeight: 'bold',
        lineHeight: 34,   // adjust spacing between characters
    },
    categoryContainer: {
        backgroundColor: '#A63E86',
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 4,
    },
    categoryTextChar: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 22,   // adjust spacing between character
    },

    // Left bar
    leftbar: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
});
