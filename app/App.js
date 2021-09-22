import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './screens/HomeScreen';
import { useFonts, SourceSansPro_400Regular } from '@expo-google-fonts/source-sans-pro';
import AppLoadingPlaceholder from 'expo/build/launch/AppLoadingPlaceholder';
import { StatusBar } from 'expo-status-bar';

export default function App() {
	let [fontsLoaded] = useFonts({ SourceSansPro_400Regular });

	if (!fontsLoaded) {
		return <AppLoadingPlaceholder />;
	} else {
		return (
			<PaperProvider>
				<HomeScreen />
				<StatusBar style="auto" />
			</PaperProvider>
		);
	}
}
