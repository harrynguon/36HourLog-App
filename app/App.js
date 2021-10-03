import React from 'react';
import { ActivityIndicator, Provider as PaperProvider, Text } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import { useFonts, SourceSansPro_400Regular } from '@expo-google-fonts/source-sans-pro';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery } from '@apollo/client';
// import {AWSAppSyncClient} from "aws-appsync";
import { gql } from 'graphql-tag';

export default function App() {
	let [fontsLoaded] = useFonts({ SourceSansPro_400Regular });

	const AWSAppSyncClient = require('aws-appsync').default;

	console.log(process.env.REACT_APP_API_KEY);

	const client = new AWSAppSyncClient({
		url: process.env.REACT_APP_API_URL,
		region: 'ap-southeast-2',
		auth: {
			type: 'API_KEY',
			apiKey: process.env.REACT_APP_API_KEY,
		},
		disableOffline: true,
	});

	const query = gql(`
		query listItems {
			getItem(input: {ExpiryDate: "2022", DeviceID: "Harry1", Description: "First item"}) {
				 DeviceID
				 ExpiryDate
				 Description
			}
		}
	`);

	client.hydrated().then((client) =>
		client
			.query({ query: query, fetchPolicy: 'network-only' })
			.then((data) => console.log(data.data))
			.catch((error) => {
				console.error('TEST ERR =>', error);
			})
	);

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
