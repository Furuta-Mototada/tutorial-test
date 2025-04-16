// screens/DashboardScreen.tsx
import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ConfirmModal from "../../components/ConfirmModal";
import StatCard from "../../components/StatCard";
import VotingWidget from "../../components/VotingWidget";


const categories = ['GENERAL', 'EDUCATION', 'TECHNOLOGY'];

const autoDelegateTo = {
    avatar: 'https://i.pravatar.cc/150?img=12',
    name: 'John Doe',
    role: 'Professor',
    category: 'Education',
    timeAgo: '41 minutes ago',
};

const receivedFrom = {
    avatar: 'https://i.pravatar.cc/150?img=32',
    name: 'John Smith',
};

type VoteData = {
    mode: "vote" | "delegation";
    // for vote mode
    votes?: number;
    // for both
    category: string;
    actTitle: string;
    // for delegation mode
    avatarUri?: string;
    delegateName?: string;
    hasVoted?: boolean;
};

export default function DelegateScreen() {
    const incomingRequests = 10;
    const userName = 'Jane Doe';
    const avatarUrl = 'https://i.pravatar.cc/150?img=5';
    const [selectedCat, setSelectedCat] = useState(categories[1]);

    // Modal state
    const [modalVisible, setModalVisible] = useState(false);
    const [modalAction, setModalAction] = useState<null | { idx: number; action: string }>(null);


    const votesData: VoteData[] = [
        // === Vote panel entries ===
        {
            mode: "vote",
            votes: 4,
            category: "教育",
            actTitle:
                "義務教育諸学校等の施設費の国庫負担等に関する法律の一部を改正する法律案",
        },
        {
            mode: "vote",
            votes: 2,
            category: "地方創生",
            actTitle:
                "地域人口の急減に対処するための特定地域づくり事業の推進に関する法律の一部を改正する法律案",
        },

        // === Delegation panel example ===
        {
            mode: "delegation",
            category: "安全保障",
            actTitle:
                "サイバー安全保障を確保するための能動的サイバー防御等に係る態勢の整備の推進に関する法律案",
            avatarUri: "https://i.pravatar.cc/150?img=12",
            delegateName: "John Doe",
            hasVoted: false,
        },
    ];

    // Handler to open modal for a given action
    const handleAction = (idx: number, action: string) => {
        setModalAction({ idx, action });
        setModalVisible(true);
    };

    // Handler for confirming action
    const handleConfirm = () => {
        if (modalAction) {
            console.log(modalAction.idx, modalAction.action);
        }
        setModalVisible(false);
        setModalAction(null);
    };

    // Handler for cancel/close
    const handleCancel = () => {
        setModalVisible(false);
        setModalAction(null);
    };

    // Modal title/message/icon mapping
    const getModalContent = () => {
        if (!modalAction) return { title: '', message: '', iconName: 'award', iconSet: 'FontAwesome5', iconColor: '#4CAF50' };
        switch (modalAction.action) {
            case 'decline':
                return { title: 'Decline', message: 'Are you sure you want to decline?', iconName: 'cancel', iconSet: 'MaterialCommunityIcons', iconColor: '#D93025' };
            case 'delegate':
                return { title: 'Delegate', message: 'Are you sure you want to delegate your vote?', iconName: 'plus-circle', iconSet: 'MaterialCommunityIcons', iconColor: '#45008F' };
            case 'auto':
                return { title: 'Auto Delegate', message: 'Are you sure you want to auto delegate your vote?', iconName: 'rocket', iconSet: 'MaterialCommunityIcons', iconColor: '#FCA5A5' };
            case 'yes':
                return { title: 'Vote YES', message: 'Are you sure you want to vote YES?', iconName: 'thumbs-up', iconSet: 'Feather', iconColor: '#3366FF' };
            case 'no':
                return { title: 'Vote NO', message: 'Are you sure you want to vote NO?', iconName: 'thumbs-down', iconSet: 'Feather', iconColor: '#FF7C7C' };
            case 'switch':
                return { title: 'Switch', message: 'Are you sure you want to switch delegate?', iconName: 'plus-circle', iconSet: 'MaterialCommunityIcons', iconColor: '#45008F' };
            case 'vote myself':
                return { title: 'Vote Myself', message: 'Are you sure you want to vote yourself?', iconName: 'award', iconSet: 'FontAwesome5', iconColor: '#34A853' };
            default:
                return { title: '', message: '', iconName: 'award', iconSet: 'FontAwesome5', iconColor: '#4CAF50' };
        }
    };

    const modalContent = getModalContent();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                    <Text style={styles.greeting}>Hello, {userName}</Text>
                </View>

                {/* Banner */}
                <View style={styles.banner}>
                    <Text style={styles.bannerTitle}>Incoming Delegation!</Text>
                    <Text style={styles.bannerSubtitle}>
                        There are {incomingRequests} requests to delegate votes to you.
                    </Text>
                    <TouchableOpacity
                        style={styles.bannerButton}
                        onPress={() => console.log('Claim Now tapped')}
                    >
                        <Text style={styles.bannerButtonText}>Claim Now</Text>
                    </TouchableOpacity>
                </View>

                {/* Stats row */}
                <View style={styles.cardsRow}>
                    <StatCard
                        count={18}
                        title="votes in my hand"
                        subtitle="received: 3"
                        backgroundColor="#DDF5D8"
                        IconComponent={
                            <FontAwesome5 name="award" size={24} color="#2E005E" />
                        }
                        onLinkPress={() => console.log('Card 1 link')}
                    />
                    <StatCard
                        count={8}
                        title="votes delegated"
                        backgroundColor="#E3DBF2"
                        IconComponent={
                            <MaterialCommunityIcons
                                name="account-multiple"
                                size={24}
                                color="#2E005E"
                            />
                        }
                        onLinkPress={() => console.log('Card 2 link')}
                    />
                </View>
                {/* Delegation */}
                <View style={styles.section}>
                    {/* Category selector */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryScroll}
                    >
                        {categories.map(cat => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryTab,
                                    selectedCat === cat && styles.categoryTabActive,
                                ]}
                                onPress={() => setSelectedCat(cat)}
                            >
                                <Text
                                    style={[
                                        styles.categoryTabText,
                                        selectedCat === cat && styles.categoryTabTextActive,
                                    ]}
                                >
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Auto Delegated To */}
                    <Text style={styles.subHeader}>Auto Delegated to:</Text>
                    <View style={styles.autoCard}>
                        <Image source={{ uri: autoDelegateTo.avatar }} style={styles.userAvatar} />
                        <View style={styles.userInfo}>
                            <View style={styles.nameRow}>
                                <Text style={styles.userName}>{autoDelegateTo.name}</Text>
                                <TouchableOpacity onPress={() => console.log('External link')}>
                                    <Feather name="external-link" size={16} color="#000" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.tagsRow}>
                                <View style={styles.tag}><Text style={styles.tagText}>{autoDelegateTo.role}</Text></View>
                                <View style={styles.tag}><Text style={styles.tagText}>{autoDelegateTo.category}</Text></View>
                            </View>
                            <View style={styles.timeRow}>
                                <Feather name="message-circle" size={14} color="#000" />
                                <Text style={styles.timeText}>{autoDelegateTo.timeAgo}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.smallBtn, styles.switchBtn]} onPress={() => handleAction(0, "switch")}>
                            <Feather name="corner-up-left" size={16} color="#fff" />
                            <Text style={styles.smallBtnText}>Switch</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.smallBtn, styles.voteSelfBtn]} onPress={() => handleAction(0, "vote myself")}>
                            <FontAwesome5 name="award" size={16} color="#fff" />
                            <Text style={styles.smallBtnText}>Vote Myself</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Received From */}
                    <Text style={styles.subHeader}>Received from:</Text>
                    <View style={styles.receivedRow}>
                        <Image source={{ uri: receivedFrom.avatar }} style={styles.userAvatarSmall} />
                        <View style={styles.receivedInfo}>
                            <Text style={styles.userName}>{receivedFrom.name}</Text>
                            <TouchableOpacity onPress={() => console.log('View more')}>
                                <Text style={styles.viewMore}>View More</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.declineIcon} onPress={() => handleAction(0, "decline")}>
                            <MaterialCommunityIcons name="cancel" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* VotingWidget list */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {votesData.map((item, idx) => (
                            <View key={idx} style={styles.cardWrapper}>
                                <VotingWidget
                                    mode={item.mode}
                                    // vote‑only props
                                    votes={item.votes}
                                    onDecline={() => handleAction(idx, "decline")}
                                    onDelegate={() => handleAction(idx, "delegate")}
                                    onAutoDelegate={() => handleAction(idx, "auto")}
                                    onVoteYes={() => handleAction(idx, "yes")}
                                    onVoteNo={() => handleAction(idx, "no")}

                                    // delegation‑only props
                                    avatarUri={item.avatarUri}
                                    delegateName={item.delegateName}
                                    hasVoted={item.hasVoted}
                                    onOpenProfile={() => console.log(idx, "profile")}
                                    onSwitch={() => handleAction(idx, "switch")}
                                    onVoteMyself={() => handleAction(idx, "vote myself")}

                                    // always‑present props
                                    category={item.category}
                                    actTitle={item.actTitle}
                                    onExternalLink={() => console.log(idx, "link")}
                                />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
            <ConfirmModal
                visible={modalVisible}
                title={modalContent.title}
                message={modalContent.message}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
                onClose={handleCancel}
                iconName={modalContent.iconName}
                iconSet={modalContent.iconSet}
                iconColor={modalContent.iconColor}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginTop: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    greeting: {
        marginTop: 8,
        fontSize: 20,
        fontWeight: '500',
    },

    banner: {
        backgroundColor: '#45008F',
        padding: 16,
        marginTop: 24,
        alignItems: 'center',
    },
    bannerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    bannerSubtitle: {
        color: '#fff',
        fontSize: 14,
        marginTop: 4,
        textAlign: 'center',
    },
    bannerButton: {
        marginTop: 12,
        backgroundColor: '#FCA5A5',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 6,
    },
    bannerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    cardsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        paddingHorizontal: 20,
    },
    section: {
        marginTop: 32,
        backgroundColor: '#9C2560',
        borderRadius: 12,
        padding: 16,
    },
    categoryScroll: {
        paddingBottom: 12,
    },
    categoryTab: {
        backgroundColor: '#D3A1BF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        marginRight: 8,
    },
    categoryTabActive: {
        backgroundColor: '#A63E86',
    },
    categoryTabText: {
        color: '#fff',
        fontWeight: '500',
    },
    categoryTabTextActive: {
        fontWeight: '700',
    },

    subHeader: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 12,
    },

    autoCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginTop: 8,
        alignItems: 'center',
    },
    userAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#45008F',
    },
    userInfo: {
        marginLeft: 12,
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        fontSize: 16,
        fontWeight: '700',
        marginRight: 6,
    },
    tagsRow: {
        flexDirection: 'row',
        marginTop: 4,
    },
    tag: {
        backgroundColor: '#45008F',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 6,
    },
    tagText: {
        color: '#fff',
        fontSize: 12,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    timeText: {
        marginLeft: 4,
        color: '#444',
        fontSize: 12,
    },

    buttonRow: {
        flexDirection: 'row',
        marginTop: 12,
    },
    smallBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 6,
        marginRight: 8,
    },
    switchBtn: {
        backgroundColor: '#45008F',
    },
    voteSelfBtn: {
        backgroundColor: '#34A853',
        marginRight: 0,
    },
    smallBtnText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
    },

    receivedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    userAvatarSmall: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#fff',
    },
    receivedInfo: {
        flex: 1,
        marginLeft: 8,
    },
    viewMore: {
        color: '#fff',
        textDecorationLine: 'underline',
        marginTop: 2,
    },
    declineIcon: {
        backgroundColor: '#D93025',
        padding: 6,
        borderRadius: 6,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        alignItems: 'center',
    },
    cardWrapper: {
        width: 300,         // fixed width
        height: 500,        // fixed height
        marginRight: 16,    // spacing between cards
    },
});
