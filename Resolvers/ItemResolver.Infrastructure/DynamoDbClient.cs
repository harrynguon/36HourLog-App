// using System;
// using System.Collections.Generic;
// using System.Linq;
// using Amazon.DynamoDBv2;
// using Amazon.Lambda.Core;
// using ItemResolver.Lambda.Interface;
// using ItemResolver.Lambda.Response;
//
// namespace ItemResolver.Infrastructure
// {
//     public class DynamoDbClient : IDynamoDb
//     {
//
//         private AmazonDynamoDBClient _dynamoDbClient;
//
//         public DynamoDbClient(AmazonDynamoDBClient client)
//         {
//             LambdaLogger.Log(string.Join(", ", client.ListTablesAsync().Result.TableNames));
//             _dynamoDbClient = client;
//         }
//         
//         public Item GetItem()
//         {
//             throw new NotImplementedException();
//         }
//
//         public List<Item> ListItems()
//         {
//             throw new NotImplementedException();
//         }
//     }
// }