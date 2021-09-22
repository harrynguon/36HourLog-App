import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Title, Text, List, Subheading } from 'react-native-paper';

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
];

const HomeScreen = () => (
	<View style={[styles.container, styles.maxWidth]}>
		<View style={[styles.headerContainer, styles.maxWidth]}>
			<Title style={{ textDecorationLine: 'underline' }}>36 Hour Logger</Title>
			<Subheading>Log anything you want!</Subheading>
		</View>
		<View style={[styles.contentContainer, styles.maxWidth]}>
			{items.map((item) => (
				<List.Item
					style={{ backgroundColor: 'green', width: '100%' }}
					title={item.title}
					description={item.description}
					right={(props) => <List.Icon {...props} icon="folder" />}
				/>
			))}
		</View>
		<View style={[styles.footerContainer, styles.maxWidth]}>
			<Button icon={'home'}>Add</Button>
		</View>
	</View>
);

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
		height: '10%',
	},
	contentContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '80%',
		maxHeight: '80%',
		backgroundColor: 'grey',
	},
	footerContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		height: '10%',
		backgroundColor: 'purple',
	},
});
