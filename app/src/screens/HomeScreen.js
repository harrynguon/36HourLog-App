import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
	Button,
	Title,
	Text,
	List,
	Subheading,
	Snackbar,
	Portal,
	Caption,
	Paragraph,
} from 'react-native-paper';

const items = [
	{
		title: 'First',
		description: 'Hello this is first item',
	},
	{
		title: 'Second',
		description: 'Yes Sir',
	},
	{
		title: 'Third',
		description: 'Testing',
	},
	{
		title: 'Fourth',
		description: 'No',
	},
	{
		title: 'Fifth',
		description: 'Hi XD',
	},
];

const RightSide = (props) => (
	<View style={styles.listRightSide}>
		<List.Icon {...props} icon={'clock'} key={Math.random()} />
		<Text>{new Date().toLocaleTimeString()}</Text>
	</View>
);

const HomeScreen = () => {
	const [visible, setVisible] = React.useState(false);
	const onToggleSnackBar = () => setVisible(!visible);
	const onDismissSnackBar = () => setVisible(false);

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
						right={(props) => <RightSide props={props} key={Math.random()} />}
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
