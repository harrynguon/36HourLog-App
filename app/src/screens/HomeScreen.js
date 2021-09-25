import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
	Button,
	Caption,
	List,
	Modal,
	Paragraph,
	Portal,
	Snackbar,
	Subheading,
	Text,
	TextInput,
	Title,
} from 'react-native-paper';

const RightSide = (props) => {
	return (
		<View style={styles.listRightSide}>
			<Text>Valid Until: </Text>
			<Text>{props.expiryDate.toLocaleString()}</Text>
		</View>
	);
};

const HomeScreen = () => {
	const [items, setItems] = useState([]);

	const [snackbarVisible, setSnackbarVisible] = useState(false);
	// const onToggleSnackBar = () => setVisible(!visible);
	const onDismissSnackBar = () => setSnackbarVisible(false);

	const [modalVisible, setModalVisible] = useState(false);

	const [inputText, setInputText] = useState('');
	const [listItemReference, setListItemReference] = useState(null);

	const [snapshot, setSnapshot] = useState();

	const handleUpdateText = (text, editing = true) => {
		let itemsCopy = [...items];
		let referenceIndex = itemsCopy.findIndex((item) => item === listItemReference);
		itemsCopy[referenceIndex]['description'] = text;
		if (editing) {
			setInputText(text);
		}
		setItems(itemsCopy);
	};

	const [addNewModalVisible, setAddNewModalVisible] = useState(false);
	const [addNewModalText, setAddNewModalText] = useState('');

	return (
		<View style={[styles.container, styles.maxWidth]}>
			<View style={[styles.headerContainer, styles.maxWidth]}>
				<Title style={{ textDecorationLine: 'underline' }}>36 Hour Logger</Title>
				<Subheading>Log anything you want!</Subheading>
				<Paragraph style={{ textAlign: 'center', fontSize: 10, fontStyle: 'italic' }}>
					You can log up to 5 items. Swipe an item to delete it. Items are automatically
					deleted after 36 hours.
				</Paragraph>
			</View>

			<View style={[styles.contentContainer, styles.maxWidth]}>
				{items.map((item) => (
					<List.Item
						style={{
							backgroundColor: 'green',
							width: '100%',
							padding: '15px',
							margin: 3,
						}}
						description={item.description}
						onPress={(event) => {
							setModalVisible(true);
							setInputText(item.description);
							setListItemReference(item);
							setSnapshot(item.description);
						}}
						right={(props) => (
							<RightSide props={props} expiryDate={item.expiryDate} key={Math.random()} />
						)}
					/>
				))}
				<Portal>
					<Modal
						visible={modalVisible}
						onDismiss={(event) => {
							setModalVisible(false);
							if (snapshot !== listItemReference.description) {
								setSnackbarVisible(true);
							}
						}}
						contentContainerStyle={{ backgroundColor: 'blue', padding: 20 }}
					>
						<TextInput
							label="Modify Text"
							value={inputText}
							onChangeText={(text) => {
								handleUpdateText(text);
							}}
						/>
					</Modal>
				</Portal>
				<Portal>
					<Modal
						visible={addNewModalVisible}
						onDismiss={(event) => {
							if (addNewModalText.trim().length >= 1) {
								let itemsCopy = [...items];
								itemsCopy.push({
									description: addNewModalText,
									expiryDate: new Date(new Date().setHours(new Date().getHours() + 36)),
								});
								setItems(itemsCopy);
								setAddNewModalText('');
							}
							setAddNewModalVisible(false);
						}}
						contentContainerStyle={{ backgroundColor: 'yellow', padding: 20 }}
					>
						<TextInput
							label="Add a new item"
							value={addNewModalText}
							onChangeText={(text) => {
								setAddNewModalText(text);
							}}
						/>
					</Modal>
				</Portal>
			</View>

			<View style={[styles.footerContainer, styles.maxWidth]}>
				<Caption style={{ marginTop: -15, marginBottom: 15 }}>{items.length} / 5</Caption>
				<Portal>
					<Snackbar
						visible={snackbarVisible}
						onDismiss={onDismissSnackBar}
						duration={3000}
						action={{
							label: 'Yes',
							onPress: (event) => {
								if (snapshot !== listItemReference.description) {
									handleUpdateText(snapshot, false);
								}
							},
						}}
					>
						Undo changes?.
					</Snackbar>
				</Portal>
				<Button
					icon={'home'}
					disabled={items.length >= 5}
					onPress={(event) => {
						setAddNewModalVisible(true);
					}}
				>
					Add
				</Button>
			</View>
		</View>
	);
};

// Long press to hold and view modal of full text information

export default HomeScreen;

const styles = StyleSheet.create({
	maxWidth: {
		width: '100%',
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: 'cyan',
	},
	headerContainer: {
		backgroundColor: 'red',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '15%',
	},
	contentContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '70%',
		backgroundColor: 'grey',
	},
	footerContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '15%',
		backgroundColor: 'purple',
	},
	listRightSide: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
