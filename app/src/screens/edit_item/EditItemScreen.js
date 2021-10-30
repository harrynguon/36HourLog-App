import * as React from 'react';
import { useState } from 'react';
import {
	View,
	Text,
	Button,
	StyleSheet,
	StatusBar,
	Dimensions,
	Pressable,
	TextInput,
	DeviceEventEmitter,
} from 'react-native';
import Background from '../../common/components/Background';
import { GoBackButton } from './components/GoBackButton';
import { useMutation } from '@apollo/client';
import deleteItem from '../../graphql/mutations/deleteItem';
import updateItem from '../../graphql/mutations/updateItem';

const SCREEN_DIMENSIONS = Dimensions.get('screen');

export const EditItemScreen = ({ route, navigation }) => {
	const [updateItemFn] = useMutation(updateItem);
	const updateItemAsync = async (params) => {
		await updateItemFn(params);
	};

	const [deleteItemFn] = useMutation(deleteItem);
	const deleteItemAsync = async (params) => {
		await deleteItemFn(params);
	};

	const { DeviceID, ExpiryDate, Description } = route.params['item'];

	const [editedDescription, setEditedDescription] = useState(Description);

	return (
		<View style={styles.container}>
			<Background colours={['#55D185', '#FFD251', '#FFB1B1']} />
			<Text style={{ marginBottom: 5 }}>Tap to edit:</Text>
			<View style={styles.itemContainer}>
				<TextInput
					value={editedDescription}
					onChangeText={setEditedDescription}
					returnKeyType={'done'}
					onSubmitEditing={async (event) => {
						await updateItemAsync({
							variables: {
								DeviceID: DeviceID,
								ExpiryDate: ExpiryDate,
								Description: editedDescription,
							},
						}).then(async (response) => {
							DeviceEventEmitter.emit('event.refetchData', {});
						});
					}}
					style={styles.textInput}
				/>
			</View>
			<Text>Expiry Date (UTC): {ExpiryDate}</Text>
			<Pressable style={styles.deleteButton} onPress={(event) => {}}>
				<Text>Delete</Text>
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
	itemContainer: {
		justifyContent: 'center',
		width: SCREEN_DIMENSIONS.width / 1.2,
		marginBottom: 15,
		backgroundColor: 'white',
	},
	textInput: {
		borderWidth: 1,
		padding: 10,
	},
	deleteButton: {
		justifyContent: 'flex-end',
		width: '30%',
		backgroundColor: 'white',
	},
});
