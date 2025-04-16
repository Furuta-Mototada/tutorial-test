import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    GestureResponderEvent,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type ConfirmModalProps = {
    visible: boolean;
    title: string;
    message: string;
    onCancel: (e: GestureResponderEvent) => void;
    onConfirm: (e: GestureResponderEvent) => void;
    onClose?: (e: GestureResponderEvent) => void;
    iconName?: string; // FontAwesome5 or MaterialCommunityIcons icon name
    iconSet?: 'FontAwesome5' | 'MaterialCommunityIcons'; // which icon set to use
    iconColor?: string;
};

export default function ConfirmModal({
    visible,
    title,
    message,
    onCancel,
    onConfirm,
    onClose,
    iconName = 'award',
    iconSet = 'FontAwesome5',
    iconColor = '#4CAF50',
}: ConfirmModalProps) {
    // Helper to render the correct icon
    const renderIcon = () => {
        if (iconSet === 'MaterialCommunityIcons') {
            return <MaterialCommunityIcons name={iconName as any} size={80} color={iconColor} />;
        }
        return <FontAwesome5 name={iconName as any} size={80} color={iconColor} />;
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose ?? onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    {/* Close “X” */}
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose ?? onCancel}
                    >
                        <MaterialCommunityIcons name="close" size={24} color="#000" />
                    </TouchableOpacity>

                    {/* Dynamic icon */}
                    {renderIcon()}

                    {/* Title */}
                    <Text style={styles.title}>{title}</Text>

                    {/* Message */}
                    <Text style={styles.message}>{message}</Text>

                    {/* Buttons */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onCancel}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={onConfirm}
                        >
                            <Text style={styles.confirmText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modal: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 24,
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 16,
    },
    message: {
        fontSize: 16,
        color: '#757575',
        textAlign: 'center',
        marginTop: 8,
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 48,
        width: '100%',
        justifyContent: 'space-between',
    },
    cancelButton: {
        flex: 1,
        marginRight: 8,
        paddingVertical: 12,
        backgroundColor: '#E0E0E0',
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmButton: {
        flex: 1,
        marginLeft: 8,
        paddingVertical: 12,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelText: {
        color: '#757575',
        fontSize: 16,
        fontWeight: '500',
    },
    confirmText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});
