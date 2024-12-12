import React from 'react';
import { View, Text } from 'react-native';
import { NavigationProps } from '../types/types';
import commonStyle, { darkTheme } from '../utils/Style';
import { useMessages } from '../contexts/MessagesContext';
import FooterComponent from '../components/FooterComponent';

// Component for each message in the feed
const buildMessageComponent = (msg: any, index: number) => {
    return (
    <View key={index} style={{ backgroundColor: darkTheme.cardBlack, padding: 10, borderRadius: 5, marginBottom: 10 }}>
    <Text style={[commonStyle.text, { color: darkTheme.textWhite }]}>
        <Text style={{ fontWeight: 'bold' }}>Time:</Text> {new Date(msg.timestamp).toLocaleString()}
    </Text>
    <Text style={[commonStyle.text, { color: darkTheme.textWhite }]}>
        <Text style={{ fontWeight: 'bold' }}>To:</Text> {msg.to}
    </Text>
    <Text style={[commonStyle.text, { color: darkTheme.textWhite }]}>
        <Text style={{ fontWeight: 'bold' }}>From:</Text> {msg.from}
    </Text>
    <Text style={[commonStyle.text, { color: darkTheme.textWhite }]}>
        <Text style={{ fontWeight: 'bold' }}>Message:</Text> {msg.messageBody}
    </Text>
    </View>
    )
}

// Render the message feed
const displayMessageFeed = (messages: any[]) => {
    if (messages.length === 0) {
        return (
            <Text style={[commonStyle.text, { color: darkTheme.textWhite }]}>No messages yet. Messages will show up here in reverse chronological order sas they come in.</Text>
        );
    }
    return (
        <View style={{ marginVertical: 20 }}>
            {messages.map(buildMessageComponent)}
        </View>
    )

}

// Message history page
const MessageHistoryPage: React.FC<NavigationProps<'MessageHistoryPage'>> = () => {

    // get messages from global context
    const { messages } = useMessages();

    // sort in reverse chronological order
    const sortedMessages = [...messages].sort((a, b) => b.timestamp - a.timestamp);

    return (
    <View style={[commonStyle.outerContainer, { backgroundColor: darkTheme.backgroundBlack }]}>
        <View style={commonStyle.container}>
            <Text style={[commonStyle.title, { color: darkTheme.accentYellow }]}>Message History</Text>
            {displayMessageFeed(sortedMessages)}
        </View>
        <FooterComponent />
    </View>
    );
};

export default MessageHistoryPage;
