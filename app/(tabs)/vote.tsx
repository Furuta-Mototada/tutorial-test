import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import ConfirmModal from "../../components/ConfirmModal";
import StatCard from "../../components/StatCard";
import VotingWidget from "../../components/VotingWidget";

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

export default function VoteScreen() {
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
            <View
                style={styles.cardsRow}
            >
                <StatCard
                    count="5"
                    title="votes to cast"
                    subtitle="received: 3"
                    backgroundColor="#DDF5D8"
                    IconComponent={
                        <FontAwesome5 name="award" size={24} color="#2E005E" />
                    }
                    onLinkPress={() => console.log("Link Pressed")}
                />
                <StatCard
                    count="24"
                    title="votes casted"
                    backgroundColor="#E3DBF2"
                    IconComponent={
                        <MaterialCommunityIcons
                            name="clipboard-check"
                            size={24}
                            color="#2E005E"
                        />
                    }
                    onLinkPress={() => console.log("Link Pressed")}
                />
            </View>
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
        backgroundColor: "#fff",
    },
    cardsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        alignItems: 'center',
    },
    cardWrapper: {
        width: 300,         // fixed width
        marginRight: 16,    // spacing between cards
    },
});