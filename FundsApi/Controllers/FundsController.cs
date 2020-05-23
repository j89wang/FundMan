using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FundDAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FundsApi.Controllers
{
    [Route("api/funds")]
    [ApiController]
    public class FundsController : ControllerBase
    {
        // GET: api/Funds
        [HttpGet]
        public IEnumerable<FundAllocation> Get()
        {
            PersonalContext pc = new PersonalContext();
            return from c in pc.FundAllocation select c;
        }

        // GET: api/Funds/5
        [HttpGet("{id}", Name = "GetFa")]
        public FundAllocation Get(string id)
        {
            PersonalContext pc = new PersonalContext();
            return (from c in pc.FundAllocation where c.Symbol == id select c).FirstOrDefault();
        }

        // POST: api/Funds
        [HttpPost]
        public async Task Post([FromBody] FundAllocation value)
        {
            using (PersonalContext pc = new PersonalContext())
            {
                FundAllocation fa = (from p in pc.FundAllocation where p.Symbol == value.Symbol select p).FirstOrDefault();

                if (fa != null)
                {
                    resetFA(ref fa, value);
                    pc.Update(fa);
                }
                else
                {
                    fa = new FundAllocation();
                    resetFA(ref fa, value);
                    pc.FundAllocation.Add(fa);
                }
                try
                {
                    await pc.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    string s = ex.Message;
                }

            }
        }

        private void resetFA(ref FundAllocation ft, FundAllocation fs)
        {
            ft.Symbol = fs.Symbol;
            ft.Cash = fs.Cash;
            ft.FixedIncome = fs.FixedIncome;
            ft.Usequity = fs.Usequity;
            ft.NonUsequity = fs.NonUsequity;
            ft.Other = fs.Other;
            ft.Name = fs.Name;
            ft.DateModified = fs.DateModified;
        }
        // PUT: api/Funds/5
        [HttpPut("{id}")]
        public void Put(string id, FundAllocation value)
        {
            PersonalContext pc = new PersonalContext();

            FundAllocation fa = (from p in pc.FundAllocation where p.Symbol == id select p).FirstOrDefault();

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            PersonalContext pc = new PersonalContext();

            FundAllocation fa = (from p in pc.FundAllocation where p.Symbol == id select p).FirstOrDefault();

            if (fa != null)
            {
                pc.FundAllocation.Remove(fa);
                pc.SaveChanges();
            }
        }
    }
}
