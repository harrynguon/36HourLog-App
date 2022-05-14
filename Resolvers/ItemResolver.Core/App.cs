﻿using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon.Lambda.Core;
using ItemResolver.Core.Interface;
using ItemResolver.Core.Model;

namespace ItemResolver.Core
{
	public class App
	{
		private readonly IDynamoDbClient _dynamoDbClient;

		public App(IDynamoDbClient dynamoDbClient)
		{
			_dynamoDbClient = dynamoDbClient;
		}

		public async Task<Response> Handle(AppSyncEvent input, ILambdaContext context)
		{
			LambdaLogger.Log(JsonSerializer.Serialize(input));
			var arguments = input.Arguments;

			var attributeSet = string.Join(", ", input.Info.SelectionSetList);

			var field = input.Info.FieldName;
			Item item = null;
			switch (field)
			{
				case Queries.ListItems:
					var items = await _dynamoDbClient.ListItems(arguments.Filter, attributeSet);
					return new Response(items);
				case Queries.GetItem:
					item = await _dynamoDbClient.GetItem(arguments.Item, attributeSet);
					break;
				case Mutations.CreateItem:
					item = await _dynamoDbClient.CreateItem(arguments.Item);
					break;
				case Mutations.UpdateItem:
					item = await _dynamoDbClient.UpdateItem(arguments.Item);
					break;
				case Mutations.DeleteItem:
					item = await _dynamoDbClient.DeleteItem(arguments.Item);
					break;
			}

			return item != null ? new Response(item) : null;
		}

		public class Response : Item
		{
			public Response()
			{
			}

			public Response(Item item)
			{
				DeviceId = item.DeviceId;
				ExpiryDate = item.ExpiryDate;
				Description = item.Description;
			}

			public Response(IEnumerable<Item> items)
			{
				Items = items.ToList();
			}
		}
	}
}
