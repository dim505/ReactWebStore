

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webstore_back__end.models;
using Webstore_back__end.models.LogIn;

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
        
        public DbSet<CartLineItem> CartLineItems { get; set; }

        public DbSet<ReturnCart> returncart { get; set; }

        public DbSet<CheckOutItemsList> checkoutitemlist { get; set; }

        public DbQuery<GetAllOrders> getallorders { get; set; }

        public DbQuery<DefCustomerDetails> Defcustomerdetails { get; set; }
        public DbQuery<CustBillAddrInfo> Custbilladdrinfo { get; set; }
        public DbQuery<CustDelivAddrInfo> Custdelivaddrinfo { get; set; }
        public DbSet<UpdatDefCustDetSelectTest> UpdatDefCustDetSelecttest { get; set; }
    }
} 



