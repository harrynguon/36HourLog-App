using System;
using System.IO;
using Amazon.Extensions.NETCore.Setup;
using ItemResolver.Core.Interface;
using Microsoft.Extensions.Configuration;

namespace ItemResolver.Infrastructure
{
    public class ConfigurationService : IConfigurationService
    {
        public IConfiguration GetConfiguration()
        {
            return new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddEnvironmentVariables()
                .AddSystemsManager("/")
                .Build();
        }
    }
}