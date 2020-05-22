using System;
using System.Collections.Generic;

namespace FundDAL
{
    public partial class FundAllocation
    {
        public string Symbol { get; set; }
        public double? Cash { get; set; }
        public double? FixedIncome { get; set; }
        public double? NonUsequity { get; set; }
        public double? Other { get; set; }
        public double? Usequity { get; set; }
        public DateTime? DateModified { get; set; }
        public string Name { get; set; }
    }
}
