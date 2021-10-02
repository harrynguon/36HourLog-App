using System.Collections.Generic;
using System.Threading.Tasks;
using ItemResolver.Core.Model;

namespace ItemResolver.Core.Interface
{
    public interface IDynamoDbClient
    {
        
        Task<Item> GetItem(Input inputArguments);
        
        Task<List<Item>> ListItems(Filter filterArguments);
        
        Task<Item> CreateItem(Input inputArguments);
        
        Task<Item> UpdateItem(Input inputArguments);
        
        Task<Item> DeleteItem(Input inputArguments);

    }
}