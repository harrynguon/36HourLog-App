import React from 'react';
import HomeScreen from './src/screens/home/HomeScreen';
import { useFonts, SourceSansPro_400Regular } from '@expo-google-fonts/source-sans-pro';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, Text } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ApolloLink } from 'apollo-link';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createHttpLink } from 'apollo-link-http';
import Config from 'react-native-config';

export default function App() {
	let [fontsLoaded] = useFonts({ SourceSansPro_400Regular });

	const url = Config.REACT_APP_API_URL;
	const region = Config.REACT_APP_REGION;
	const auth = Config.REACT_APP_AUTH;

	console.log('we here: ' + url);

	const link = ApolloLink.from([
		createAuthLink({ url, region, auth }),
		createHttpLink({ uri: url }),
	]);
	const client = new ApolloClient({
		link,
		cache: new InMemoryCache(),
	});

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
			<ApolloProvider client={client}>
				<HomeScreen />
				<StatusBar style="auto" />
			</ApolloProvider>
		);
	}
}
