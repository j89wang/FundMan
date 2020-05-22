using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using FundDAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FundsApi.Controllers
{
    [Route("api/fv")]
    [ApiController]
    public class FVController : ControllerBase
    {
        // GET: api/FV
        //[HttpGet]
        [Route("fvalues")]
        public IEnumerable<FundsValue> Get()
        {
            PersonalContext pc = new PersonalContext();
            //return from c in pc.FundsValue select c;
            return (from a in pc.FundAllocation
                    join cc in pc.FundsValue on a.Symbol equals cc.FundName into ac
                    from aci in ac.DefaultIfEmpty()
                    select new FundsValue { FvId = aci.FvId, FundName = a.Symbol, Value = aci.Value, CyberAccountId = aci.CyberAccountId });
        }

        // GET: api/FV/5
        [HttpGet("{id}", Name = "GetFv")]
        [Route("fvalue")]
        public FundsValue Get(int id)
        {
            if (id != 0)
            {
                PersonalContext pc = new PersonalContext();
                return (from c in pc.FundsValue where c.FvId == id select c).FirstOrDefault();
            }
            else
            {
                FundsValue fv = new FundsValue();
                fv.FundName = "";
                //fv.Value = "Value";
                fv.CyberAccountId = "";
                // fv.Date = "Date";
                return fv;
            }
        }

        // POST: api/FV
        // update values enetred within 10 days, otherwise add the value
        [HttpPost]
        [Route("postValue")]
        public void Post([FromBody] FundsValue value)
        {
            PersonalContext pc = new PersonalContext();
            var rec = (from c in pc.FundsValue where c.FundName == value.FundName && c.CyberAccountId == value.CyberAccountId
                       && c.Date > DateTime.Now.AddDays(-10) select c).FirstOrDefault();

            if (rec != null)
            {
                rec.Value = value.Value;
                rec.CyberAccountId = value.CyberAccountId;
                rec.Date = DateTime.Now;
                pc.Update(rec);
            }
            else
            {
                FundsValue fv = new FundsValue();
                fv.FundName = value.FundName;
                fv.Value = value.Value;
                fv.CyberAccountId = value.CyberAccountId;
                fv.Date = DateTime.Now;
                pc.FundsValue.Add(fv);
            }
            pc.SaveChanges();
        }

        [Route("PortfolioSummary")]
        public IEnumerable<IPoint> GetSummary()
        {
            PersonalContext pc = new PersonalContext();
            //var vRec = (from v in pc.FundsValue join a in pc.FundAllocation on v.FundName equals a.Symbol 
            //            select new { cash = (decimal)v.Value * (decimal)a.Cash, fixedIncome = (decimal)v.Value * (decimal)a.FixedIncome, 
            //                nonUsequity = (decimal)v.Value * (decimal)a.Usequity, other = (decimal)v.Value * (decimal)a.Other} );

            string specifier = "0.00"; 

            var vCash = ((from v in pc.FundsValue
                        join a in pc.FundAllocation on v.FundName equals a.Symbol
                        select (decimal)v.Value * (decimal)a.Cash).Sum()/100).ToString(specifier, CultureInfo.InvariantCulture);
            var vFixedIncome = ((from v in pc.FundsValue
                         join a in pc.FundAllocation on v.FundName equals a.Symbol
                         select (decimal)v.Value * (decimal)a.FixedIncome).Sum()/100).ToString(specifier, CultureInfo.InvariantCulture); ;
            var vUs = ((from v in pc.FundsValue
                                join a in pc.FundAllocation on v.FundName equals a.Symbol
                                select (decimal)v.Value * (decimal)a.Usequity).Sum()/100).ToString(specifier, CultureInfo.InvariantCulture);
            var vNUs = ((from v in pc.FundsValue
                                join a in pc.FundAllocation on v.FundName equals a.Symbol
                                select (decimal)v.Value * (decimal)a.NonUsequity).Sum()/100).ToString(specifier, CultureInfo.InvariantCulture); ;
            var vOther = ((from v in pc.FundsValue
                                join a in pc.FundAllocation on v.FundName equals a.Symbol
                                select (decimal)v.Value * (decimal)a.Other
                                ).Sum()/100).ToString(specifier, CultureInfo.InvariantCulture);
            IPoint[] points = new IPoint[5];
            points[0] = new IPoint() {type = "Cash", amount = Convert.ToDecimal(vCash) };
            points[1] = new IPoint() { type = "FixedIncome", amount = Convert.ToDecimal(vFixedIncome) };
            points[2] = new IPoint() { type = "USEquity", amount = Convert.ToDecimal(vUs) };
            points[3] = new IPoint() { type = "NonUSEquity", amount = Convert.ToDecimal(vNUs) };
            points[4] = new IPoint() { type = "Other", amount = Convert.ToDecimal(vOther) };
            return points;
        }

        // PUT: api/FV/5
        [HttpPut("{id}")]
        [Route("putValue")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        [Route("deleteValue")]
        public void Delete(int id)
        {

        }
    }

    public class IPoint
    {
        public string type { get; set; }
        public Decimal amount { get; set; }
    }
}
