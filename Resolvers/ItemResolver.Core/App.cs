using System;
using System.Collections;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.Lambda.Core;
using Amazon.Runtime;
using ItemResolver.Core.Interface;
using ItemResolver.Core.Model;

namespace ItemResolver.Core
{
    public class App
    {
        private readonly IDynamoDbClient _dynamoDbClient;

        public App(IDynamoDbClient dynamoDbClient)
        {
            _dynamoDbClient = dynamoDbClient;
        }
        
        public async Task<Response> Run(AppSyncEvent input, ILambdaContext context)
        {
            LambdaLogger.Log(JsonSerializer.Serialize(input));
            var arguments = input.Arguments;
            
            var field = input.Info.FieldName;
            switch (field)
            {
                case Queries.GetItem:
                    var item = await _dynamoDbClient.GetItem(arguments.Input);
                    return new Response()
                    {
                        DeviceId = item.DeviceId,
                        ExpiryDate = item.ExpiryDate,
                        Description = item.Description
                    };
                
                case Queries.ListItems:
                    var items = await _dynamoDbClient.ListItems(arguments.Filter);
                    return new Response()
                    {
                        Items = items
                    };
                case Mutations.CreateItem: 
                    break;
                case Mutations.UpdateItem: 
                    break;
                case Mutations.DeleteItem: 
                    break;
                default: return null;
            }
            
            return new Response();
        }

        public class Response : Item
        {
        }
    }
}