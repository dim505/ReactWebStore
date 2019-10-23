

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebStore.models
{
  


    public class WebStoreDbContext : DbContext
    {

        

     


        public WebStoreDbContext(DbContextOptions<WebStoreDbContext> options)
    : base(options)
        {
        }



       
        public DbSet<ProdListRawSqlQuery> products { get; set; }
        public DbSet<ProdDescRawSQLQuery> product { get; set; }

    }
} 



