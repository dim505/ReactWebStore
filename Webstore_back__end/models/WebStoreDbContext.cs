

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webstore_back__end.models;

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
        public DbSet<ShoppingCart> shoppingCarts { get; set; }
        public DbSet<CartLineItem> CartLineItems { get; set; }
    }
} 



