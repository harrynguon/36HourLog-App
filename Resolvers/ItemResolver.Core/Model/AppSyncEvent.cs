using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;

namespace ItemResolver.Core.Model
{
    /// <summary>
    /// Mapping of the JSON payload from AppSync to this Lambda.
    /// This currently only includes the relevant information needed for querying and mutating.
    /// </summary>
    public class AppSyncEvent
    {
        /// <summary>
        /// Input-related
        /// </summary>
        public Arguments Arguments { get; set; }

        /// <summary>
        /// Determine whether query or mutate, and which command it is
        /// </summary>
        public Info Info { get; set; }

    }

    /// <summary>
    /// Input arguments when sending a query/mutation
    /// </summary>
    public class Arguments
    {
        /// <summary>
        /// Refer to schema
        /// </summary>
        public Input Input { get; set; }
        
        /// <summary>
        /// Refer to schema
        /// </summary>
        public Filter Filter { get; set; }
        
    }
    
    /// <summary>
    /// Argument Filter
    /// </summary>
    public class Filter
    {
        [JsonPropertyName("DeviceID")]
        public string DeviceId { get; set; }
        
        [JsonPropertyName("Operator")]
        public string FilterOperator { get; set; }
    }

    /// <summary>
    /// Argument Input
    /// </summary>
    public class Input
    {
        public string DeviceID { get; set; }
        public string ExpiryDate { get; set; }
        public string Description { get; set; }
    }

    /// <summary>
    /// Lets you know whether this is a query or mutate request.
    /// </summary>
    public class Info
    {
        /// <summary>
        /// E.g. Query / Mutation
        /// </summary>
        public string ParentTypeName { get; set; }

        /// <summary>
        /// E.g. createItem, ListItems, deleteItem
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
                    .ToList();
        }

        /// <summary>
        /// E.g. "{\n  Items {\n    Description\n    ExpiryDate\n    DeviceID\n  }\n}"
        /// </summary>
        public string SelectionSetGraphQL { get; set; }
    }

}