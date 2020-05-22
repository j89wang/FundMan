using System;
using System.Collections.Generic;

namespace FundDAL
{
    public partial class Emails
    {
        public string Address { get; set; }
        public string Password { get; set; }
        public string SecurityQuestion1 { get; set; }
        public string SecurityQuestion2 { get; set; }
        public string SecurityQuestion3 { get; set; }
        public string Owner { get; set; }
    }
}
