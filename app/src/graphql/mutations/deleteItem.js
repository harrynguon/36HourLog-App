import { gql } from 'graphql-tag';

export default gql(`
	mutation delete {
		deleteItem(item: {Description: "s", DeviceID: "Harry1", ExpiryDate: "2024"}) {
			Description
			DeviceID
			ExpiryDate
		}
	}
`);
