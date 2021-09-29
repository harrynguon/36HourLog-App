using System;
using System.Collections;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;
using Amazon.Lambda.Core;
using ItemResolver.Lambda.Model;

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
        public ItemResponse FunctionHandler(AppSyncInput input, ILambdaContext context)
        {
            LambdaLogger.Log(JsonSerializer.Serialize(input));

            var arguments = input.Arguments;

            return new ItemResponse
            {
                DeviceId = "123",
                ExpiryDate = "456",
                Description = "789",
                NextToken = "hi"
            };
        }

        public class ItemResponse
        {
            [JsonPropertyName("Description")]
            public string Description { get; set; }
            [JsonPropertyName("DeviceID")]
            public string DeviceId { get; set; }
            [JsonPropertyName("ExpiryDate")]
            public string ExpiryDate { get; set; }
            [JsonPropertyName("nextToken")]
            public string NextToken { get; set; }
        }
    }
}