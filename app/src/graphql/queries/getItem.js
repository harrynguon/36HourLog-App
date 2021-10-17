import { gql } from 'graphql-tag';

export default gql(`
	query getItem($DeviceID: String!, $ExpiryDate: String!, $Description: String!) {
		getItem(item: {DeviceID: $DeviceID, ExpiryDate: $ExpiryDate, Description: $Description}) {
	 		Description
	 		DeviceID
	 		ExpiryDate
	 	}
	}
`);
