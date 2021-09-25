import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
	Button,
	Caption,
	List,
	Paragraph,
	Portal,
	Snackbar,
	Subheading,
	Text,
	Title,
} from 'react-native-paper';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-web';

const items = [
	{
		title: 'First',
		description: 'Hello this is first item',
		momentCreated: moment(),
	},
	{
		title: 'Second',
		description: 'Yes Sir',
		momentCreated: moment().subtract(3, 'hours'),
	},
	{
		title: 'Third',
		description: 'Testing',
		momentCreated: moment().subtract(5, 'hours').subtract(10, 'minutes'),
	},
	{
		title: 'Fourth',
		description: 'No',
		momentCreated: moment().subtract(7, 'hours'),
	},
	{
		title: 'Fifth',
		description: 'Hi XD',
		momentCreated: moment().subtract(30, 'hours'),
	},
];

const RightSide = (props) => {
	var now = props.momentCreated.add(36, 'hours');
	var b = moment();
	var diff_s = now.diff(b, 'seconds');
	var diff_m = now.diff(b, 'minutes');
	var diff_h = now.diff(b, 'hours');

	let individualTimeUnit =
		diff_h >= 1
			? `${diff_h} hours remaining.`
			: diff_m >= 1
			? `${diff_m} minutes remaining.`
			: `${diff_s} seconds remaining.`;

	let timehhmmss = `${moment.utc(diff_s * 1000).format('HH:mm:ss')} remaining.`;

	if (diff_h >= 24) {
		let numHours = timehhmmss.split(':')[0];
		let correctHours = (Number.parseInt(numHours) + 24).toString();
		let numMinutes = timehhmmss.split(':')[1] ?? '00';
		let numSeconds = timehhmmss.split(':')[2] ?? '00';
		timehhmmss = `${correctHours}:${numMinutes}:${numSeconds}`;
	}

	let timeRemainingString = props.useTimestamp ? timehhmmss : individualTimeUnit;

	return (
		<View style={styles.listRightSide}>
			<TouchableOpacity onPress={props.toggleTimestampFunction}>
				<List.Icon {...props} icon={'clock-time-ten'} key={Math.random()} />
				<Text>{timeRemainingString}</Text>
			</TouchableOpacity>
		</View>
	);
};

function useToggle(initialValue = false) {
	const [value, setValue] = useState(initialValue);

	const toggle = React.useCallback(() => {
		setValue((value) => !value);
	}, []);

	return [value, toggle];
}

const HomeScreen = () => {
	const [visible, setVisible] = React.useState(false);
	const onToggleSnackBar = () => setVisible(!visible);
	const onDismissSnackBar = () => setVisible(false);

	const [useTimestamp, toggleTimestamp] = useToggle(false);

	return (
		<View style={[styles.container, styles.maxWidth]}>
			<View style={[styles.headerContainer, styles.maxWidth]}>
				<Title style={{ textDecorationLine: 'underline' }}>36 Hour Logger</Title>
				<Subheading>Log anything you want!</Subheading>
				<Paragraph style={{ fontSize: 10, fontStyle: 'italic' }}>
					You can log up to 5 items. Swipe an item to delete it.
				</Paragraph>
			</View>
			<View style={[styles.contentContainer, styles.maxWidth]}>
				{items.map((item) => (
					<List.Item
						style={{ backgroundColor: 'green', width: '100%' }}
						title={item.title}
						description={item.description}
						right={(props) => (
							<RightSide
								props={props}
								momentCreated={item.momentCreated}
								useTimestamp={useTimestamp}
								toggleTimestampFunction={toggleTimestamp}
								key={Math.random()}
							/>
						)}
					/>
				))}
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
				<Button icon={'home'} disabled={items.length === 5}>
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
