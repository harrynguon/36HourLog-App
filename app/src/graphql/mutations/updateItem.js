import { gql } from 'graphql-tag';

export default gql(`
	mutation updateItem {
  		updateItem(item: {Description: "Heya", DeviceID: "Harry1", ExpiryDate: "20224"}) {
	 		Description
	 		DeviceID
	 		ExpiryDate
  		}
	}
`);
