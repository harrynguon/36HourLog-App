import * as React from 'react';
import { View, Text, Button, StyleSheet, StatusBar, Dimensions, Pressable } from 'react-native';
import Background from '../../common/components/Background';
import { GoBackButton } from './components/GoBackButton';
import { useMutation } from '@apollo/client';
import deleteItem from '../../graphql/mutations/deleteItem';

const SCREEN_DIMENSIONS = Dimensions.get('screen');

export const EditItemScreen = ({ route, navigation }) => {
	const [deleteItemFn, { data, loading, error }] = useMutation(deleteItem);

	return (
		<View style={styles.container}>
			<Background colours={['#55D185', '#FFD251', '#FFB1B1']} />
			<View style={styles.quoteOfTheDayContainer}>
				<Text style={{ textDecorationLine: 'underline' }}>Quote of the Day: </Text>
				<Text style={{ fontStyle: 'italic' }} numberOfLines={4}>
					{route.params.item['Description']}
				</Text>
			</View>
			<Pressable onPress={(event) => {}}>
				<Text>Click here</Text>
			</Pressable>
			<GoBackButton navigation={navigation} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
