import * as React from 'react';
import { StyleSheet, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_DIMENSIONS = Dimensions.get('screen');

export const GoBackButton = ({ navigation }) => (
	<Pressable style={styles.stickyIcon} onPress={(event) => navigation.navigate('Home')}>
		<Ionicons name="arrow-back-outline" size={48} style={styles.shadowEffects} color={'white'} />
	</Pressable>
);

const styles = StyleSheet.create({
	stickyIcon: {
		position: 'absolute',
		left: SCREEN_DIMENSIONS.width / 10,
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
