import { gql } from 'graphql-tag';

export default gql(`
	mutation createItem($DeviceID: String!, $ExpiryDate: String!, $Description: String!) {
		createItem(item: {DeviceID: $DeviceID, ExpiryDate: $ExpiryDate, Description: $Description}) {
		 	Description
		 	DeviceID
			ExpiryDate
		}
	}
`);
