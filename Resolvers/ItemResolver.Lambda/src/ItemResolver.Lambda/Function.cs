using System.Collections;
using System.Collections.Generic;
using System.Text.Json;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.Lambda.Core;
using Amazon.Runtime;
using ItemResolver.Lambda.Model;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace ItemResolver.Lambda
{
    public class Function
    {
        private IDictionary Environment = System.Environment.GetEnvironmentVariables();
        private AmazonDynamoDBClient _dynamoDbClient;

        /// <summary>
        /// AppSync Lambda Resolver
        /// </summary>
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public Response FunctionHandler(AppSyncInput input, ILambdaContext context)
        {
            LambdaLogger.Log(JsonSerializer.Serialize(input));
            var credentials =
                new BasicAWSCredentials("1", "2");
            var config = new AmazonDynamoDBConfig
            {
                RegionEndpoint = RegionEndpoint.APSoutheast2
            };
            _dynamoDbClient = new AmazonDynamoDBClient(credentials, config);
            
            var dynamoDbContext = new DynamoDBContext(_dynamoDbClient);

            var items = dynamoDbContext.QueryAsync<Item>("asdkl2lk3m2").GetRemainingAsync().Result;

            foreach (var item in items)
            {
                LambdaLogger.Log(item.Description);
                LambdaLogger.Log(item.DeviceId);
                LambdaLogger.Log(item.ExpiryDate);
                LambdaLogger.Log(item.NextToken ?? "nexttoken is null");
            }

            var arguments = input.Arguments;

            // Operation
            var field = input.Info.FieldName;
            switch (field)
            {
                case Queries.GetItem :
                    return new Response()
                    {
                        DeviceId = "123",
                        ExpiryDate = "456",
                        Description = "789"
                    };
                case Queries.ListItems :
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

        public class Response : Item
        {
        }
        
    }
}