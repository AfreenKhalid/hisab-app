import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
const userName = 'John Doe';

export default function HomeScreen({ navigation }, props) {
    const [expenseTitle, setExpenseTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [participants, setParticipants] = useState([userName]); // Initialize with user's name
  const [newParticipant, setNewParticipant] = useState('');
  const [paidBy, setPaidBy] = useState([]);
  const [contributions, setContributions] = useState({});
  const [evenSplit, setEvenSplit] = useState(true);
  const [distribution, setDistribution] = useState({});

  // Add participant handler
  const addParticipant = () => {
    if (newParticipant && !participants.includes(newParticipant)) {
      setParticipants([...participants, newParticipant]);
      setNewParticipant('');
    }
  };

  // Paid by toggle and contribution handler
  const togglePaidBy = (participant) => {
    if (paidBy.includes(participant)) {
      setPaidBy(paidBy.filter((name) => name !== participant));
      const { [participant]: _, ...rest } = contributions; // Remove contribution
      setContributions(rest);
    } else {
      setPaidBy([...paidBy, participant]);
    }
  };

  // Toggle between even/uneven split
  const toggleEvenSplit = () => {
    setEvenSplit(!evenSplit);
    setDistribution({});
  };

  // Field validation function
  const validateFields = () => {
    if (!expenseTitle || !amount || isNaN(amount)) {
      alert('Please provide valid title and amount.');
      return false;
    }
    if (participants.length === 0) {
      alert('Please add at least one participant.');
      return false;
    }
    if (paidBy.length === 0) {
      alert('Please select who paid for the expense.');
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Expense Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter expense title"
        value={expenseTitle}
        onChangeText={setExpenseTitle}
      />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Participants</Text>
      <FlatList
        data={participants}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.participant}>{item}</Text>}
      />
      <TextInput
        style={styles.input}
        placeholder="Add participant"
        value={newParticipant}
        onChangeText={setNewParticipant}
      />
      <TouchableOpacity style={styles.addButton} onPress={addParticipant}>
        <Ionicons name="add-circle-outline" size={24} color="green" />
        <Text style={styles.addButtonText}>Add Participant</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Paid by</Text>
      {participants.map((participant) => (
        <View key={participant} style={styles.paidByContainer}>
          <Text>{participant}</Text>
          <Switch
            value={paidBy.includes(participant)}
            onValueChange={() => togglePaidBy(participant)}
          />
          {paidBy.includes(participant) && (
            <TextInput
              style={styles.contributionInput}
              placeholder="Amount contributed"
              keyboardType="numeric"
              value={contributions[participant] || ''}
              onChangeText={(text) => setContributions({ ...contributions, [participant]: text })}
            />
          )}
        </View>
      ))}

      <Text style={styles.label}>Expense Distribution</Text>
      <View style={styles.switchContainer}>
        <Text>Even</Text>
        <Switch value={!evenSplit} onValueChange={toggleEvenSplit} />
        <Text>Uneven</Text>
      </View>

      {!evenSplit && (
        <>
          <Text style={styles.helpText}>Distribute the amount. Remaining: {amount - Object.values(distribution).reduce((a, b) => a + parseFloat(b || 0), 0)}</Text>
          {participants.map((participant) => (
            <View key={participant} style={styles.paidByContainer}>
              <Text>{participant}</Text>
              <TextInput
                style={styles.contributionInput}
                placeholder="Amount"
                keyboardType="numeric"
                value={distribution[participant] || ''}
                onChangeText={(text) => setDistribution({ ...distribution, [participant]: text })}
              />
            </View>
          ))}
        </>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={validateFields}>
        <Text style={styles.submitButtonText}>Submit Expense</Text>
      </TouchableOpacity>
    </View>
  );
}