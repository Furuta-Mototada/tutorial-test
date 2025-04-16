import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type StatCardProps = {
    count: number | string;
    title: string;
    subtitle?: string;
    backgroundColor: string;
    IconComponent: React.ReactNode;
    onLinkPress?: () => void;
};

export default function StatCard({
    count,
    title,
    subtitle,
    backgroundColor,
    IconComponent,
    onLinkPress,
}: StatCardProps) {
    return (
        <View style={[styles.card, { backgroundColor }]}>
            <View style={styles.cardHeader}>
                {IconComponent}
                <TouchableOpacity onPress={onLinkPress}>
                    <Feather name="external-link" size={20} color="#2E005E" />
                </TouchableOpacity>
            </View>
            <Text style={styles.count}>{count}</Text>
            {/* truncate if too long */}
            <Text
                style={styles.title}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {title}
            </Text>

            {subtitle ? (
                <Text
                    style={styles.subtitle}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {subtitle}
                </Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '48%',                 // fill equally
        height: 160,             // fixed height
        borderRadius: 12,
        padding: 12,
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    count: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
    },
});