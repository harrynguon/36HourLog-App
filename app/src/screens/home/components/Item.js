import * as React from 'react';
import { Text, TextInput, View, StyleSheet, Dimensions } from 'react-native';

const SPACING = 20;
const SCREEN_DIMENSIONS = Dimensions.get('screen');

const Item = ({ item }) => {
	return (
		<View style={styles.item}>
			<View style={{ flex: 0.75 }}>
				<TextInput
					style={{ fontWeight: 'bold' }}
					multiline
					returnKeyType={'done'}
					value={item.description}
					// onEndEditing={
				/>
			</View>
			<View style={{ flex: 0.25 }}>
				<Text style={{ fontWeight: 'bold' }}>23lk2m423</Text>
			</View>
		</View>
	);
};

export default Item;

const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'white',
		padding: SPACING,
		margin: SPACING,
		width: SCREEN_DIMENSIONS.width / 1.1,
		borderRadius: 12,

		// Shadow properites - iOS
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.32,
		shadowRadius: 15,

		// Shadow properties - Android
		elevation: 10,
	},
});
