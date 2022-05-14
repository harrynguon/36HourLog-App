using System.Collections.Generic;
using System.Threading.Tasks;
using ItemResolver.Core.Model;

namespace ItemResolver.Core.Interface
{
	public interface IDynamoDbClient
	{
		Task<Item> GetItem(Item item, string attributeSet);

		Task<List<Item>> ListItems(Filter filterArguments, string attributeSet);

		Task<Item> CreateItem(Item item);

		Task<Item> UpdateItem(Item item);

		Task<Item> DeleteItem(Item item);
	}
}
