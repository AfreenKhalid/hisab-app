import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const groups = [
    {
        id: '1',
        title: 'Friends Trip',
        currency: 'USD',
        members: ['Alice', 'Bob', 'Charlie']
    },
    {
        id: '2',
        title: 'Family Expenses',
        currency: 'EUR',
        members: ['David', 'Eve', 'Frank']
    },
    {
        id: '3',
        title: 'Office Group',
        currency: 'GBP',
        members: ['Grace', 'Heidi', 'Ivan']
    }
];
const GroupCard = ({ group }) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.groupTitle}>{group.title}</Text>
                {/* Share icon for group invite */}
                <TouchableOpacity style={styles.shareButton}>
                    <Ionicons name="share-outline" size={24} color="#007BFF" />
                </TouchableOpacity>
            </View>
            <Text style={styles.currency}>Currency: {group.currency}</Text>
            <Text style={styles.members}>Members: {group.members.join(', ')}</Text>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>Add Expense</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>View History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>Settle Expenses</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default function HomeScreen({ navigation }, props) {
    return (
        <View style={styles.container}>
            {/* Round button for New Expense */}
            <TouchableOpacity style={styles.newExpenseButton}>
                <Ionicons name="add-circle-outline" size={30} color="white" />
                <Text style={styles.buttonText} onPress={() => navigation.navigate('Add Expense')}>New Expense</Text>
            </TouchableOpacity>

            {/* Section marker */}
            <Text style={styles.sectionMarker}>Your Groups</Text>

            {/* Group list */}
            <FlatList
                data={groups}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <GroupCard group={item} />}
            />
        </View>
    )
}