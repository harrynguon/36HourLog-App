import * as React from 'react';
import { Modal, Pressable, Text, TextInput, View, StyleSheet, Dimensions } from 'react-native';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import createItem from '../../../graphql/mutations/createItem';

const SCREEN_DIMENSIONS = Dimensions.get('screen');

export const AddNewItemModal = ({ visible, onRequestClose, closeModal, refetch }) => {
	const [text, onChangeText] = useState('');

	const [addItem, { data, loading, error }] = useMutation(createItem);

	const addItemAsync = async (params) => {
		await addItem(params);
	};

	return (
		<Modal animationType="fade" transparent visible={visible} onRequestClose={onRequestClose}>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View style={styles.addEntryModal}>
					<Text style={{ marginBottom: 15, textAlign: 'center', fontWeight: 'bold' }}>
						Log a new entry
					</Text>
					<TextInput
						style={styles.modalInputText}
						onChangeText={onChangeText}
						placeholder="I will do this..."
						placeholderTextColor={'grey'}
						value={text}
					/>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							margin: 10,
						}}
					>
						<Pressable
							style={[styles.addEntryModalButton, { backgroundColor: 'orangered' }]}
							onPress={closeModal}
						>
							<Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Cancel</Text>
						</Pressable>
						<Pressable
							style={[styles.addEntryModalButton, { backgroundColor: 'lightgreen' }]}
							onPress={async (event) => {
								await addItemAsync({
									variables: {
										DeviceID: 'Harry1',
										ExpiryDate: new Date(new Date().setHours(new Date().getHours() + 36)),
										Description: text,
									},
								}).then(async (response) => {
									await closeModal();
									await onChangeText('');
									await refetch();
								});
							}}
						>
							<Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Done</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	addEntryModal: {
		width: SCREEN_DIMENSIONS.width / 2,
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	addEntryModalButton: {
		borderRadius: 10,
		padding: 10,
		paddingHorizontal: 15,
		elevation: 2,
		marginHorizontal: 10,
	},
	modalInputText: {
		width: 150,
		borderRadius: 10,
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});
