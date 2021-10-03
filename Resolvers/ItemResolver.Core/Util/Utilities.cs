using System.Collections.Generic;
using System.Linq;
using Amazon.DynamoDBv2.Model;
using ItemResolver.Core.Model;
using Newtonsoft.Json;

namespace ItemResolver.Core.Util
{
    public static class Utilities
    {
        public static Item MapToItem(Dictionary<string, AttributeValue> dictionary)
        {
            var stringDictionary = dictionary
                .ToDictionary(kvp => kvp.Key, kvp => kvp.Value.S);

            return JsonConvert.DeserializeObject<Item>(JsonConvert.SerializeObject(stringDictionary));
        }

        public static List<Item> MapToItem(IEnumerable<Dictionary<string, AttributeValue>> dictionaryList)
        {
            var items = new List<Item>();
            foreach (var itemDict in dictionaryList)
            {
                var item = MapToItem(itemDict);
                items.Add(item);
            }

            return items;
        }
    }
}