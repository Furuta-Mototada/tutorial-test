import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#2f95dc",
                tabBarInactiveTintColor: "gray",
            }}
        >
            <Tabs.Screen
                name="vote"
                options={{
                    title: "Cast Vote",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="checkmark-done-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="delegate"
                options={{
                    title: "Delegate Vote",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-add-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}