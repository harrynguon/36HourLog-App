import * as React from 'react';
import { StyleSheet, Pressable, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const SCREEN_DIMENSIONS = Dimensions.get('screen');

export const AddButton = ({ localData, setModalVisible, navigation }) => (
	<Pressable
		style={styles.stickyIcon}
		onPress={(event) => setModalVisible(true)}
		disabled={localData.length >= 5}
	>
		<AntDesign
			name="pluscircle"
			size={48}
			color={localData.length >= 5 ? 'grey' : 'white'}
			style={styles.shadowEffects}
		/>
	</Pressable>
);

const styles = StyleSheet.create({
	stickyIcon: {
		position: 'absolute',
		left: SCREEN_DIMENSIONS.width / 1.2,
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
