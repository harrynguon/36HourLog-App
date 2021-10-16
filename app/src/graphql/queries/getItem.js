import { gql } from 'graphql-tag';

export default gql(`
	query getItem {
		getItem(item: {ExpiryDate: "2022", DeviceID: "Harry1", Description: "First item"}) {
	 		Description
	 		DeviceID
	 		ExpiryDate
	 	}
	}
`);
