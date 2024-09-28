import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    newExpenseButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4CAF50',
        borderRadius: 50,
        paddingVertical: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionMarker: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    groupTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    shareButton: {
        padding: 5,
    },
    currency: {
        fontSize: 14,
        color: '#555',
    },
    members: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    actionText: {
        fontSize: 14,
        color: '#007BFF',
    },
})