using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.Internal;
using Amazon.Lambda.Core;
using Amazon.Runtime;
using ItemResolver.Core.Interface;
using ItemResolver.Core.Model;

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
        
        public async Task<List<Item>> GetItem(string key)
        {
            return await _context.QueryAsync<Item>(key).GetRemainingAsync();
        }

        public async Task<List<Item>> ListItems()
        {
            var scanConditions = new List<ScanCondition>();
            {
                // new ScanCondition
                // {
                //     
                // }
            }
            return await _context.ScanAsync<Item>(scanConditions).GetRemainingAsync();
        }
    }
}