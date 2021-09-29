using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ItemResolver.Lambda.Response
{
    public class ItemConnection
    {
        [JsonPropertyName("items")]
        public List<Item> Items { get; set; }
        
        [JsonPropertyName("nextToken")]
        public string NextToken { get; set; }
    }
}