using System;
using System.Collections;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;
using Amazon.Lambda.Core;
using ItemResolver.Lambda.Model;
using ItemResolver.Lambda.Response;
using Newtonsoft.Json.Linq;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace ItemResolver.Lambda
{
    public class Function
    {
        private IDictionary Environment = System.Environment.GetEnvironmentVariables();

        /// <summary>
        /// AppSync Lambda Resolver
        /// </summary>
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public Response FunctionHandler(AppSyncInput input, ILambdaContext context)
        {
            LambdaLogger.Log(JsonSerializer.Serialize(input));

            var arguments = input.Arguments;

            // Operation
            var field = input.Info.FieldName;
            LambdaLogger.Log(field);
            LambdaLogger.Log(Queries.GetItems);
            switch (field)
            {
                case Queries.GetItems :
                    // LambdaLogger.Log(JsonSerializer.Serialize(new Response()
                    // {
                    //     DeviceId = "123",
                    //     ExpiryDate = "456",
                    //     Description = "789",
                    //     HIII = new Item
                    //     {
                    //         DeviceId = "sdfgdsgds",
                    //         ExpiryDate = "45dfgfd6",
                    //         Description = "7cvbcvb89",
                    //     }
                    // }));
                // {
                //     "HIII": {
                //         "Description": "7cvbcvb89",
                //         "DeviceID": "sdfgdsgds",
                //         "ExpiryDate": "45dfgfd6",
                //         "items": null,
                //         "nextToken": null
                //     },
                //     "Description": "789",
                //     "DeviceID": "123",
                //     "ExpiryDate": "456",
                //     "items": null,
                //     "nextToken": null
                // }
                    return new Response()
                    {
                        DeviceId = "123",
                        ExpiryDate = "456",
                        Description = "789"
                    };
                
                case Queries.ListItems :
                    LambdaLogger.Log(JsonSerializer.Serialize(new Response()
                    {
                        Items = new List<Item>()
                        {
                            new Response()
                            {
                            DeviceId = "xcvxcvsd",
                            ExpiryDate = "xcvdfgb",
                            Description = "dfhbf"
                            }
                        },
                        NextToken = "Yes"
                    }));
                    return new Response()
                    {
                        Items = new List<Item>()
                        {
                            new Response()
                            {
                                DeviceId = "xcvxcvsd",
                                ExpiryDate = "xcvdfgb",
                                Description = "dfhbf"
                            }
                        },
                        NextToken = "Yes"
                    };
                    break;
                case Mutations.CreateItem : 
                    break;
                case Mutations.UpdateItem : 
                    break;
                case Mutations.DeleteItem : 
                    break;
                default: return null;
            }

            return new Response();
        }


        private string FlattenAndReturnJson(JObject objectt)
        {
            return "hi";
        }

        public class Response : Item
        {
        }
        
    }
}