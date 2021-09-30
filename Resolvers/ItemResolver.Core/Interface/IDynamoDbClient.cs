using System.Collections.Generic;
using System.Threading.Tasks;
using ItemResolver.Core.Model;

namespace ItemResolver.Core.Interface
{
    public interface IDynamoDbClient
    {
        
        Task<List<Item>> GetItem(string key);
        
        Task<List<Item>> ListItems();

    }
}