using System;
using System.Collections.Generic;

namespace FundDAL
{
    public partial class Accounts
    {
        public string CountName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Url { get; set; }
        public string Email { get; set; }
        public string SecurityQuestion1 { get; set; }
        public string SecurityQuestion2 { get; set; }
        public string SecurityQuestion3 { get; set; }
        public string Owner { get; set; }
    }
}
