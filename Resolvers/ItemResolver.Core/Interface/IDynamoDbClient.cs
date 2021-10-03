using System.Collections.Generic;
using System.Threading.Tasks;
using ItemResolver.Core.Model;

namespace ItemResolver.Core.Interface
{
    public interface IDynamoDbClient
    {
        
        Task<Item> GetItem(Input inputArguments, string attributeSet);
        
        Task<List<Item>> ListItems(Filter filterArguments, string attributeSet);
        
        Task<Item> CreateItem(Input inputArguments);
        
        Task<Item> UpdateItem(Input inputArguments);
        
        Task<Item> DeleteItem(Input inputArguments);

    }
}