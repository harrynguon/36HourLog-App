import { gql } from 'graphql-tag';

export default gql(`
	query listItems {
		listItems(filter: {DeviceID: "Harry1", Operator: EQ}) {
			Items {
				Description
				DeviceID
				ExpiryDate
			}
	  }
	}
`);
