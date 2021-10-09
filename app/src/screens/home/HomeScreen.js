import * as React from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const data = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'First Item',
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
		title: 'Second Item',
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d72',
		title: 'Third Item',
	},
];

const SCREEN_DIMENSIONS = Dimensions.get('screen');

const SPACING = 20;
const AVATAR_SIZE = 70;

const HomeScreen = () => {
	const renderItem = (item) => (
		<View style={styles.item}>
			<Text>{item.title}</Text>
		</View>
	);

	return (
		<>
			<View style={styles.container}>
				<LinearGradient colors={['#D16BA5', '#86A8E7', '#5FFBF1']} style={styles.background} />
				<FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id} />
				<Text>hi</Text>
			</View>
		</>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	background: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		width: SCREEN_DIMENSIONS.width,
		height: SCREEN_DIMENSIONS.height,
	},
	item: {
		backgroundColor: 'green',
	},
});
