import { gql } from 'graphql-tag';

export default gql(`
	mutation updateItem($DeviceID: String!, $ExpiryDate: String!, $Description: String!) {
  		updateItem(item: {DeviceID: $DeviceID, ExpiryDate: $ExpiryDate, Description: $Description}) {
	 		Description
	 		DeviceID
	 		ExpiryDate
  		}
	}
`);
