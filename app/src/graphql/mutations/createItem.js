import { gql } from 'graphql-tag';

export default gql(`
	mutation MyMutation {
		createItem(item: {ExpiryDate: "2024", DeviceID: "Harry1", Description: "FromAPI"}) {
		 	Description
		 	DeviceID
			ExpiryDate
		}
	}
`);
