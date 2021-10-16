import * as React from 'react';
import { View, Text, Button, StyleSheet, StatusBar, Dimensions } from 'react-native';
import Background from '../../common/components/Background';
import { GoBackButton } from './components/GoBackButton';

const SCREEN_DIMENSIONS = Dimensions.get('screen');

export const EditItemScreen = ({ route, navigation }) => (
	<View styles={styles.container}>
		<Background />
		<View style={styles.quoteOfTheDayContainer}>
			<Text style={{ textDecorationLine: 'underline' }}>Quote of the Day: </Text>
			<Text style={{ fontStyle: 'italic' }} numberOfLines={4}>
				{route.params.item['Description']}
			</Text>
		</View>
		<GoBackButton navigation={navigation} />
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: StatusBar.currentHeight || 60,
	},
	quoteOfTheDayContainer: {
		width: SCREEN_DIMENSIONS.width / 1.5,
		padding: 10,
		marginBottom: 20,
		borderRadius: 12,
		backgroundColor: 'white',
	},
});
