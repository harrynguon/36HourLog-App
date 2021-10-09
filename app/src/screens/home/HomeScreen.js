import * as React from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	Dimensions,
	StatusBar,
	TextInput,
	Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Item from './components/Item';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import ListItemsQuery from '../../graphql/queries/listItemsQuery';

const SCREEN_DIMENSIONS = Dimensions.get('screen');

const HomeScreen = () => {
	const [quoteOfTheDay, setQuoteOfTheDay] = useState('');
	const [quoteOfTheDayAuthor, setQuoteOfTheDayAuthor] = useState('');

	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('https://quotes.rest/qod?language=en');
				const json = await response.json();
				setQuoteOfTheDay(json['contents']['quotes'][0]['quote']);
				setQuoteOfTheDayAuthor(json['contents']['quotes'][0]['author']);
			} catch (error) {
				console.log('error', error);
			}
		};

		fetchData();

		// const { loading, error, data } = useQuery(ListItemsQuery);
	}, []);

	return (
		<View style={styles.container}>
			<LinearGradient colors={['#D16BA5', '#86A8E7', '#5FFBF1']} style={styles.background} />
			<View style={styles.quoteOfTheDayContainer}>
				<Text style={{ textDecorationLine: 'underline' }}>Quote of the Day: </Text>
				<Text style={{ fontStyle: 'italic' }}>
					{quoteOfTheDay} - {quoteOfTheDayAuthor}
				</Text>
			</View>
			<FlatList
				data={data}
				renderItem={(item) => Item(item)}
				keyExtractor={(item, index) => item.deviceId + index + Math.random()}
			/>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: StatusBar.currentHeight || 60,
	},
	background: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		width: SCREEN_DIMENSIONS.width,
		height: SCREEN_DIMENSIONS.height,
	},
	quoteOfTheDayContainer: {
		width: SCREEN_DIMENSIONS.width / 1.5,
		padding: 10,
		marginBottom: 20,
		borderRadius: 12,
		backgroundColor: 'white',
	},
});
