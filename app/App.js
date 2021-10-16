import React from 'react';
import HomeScreen from './src/screens/home/HomeScreen';
import { useFonts, SourceSansPro_400Regular } from '@expo-google-fonts/source-sans-pro';
import { StatusBar } from 'expo-status-bar';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ApolloLink } from 'apollo-link';
import { AUTH_TYPE } from 'aws-appsync';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createHttpLink } from 'apollo-link-http';
import { API_URL, REGION, API_KEY } from '@env';
import LoadingIndicator from './src/common/components/LoadingIndicator';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditItemScreen } from './src/screens/edit_item/EditItemScreen';

const Stack = createNativeStackNavigator();

export default function App() {
	let [fontsLoaded] = useFonts({ SourceSansPro_400Regular });

	const url = API_URL;
	const region = REGION;
	const auth = {
		type: AUTH_TYPE.API_KEY,
		apiKey: API_KEY,
	};

	const link = ApolloLink.from([
		createAuthLink({ url, region, auth }),
		createHttpLink({ uri: url }),
	]);
	const client = new ApolloClient({
		link,
		cache: new InMemoryCache(),
	});

	if (!fontsLoaded) {
		return <LoadingIndicator text={'Please wait for the fonts to load...'} />;
	} else {
		return (
			<ApolloProvider client={client}>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerShown: false,
						}}
						initialRouteName={'Home'}
					>
						<Stack.Screen name="Home" component={HomeScreen} />
						<Stack.Screen name="EditItem" component={EditItemScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</ApolloProvider>
		);
	}
}
