using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.Internal;
using Amazon.Lambda.Core;
using Amazon.Runtime;
using ItemResolver.Core.Interface;
using ItemResolver.Core.Model;
using Microsoft.Extensions.Configuration;
using Filter = ItemResolver.Core.Model.Filter;

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
        
        public async Task<Item> GetItem(Input inputArguments)
        {
            var items = await _context.QueryAsync<Item>(inputArguments.DeviceID)
                .GetRemainingAsync();
            return items.FirstOrDefault(item => (item.Description == inputArguments.Description));
        }

        public async Task<List<Item>> ListItems(Filter filterArguments)
        {
            // TODO: Look into scan conditions
            var scanConditions = new List<ScanCondition>();
            {
            }
            var results = await _context.ScanAsync<Item>(scanConditions).GetRemainingAsync();

            if (!string.IsNullOrEmpty(filterArguments.DeviceIdFilter?.EqualsFilter))
            {
                results = results.Where(item => item.DeviceId == filterArguments.DeviceIdFilter.EqualsFilter).ToList();
            }
            else if (!string.IsNullOrEmpty(filterArguments.DeviceIdFilter?.NotEqualsFilter))
            {
                results = results.Where(item => item.DeviceId != filterArguments.DeviceIdFilter.NotEqualsFilter).ToList();
            }

            return results;
        }
    }
}