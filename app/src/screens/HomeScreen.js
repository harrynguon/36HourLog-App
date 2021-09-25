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
	Title,
	TouchableRipple,
} from 'react-native-paper';

const RightSide = (props) => {
	console.log(props.dateCreated.toLocaleString());

	// var now = props.momentCreated.add(36, 'hours');
	// var b = moment();
	// var diff_s = now.diff(b, 'seconds');
	// var diff_m = now.diff(b, 'minutes');
	// var diff_h = now.diff(b, 'hours');
	//
	// let individualTimeUnit =
	// 	diff_h >= 1
	// 		? `${diff_h} hours remaining.`
	// 		: diff_m >= 1
	// 		? `${diff_m} minutes remaining.`
	// 		: `${diff_s} seconds remaining.`;

	// let timehhmmss = `${moment.utc(diff_s * 1000).format('HH:mm:ss')} remaining.`;
	//
	// if (diff_h >= 24) {
	// 	let numHours = timehhmmss.split(':')[0];
	// 	let correctHours = (Number.parseInt(numHours) + 24).toString();
	// 	let numMinutes = timehhmmss.split(':')[1] ?? '00';
	// 	let numSeconds = timehhmmss.split(':')[2] ?? '00';
	// 	timehhmmss = `${correctHours}:${numMinutes}:${numSeconds}`;
	// }

	// let timeRemainingString = props.useTimestamp ? timehhmmss : individualTimeUnit;

	return (
		<View style={styles.listRightSide}>
			<List.Icon {...props} icon={'clock-time-ten'} key={Math.random()} />
			<Text>{props.dateCreated.toLocaleString()}</Text>
		</View>
	);
};

const HomeScreen = () => {
	const [items, setItems] = useState([
		{
			title: 'First',
			description: 'Hello this is first item',
			dateCreated: new Date(),
		},
		// {
		// 	title: 'Second',
		// 	description: 'Yes Sir',
		// 	momentCreated: moment().subtract(3, 'hours'),
		// },
		// {
		// 	title: 'Third',
		// 	description: 'Testing',
		// 	momentCreated: moment().subtract(5, 'hours').subtract(10, 'minutes'),
		// },
		// {
		// 	title: 'Fourth',
		// 	description: 'No',
		// 	momentCreated: moment().subtract(7, 'hours'),
		// },
		// {
		// 	title: 'Fifth',
		// 	description: 'Hi XD',
		// 	momentCreated: moment().subtract(30, 'hours'),
		// },
	]);

	const [visible, setVisible] = useState(false);
	const onToggleSnackBar = () => setVisible(!visible);
	const onDismissSnackBar = () => setVisible(false);

	const [modalVisible, setModalVisible] = useState(false);
	const modalVisibleSet = () => setModalVisible(true);

	console.log(modalVisible);

	// const [useTimestamp, toggleTimestamp] = useState(false);

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
						style={{ backgroundColor: 'green', width: '100%' }}
						title={item.title}
						description={item.description}
						onPress={setModalVisible}
						right={(props) => (
							<RightSide
								props={props}
								dateCreated={item.dateCreated}
								// useTimestamp={useTimestamp}
								// toggleTimestampFunction={toggleTimestamp}
								key={Math.random()}
							/>
						)}
					/>
				))}
				<Portal>
					<Modal
						visible={modalVisible}
						onDismiss={(event) => setModalVisible(false)}
						contentContainerStyle={{ backgroundColor: 'orange', padding: 20 }}
					>
						<Text>Example Modal!</Text>
					</Modal>
				</Portal>
			</View>

			<View style={[styles.footerContainer, styles.maxWidth]}>
				<Caption style={{ marginTop: -15, marginBottom: 15 }}>{items.length} / 5</Caption>
				<Portal>
					<Snackbar
						visible={visible}
						onDismiss={onDismissSnackBar}
						duration={4000}
						action={{
							label: 'Undo',
							onPress: () => {},
						}}
					>
						You have deleted item {'hi'}.
					</Snackbar>
				</Portal>
				<Button
					icon={'home'}
					disabled={items.length === 5}
					onPress={(event) =>
						setItems([
							...items,
							{
								title: 'First',
								description: 'Hello this is first item',
								dateCreated: new Date(),
							},
						])
					}
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
