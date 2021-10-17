import { gql } from 'graphql-tag';

export default gql(`
	mutation deleteItem($DeviceID: String!, $ExpiryDate: String!, $Description: String!) {
		deleteItem(item: {DeviceID: $DeviceID, ExpiryDate: $ExpiryDate, Description: $Description}) {
			Description
			DeviceID
			ExpiryDate
		}
	}
`);
