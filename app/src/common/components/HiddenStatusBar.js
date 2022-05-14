import * as React from 'react';
import { StatusBar } from 'react-native';

export const withHiddenStatusBar = (Element) => {
	return (props) => (
		<>
			<StatusBar style='hidden' />
			<Element {...props} />
		</>
	);
};
