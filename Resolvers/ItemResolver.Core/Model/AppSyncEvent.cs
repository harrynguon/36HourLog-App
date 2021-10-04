using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;

namespace ItemResolver.Core.Model
{
    /// <summary>
    /// Mapping of the JSON payload from AppSync to this Lambda's Input.
    /// This only maps the relevant information needed for querying and mutating.
    /// </summary>
    public class AppSyncEvent
    {
        public Arguments Arguments { get; set; }
        
        public Info Info { get; set; }

    }
    
    public class Arguments
    {
        
        public Item Item { get; set; }
        
        public Filter Filter { get; set; }
        
    }
    
    public class Filter
    {
        [JsonPropertyName("DeviceID")]
        public string DeviceId { get; set; }
        
        [JsonPropertyName("Operator")]
        public string FilterOperator { get; set; }
    }
    
    public class Info
    {
        /// <summary>
        /// E.g. "Query", "Mutation"
        /// </summary>
        public string ParentTypeName { get; set; }

        /// <summary>
        /// E.g. "createItem", "listItems", "deleteItem"
        /// </summary>
        public string FieldName { get; set; }

        private List<string> _selectionSetList;

        /// <summary>
        /// E.g. "selectionSetList": ["Items", "Items/Description", "Items/ExpiryDate", "Items/DeviceID"],
        /// Maps to ["Description", "ExpiryDate", "DeviceID"]
        /// </summary>
        public List<string> SelectionSetList
        {
            get => _selectionSetList;
            set => _selectionSetList = value
                    .Select(attribute => attribute.Contains("/") ? attribute.Split("/")[1] : attribute)
                    .Where(attribute => attribute != "Items")
                    .Where(attribute => !attribute.Contains("typename"))
                    .ToList();
        }
        
    }
}