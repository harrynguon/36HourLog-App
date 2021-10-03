#nullable enable
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;
using System.Text.Json.Serialization;
using Amazon.DynamoDBv2.DataModel;

namespace ItemResolver.Core.Model
{
    [DynamoDBTable(Constants.TableName)]
    public class Item
    {
        [DynamoDBHashKey(Constants.DeviceId)]
        [DynamoDBProperty(Constants.DeviceId)]
        [JsonPropertyName(Constants.DeviceId)]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? DeviceId { get; set; }
        
        [DynamoDBRangeKey]
        [DynamoDBProperty]
        [JsonPropertyName(Constants.ExpiryDate)]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? ExpiryDate { get; set; }
        
        [DynamoDBProperty]
        [JsonPropertyName(Constants.Description)]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Description { get; set; }
        
        // Result for the listItems query
        [JsonPropertyName("Items")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public List<Item>? Items { get; set; }
    }
}