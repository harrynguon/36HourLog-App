using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.Model;
using Amazon.Internal;
using Amazon.Lambda.Core;
using Amazon.Runtime;
using ItemResolver.Core.Interface;
using ItemResolver.Core.Model;
using ItemResolver.Core.Util;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Filter = ItemResolver.Core.Model.Filter;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace ItemResolver.Infrastructure
{
    public class DynamoDbClient : IDynamoDbClient
    {

        private readonly IConfigurationService _configurationService;

        private AmazonDynamoDBClient _client;
        private DynamoDBContext _context;

        public DynamoDbClient(IConfigurationService configurationService)
        {
            _configurationService = configurationService;

            var key = _configurationService.GetConfiguration()
                .GetValue<string>("ProgrammaticAccess")
                .Split(":");
            
            var credentials =
                new BasicAWSCredentials(key[0], key[1]);
            var config = new AmazonDynamoDBConfig
            {
                RegionEndpoint = RegionEndpoint.APSoutheast2
            };
            var dynamoDbClient = new AmazonDynamoDBClient(credentials, config);

            _client = dynamoDbClient;
            _context = new DynamoDBContext(_client);
        }
        
        /// <summary>
        /// Uses Low-level client API to retrieve only the attributes from the DB that is requested by the client.
        /// </summary>
        /// <param name="inputArguments"></param>
        /// <param name="attributeSet"></param>
        /// <returns></returns>
        public async Task<Item> GetItem(Input inputArguments, string attributeSet)
        {
            var request = new GetItemRequest
            {
                TableName = Constants.TableName,
                Key = new Dictionary<string, AttributeValue>
                {
                    {
                        $"{Constants.DeviceId}", new AttributeValue {S = inputArguments.DeviceID}
                    },
                    {
                        $"{Constants.ExpiryDate}", new AttributeValue {S = inputArguments.ExpiryDate}
                    }
                },
                ProjectionExpression = attributeSet,
                ConsistentRead = true
            };

            var response = await _client.GetItemAsync(request);

            if (!response.IsItemSet)
            {
                return null;
            }
            
            return Utilities.MapToItem(response.Item);
        }

        /// <summary>
        /// Uses Low-level client API to retrieve only the attributes from the DB that is requested by the client.
        /// </summary>
        /// <param name="filterArguments"></param>
        /// <param name="attributeSet"></param>
        /// <returns></returns>
        public async Task<List<Item>> ListItems(Filter filterArguments, string attributeSet)
        {
            var scanRequest = new ScanRequest
            {
                TableName = Constants.TableName,
                ExpressionAttributeValues = new Dictionary<string, AttributeValue>
                {
                    {
                        $":{Constants.DeviceId}", new AttributeValue { S = filterArguments.DeviceId }
                    }  
                },
                FilterExpression = $"{Constants.DeviceId} = :{Constants.DeviceId}",
                ProjectionExpression = attributeSet,
                ConsistentRead = true
            };

            var response = await _client.ScanAsync(scanRequest);

            return Utilities.MapToItem(response.Items);
        }

        public async Task<Item> CreateItem(Input inputArguments)
        {
            var item = Utilities.ConstructItemFromInput(inputArguments);
            try
            {
                await _context.SaveAsync(item);
            }
            catch (Exception e)
            {
                LambdaLogger.Log(e.Message);
                return null;
            }

            return item;
        }

        public async Task<Item> UpdateItem(Input inputArguments)
        {
            var item = Utilities.ConstructItemFromInput(inputArguments);
            var itemFromApi = await _context.LoadAsync(item);
            if (itemFromApi == null)
            {
                return null;
            }
            
            try
            {
                await _context.SaveAsync(itemFromApi);
            }
            catch (Exception e)
            {
                LambdaLogger.Log(e.Message);
                return null;
            }

            return itemFromApi;
        }

        public async Task<Item> DeleteItem(Input inputArguments)
        {
            var item = Utilities.ConstructItemFromInput(inputArguments);
            var itemFromApi = await _context.LoadAsync(item);
            if (itemFromApi == null)
            {
                return null;
            }
            try
            {
                await _context.DeleteAsync(itemFromApi);
            }
            catch (Exception e)
            {
                LambdaLogger.Log(e.Message);
                return null;
            }
            
            return itemFromApi;
        }
    }
}