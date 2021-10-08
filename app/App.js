import React from 'react';
import { ActivityIndicator, Provider as PaperProvider, Text } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import { useFonts, SourceSansPro_400Regular } from '@expo-google-fonts/source-sans-pro';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AUTH_TYPE } from 'aws-appsync';
import { ApolloLink } from 'apollo-link';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createHttpLink } from 'apollo-link-http';

export default function App() {
	let [fontsLoaded] = useFonts({ SourceSansPro_400Regular });

	if (!fontsLoaded) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator style={{ marginBottom: 10 }} />
				<Text>Please wait for the fonts to load...</Text>
				<StatusBar style="auto" />
			</View>
		);
	} else {
		return (
			<PaperProvider>
				<HomeScreen />
				{/*<StatusBar style="auto" />*/}
			</PaperProvider>
		);
	}
}
