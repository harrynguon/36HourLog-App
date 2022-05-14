using Microsoft.Extensions.Configuration;

namespace ItemResolver.Core.Interface
{
	public interface IConfigurationService
	{
		IConfiguration GetConfiguration();
	}
}
