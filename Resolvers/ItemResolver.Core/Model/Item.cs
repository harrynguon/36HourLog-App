#nullable enable
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;
using Amazon.DynamoDBv2.DataModel;

namespace ItemResolver.Core.Model
{
    [DynamoDBTable("36-hours-table")]
    public class Item
    {
        [DynamoDBHashKey("DeviceID")]
        [DynamoDBProperty("DeviceID")]
        [JsonPropertyName("DeviceID")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? DeviceId { get; set; }
        
        [DynamoDBRangeKey]
        [DynamoDBProperty]
        [JsonPropertyName("ExpiryDate")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? ExpiryDate { get; set; }
        
        [DynamoDBProperty]
        [JsonPropertyName("Description")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Description { get; set; }
        
        // Result for the listItems query
        [JsonPropertyName("Items")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        protected List<Item>? Items { get; set; }
    }
}