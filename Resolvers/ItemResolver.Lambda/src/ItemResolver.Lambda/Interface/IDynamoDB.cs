using System.Collections.Generic;
using ItemResolver.Lambda.Response;

namespace ItemResolver.Lambda.Interface
{
    public interface IDynamoDB
    {
        Item GetItem();
        
        List<Item> ListItems();

    }
}