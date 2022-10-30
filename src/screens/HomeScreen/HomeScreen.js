import React from 'react';
import { Text, View } from 'react-native';

export default function HomeScreen({ navigation },props) {
    return (
        <View accessibilityRole="header">
            <Text>Home Screen</Text>
        </View>
    )
}