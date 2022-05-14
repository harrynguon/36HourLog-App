import { Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const SCREEN_DIMENSIONS = Dimensions.get('screen');

const Background = ({ colours }) => <LinearGradient colors={colours} style={styles.background} />;

export default Background;

const styles = StyleSheet.create({
	background: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		width: SCREEN_DIMENSIONS.width,
		height: SCREEN_DIMENSIONS.height
	}
});
