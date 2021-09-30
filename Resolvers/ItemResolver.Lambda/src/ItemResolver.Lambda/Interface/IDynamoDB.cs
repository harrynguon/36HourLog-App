using System.Collections.Generic;
using ItemResolver.Lambda.Model;

namespace ItemResolver.Lambda.Interface
{
    public interface IDynamoDb
    {
        Item GetItem();
        
        List<Item> ListItems();

    }
}