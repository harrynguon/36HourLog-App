using System.Collections.Generic;
using System.Text.Json.Serialization;
using Amazon.DynamoDBv2.DataModel;

namespace ItemResolver.Lambda.Model
{
    [DynamoDBTable("36-hours-table")]
    public class Item
    {
        [DynamoDBHashKey("DeviceID")]
        [DynamoDBProperty("DeviceID")]
        [JsonPropertyName("DeviceID")]
        public string DeviceId { get; set; }
        
        [DynamoDBRangeKey]
        [DynamoDBProperty]
        [JsonPropertyName("ExpiryDate")]
        public string ExpiryDate { get; set; }
        
        [DynamoDBProperty]
        [JsonPropertyName("Description")]
        public string Description { get; set; }
        
        // ItemConnection Result
        [JsonPropertyName("items")]
        public List<Item> Items { get; set; }
        
        [JsonPropertyName("nextToken")]
        public string NextToken { get; set; }
    }
}