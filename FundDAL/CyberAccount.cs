using System;
using System.Collections.Generic;

namespace FundDAL
{
    public partial class CyberAccount
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Institution { get; set; }
        public string RelatedCompany { get; set; }
        public string Type { get; set; }
    }
}
