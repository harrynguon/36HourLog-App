using System;
using System.Collections.Generic;

namespace ItemResolver.Core.Model
{
    public class AppSyncInput
    {
        public Arguments Arguments { get; set; }

        public Info Info { get; set; }

    }

    public class Arguments
    {
        public string DeviceID { get; set; }

        public string ExpiryDate { get; set; }
    }

    public class Info
    {
        public List<string> SelectionSetList { get; set; }

        /// <summary>
        /// TODO: Deserialise this JSON string
        /// </summary>
        public string SelectionSetGraphQL { get; set; }

        public string ParentTypeName { get; set; }

        public string FieldName { get; set; }

        public Object Variables { get; set; }
    }

}