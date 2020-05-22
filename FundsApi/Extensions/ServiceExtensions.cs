using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FundsApi.extensions
{
    public static class serviceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services)
        {
            //services.AddCors(options =>
            //{
            //    options.AddPolicy("CorsPolicy",
            //        builder => builder.WithOrigins("http://localhost:59288")
            //        .AllowAnyMethod()
            //        .AllowAnyHeader());
            //});
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });
        }

    }
}
