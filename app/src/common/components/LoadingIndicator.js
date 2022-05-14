import { ActivityIndicator, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

const LoadingIndicator = ({ text }) => (
	<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		<ActivityIndicator style={{ marginBottom: 10 }} />
		<Text>{text}</Text>
		<StatusBar style='auto' />
	</View>
);

export default LoadingIndicator;
