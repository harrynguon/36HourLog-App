using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
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

            var attributeSet = string.Join(", ", input.Info.SelectionSetList);
            
            var field = input.Info.FieldName;
            switch (field)
            {
                case Queries.GetItem:
                    var item = await _dynamoDbClient.GetItem(arguments.Input, attributeSet);
                    return item == null ? null : new Response(item);

                case Queries.ListItems:
                    var items = await _dynamoDbClient.ListItems(arguments.Filter, attributeSet);
                    return new Response(items);
                case Mutations.CreateItem: 
                    break;
                case Mutations.UpdateItem: 
                    break;
                case Mutations.DeleteItem: 
                    break;
            }
            
            return null;
        }

        public class Response : Item
        {
            
            public Response() {}

            public Response(Item item)
            {
                DeviceId = item.DeviceId;
                ExpiryDate = item.ExpiryDate;
                Description = item.Description;
            }

            public Response(IEnumerable<Item> items)
            {
                Items = items.ToList();
            }
            
        }
    }
}