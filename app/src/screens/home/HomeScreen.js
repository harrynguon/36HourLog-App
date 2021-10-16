import * as React from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Item from './components/Item';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import ListItems from '../../graphql/queries/listItems';
import LoadingIndicator from '../../common/components/LoadingIndicator';
import { AddButton } from './components/AddButton';
import Background from '../../common/components/Background';

const SCREEN_DIMENSIONS = Dimensions.get('screen');

const HomeScreen = ({ navigation }) => {
	const [quoteOfTheDay, setQuoteOfTheDay] = useState('');
	const [quoteOfTheDayAuthor, setQuoteOfTheDayAuthor] = useState('');

	const [localData, setLocalData] = useState([]);

	const { loading, error, data } = useQuery(ListItems);

	useEffect(() => {
		if (data) {
			setLocalData(data.listItems.Items);
		}
	}, [data]);

	if (error) {
		console.log(error);
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('https://quotes.rest/qod?language=en');
				const json = await response.json();

				const quote = json['contents']['quotes'][0]['quote'];
				if (quote) {
					setQuoteOfTheDay(quote);
				}
				const author = json['contents']['quotes'][0]['author'];
				if (author) {
					setQuoteOfTheDayAuthor(author);
				}
			} catch (error) {
				console.log('error', error);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return <LoadingIndicator text={'Retrieving your data...'} />;
	} else {
		return (
			<View style={styles.container}>
				<Background />
				<View style={styles.quoteOfTheDayContainer}>
					<Text style={{ textDecorationLine: 'underline' }}>Quote of the Day: </Text>
					<Text style={{ fontStyle: 'italic' }} numberOfLines={4}>
						{quoteOfTheDay} - {quoteOfTheDayAuthor}
					</Text>
				</View>
				<FlatList
					data={localData}
					renderItem={(item) => <Item item={item.item} navigation={navigation} />}
					keyExtractor={(item, index) => item['ExpiryDate']}
				/>
				<View style={{ marginBottom: 5 }}>
					<Text>{localData.length} / 5</Text>
				</View>
				<AddButton localData={localData} />
			</View>
		);
	}
};

export default HomeScreen;

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
