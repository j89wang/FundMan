using System;
using System.Collections.Generic;

namespace FundDAL
{
    public partial class FundsValue
    {
        public string CyberAccountId { get; set; }
        public string AccountId { get; set; }
        public string FundName { get; set; }
        public string FundType { get; set; }
        public decimal? Value { get; set; }
        public DateTime? Date { get; set; }
        public string FundTypeFull { get; set; }
        public string Notes { get; set; }
        public int FvId { get; set; }
    }
}
