using System;
using System.Collections;
using System.Collections.Generic;
using System.Text.Json;
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
        
        public string Run(Object input, ILambdaContext context)
        {

            LambdaLogger.Log(JsonSerializer.Serialize(input));
            return JsonSerializer.Serialize(input);
            

            // var items = _dynamoDbClient.GetItem("asdkl2lk3m2").Result;
            //
            // foreach (var item in items)
            // {
            //     LambdaLogger.Log(item.Description);
            //     LambdaLogger.Log(item.DeviceId);
            //     LambdaLogger.Log(item.ExpiryDate);
            //     LambdaLogger.Log(item.NextToken ?? "nexttoken is null");
            // }
            //
            // var arguments = input.Arguments;
            //
            // // Operation
            // var field = input.Info.FieldName;
            // switch (field)
            // {
            //     case Queries.GetItem :
            //         return new Response()
            //         {
            //             DeviceId = "123",
            //             ExpiryDate = "456",
            //             Description = "789"
            //         };
            //     case Queries.ListItems :
            //         return new Response()
            //         {
            //             Items = new List<Item>()
            //             {
            //                 new Response()
            //                 {
            //                     DeviceId = "xcvxcvsd",
            //                     ExpiryDate = "xcvdfgb",
            //                     Description = "dfhbf"
            //                 }
            //             },
            //             NextToken = "Yes"
            //         };
            //         break;
            //     case Mutations.CreateItem : 
            //         break;
            //     case Mutations.UpdateItem : 
            //         break;
            //     case Mutations.DeleteItem : 
            //         break;
            //     default: return null;
            // }
            //
            // return new Response();
        }

        public class Response : Item
        {
        }
    }
}