import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
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

  const titleRef = useRef(null);
  const amountRef = useRef(null);
  const participantRef = useRef(null);

  // Add participant handler
  const addParticipant = () => {
    if (newParticipant && !participants.includes(newParticipant)) {
      setParticipants([...participants, newParticipant]);
      setNewParticipant('');
      participantRef.current.focus();
    }
    //show alert if name already added
    //click on the name to edit
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
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.label}>Expense Title</Text>
      <TextInput
        ref={titleRef}
        style={styles.input}
        placeholder="Enter expense title"
        value={expenseTitle}
        onChangeText={setExpenseTitle}
        autoFocus={true}
        returnKeyType="next"
        onSubmitEditing={() => amountRef.current.focus()}
      />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        ref={amountRef}
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        returnKeyType="next"
        onSubmitEditing={() => participantRef.current.focus()}
      />

      <Text style={styles.label}>Participants</Text>
      <TextInput
        ref={participantRef}
        style={styles.input}
        placeholder="Add participant"
        value={newParticipant}
        onChangeText={setNewParticipant}
        returnKeyType="done"
        onSubmitEditing={addParticipant}
        onKeyPress={(key)=> {if(key=='Enter') addParticipant()}}
      />
      <TouchableOpacity style={styles.addButton} onPress={addParticipant}>
        <Ionicons name="add-circle-outline" size={24} color="green" />
        <Text style={styles.addButtonText}>Add Participant</Text>
      </TouchableOpacity>
      <Text style={styles.helpText}>Select participants to add contribution amount</Text>
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
                keyboardType="decimal-pad"
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
    </ScrollView>
  );
}