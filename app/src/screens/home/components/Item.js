import * as React from 'react';
import { Text, TextInput, View, StyleSheet, Dimensions, Pressable } from 'react-native';

const SPACING = 15;
const SCREEN_DIMENSIONS = Dimensions.get('screen');

const Item = ({ item, navigation }) => {
	console.log(item);
	return (
		<Pressable
			onPress={(event) => navigation.navigate('EditItem', { item: item })}
			style={{ backgroundColor: 'green' }}
		>
			<View style={styles.item}>
				<View style={{ flex: 0.75 }}>
					<Text style={{ fontWeight: 'bold' }}>{item['Description']}</Text>
				</View>
				<View style={{ flexDirection: 'column', flex: 0.25 }}>
					<Text>Expires in</Text>
					<Text style={{ fontWeight: 'bold' }}>{item['ExpiryDate']}</Text>
				</View>
			</View>
		</Pressable>
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
