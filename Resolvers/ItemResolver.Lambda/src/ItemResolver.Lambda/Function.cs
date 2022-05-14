using Amazon.Lambda.Core;
using Amazon.Lambda.Serialization.SystemTextJson;
using ItemResolver.Core;
using ItemResolver.Core.Interface;
using ItemResolver.Core.Model;
using ItemResolver.Infrastructure;
using Microsoft.Extensions.DependencyInjection;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(DefaultLambdaJsonSerializer))]

namespace ItemResolver.Lambda
{
	public class Function
	{
		/// <summary>
		///   AppSync Lambda Resolver
		/// </summary>
		/// <param name="input"></param>
		/// <param name="context"></param>
		/// <returns></returns>
		public App.Response FunctionHandler(AppSyncEvent input, ILambdaContext context)
		{
			var serviceCollection = new ServiceCollection();
			ConfigureServices(serviceCollection);
			var serviceProvider = serviceCollection.BuildServiceProvider();

			return serviceProvider.GetService<App>()?.Handle(input, context).Result;
		}

		/// <summary>
		///   Dependencies here
		/// </summary>
		/// <param name="serviceCollection"></param>
		public static void ConfigureServices(IServiceCollection serviceCollection)
		{
			serviceCollection.AddTransient<App>();
			serviceCollection.AddScoped<IDynamoDbClient, DynamoDbClient>();
			serviceCollection.AddSingleton<IConfigurationService, ConfigurationService>();
		}
	}
}
