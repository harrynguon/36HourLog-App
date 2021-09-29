using System;
using System.Text.Json.Serialization;

namespace ItemResolver.Lambda.Response
{
    public class Item : ItemConnection
    {

        [JsonPropertyName("Description")]
        public string Description { get; set; }
        
        [JsonPropertyName("DeviceID")]
        public string DeviceId { get; set; }
        
        [JsonPropertyName("ExpiryDate")]
        public string ExpiryDate { get; set; }
    }
}