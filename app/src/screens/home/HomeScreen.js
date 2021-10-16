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
	ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import Item from './components/Item';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import ListItems from '../../graphql/queries/listItems';
import LoadingIndicator from './components/LoadingIndicator';

const SCREEN_DIMENSIONS = Dimensions.get('screen');

const HomeScreen = () => {
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
				<LinearGradient colors={['#D16BA5', '#86A8E7', '#5FFBF1']} style={styles.background} />
				<View style={styles.quoteOfTheDayContainer}>
					<Text style={{ textDecorationLine: 'underline' }}>Quote of the Day: </Text>
					<Text style={{ fontStyle: 'italic' }}>
						{quoteOfTheDay} - {quoteOfTheDayAuthor}
					</Text>
				</View>
				<FlatList
					data={localData}
					renderItem={(item) => Item(item)}
					keyExtractor={(item, index) => item['ExpiryDate']}
				/>
				<View style={{ marginBottom: 5 }}>
					<Text>{localData.length} / 5</Text>
				</View>
				<Pressable
					style={styles.stickyIcon}
					onPress={(event) => console.log('Clicked!!!')}
					disabled={localData.length >= 5}
				>
					<AntDesign
						name="pluscircle"
						size={48}
						color={localData.length >= 5 ? 'grey' : 'white'}
						style={styles.shadowEffects}
					/>
				</Pressable>
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
	stickyIcon: {
		position: 'absolute',
		marginLeft: 50,
		left: SCREEN_DIMENSIONS.width / 1.5,
		top: SCREEN_DIMENSIONS.height / 1.15,
	},
	shadowEffects: {
		borderRadius: 32,
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
