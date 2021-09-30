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
using Filter = ItemResolver.Core.Model.Filter;

namespace ItemResolver.Infrastructure
{
    public class DynamoDbClient : IDynamoDbClient
    {

        private AmazonDynamoDBClient _client;
        private DynamoDBContext _context;

        public DynamoDbClient()
        {
            var credentials =
                new BasicAWSCredentials("1", "2");
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
            var resultsUnfiltered = await _context.ScanAsync<Item>(scanConditions).GetRemainingAsync();
            var resultsFiltered = new List<Item>();

            if (!string.IsNullOrEmpty(filterArguments.DeviceIdFilter.Equals))
            {
                resultsFiltered =
                    resultsUnfiltered.Where(item => item.DeviceId == filterArguments.DeviceIdFilter.Equals).ToList();
            }
            else
            {
                resultsFiltered =
                    resultsUnfiltered.Where(item => item.DeviceId != filterArguments.DeviceIdFilter.NotEquals).ToList();
            }
            
            return resultsFiltered;
        }
    }
}