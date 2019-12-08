using System;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Mvc;
using WebStore.models;
using Microsoft.EntityFrameworkCore;
using Webstore_back__end.models;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using Stripe;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Azure.KeyVault;
using Microsoft.Extensions.Configuration;
 



namespace Webstore_back__end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckoutController : ControllerBase
    {



        private readonly WebStoreDbContext _context;
        private readonly IConfiguration configuration;
        public CheckoutController(WebStoreDbContext context, IConfiguration configuration)
        {
            _context = context;
        }


        // C:\scratch\ReactWebStore\webstore_front_end

        [HttpPost]

        public IActionResult Checkout([FromBody]JObject data)
        {


            
            CheckOut checkout = data["CheckOutdata"].ToObject<CheckOut>();
            var SqlQuery = "Insert into OrderHeader values ('" + checkout.customer.firstName + "','" + checkout.customer.lastName + "',' "+ checkout.customer.email +
             "','"  +  checkout.billingAddress.StreetAddress + "','" + checkout.billingAddress.city + "','" + checkout.billingAddress.State + "','"+ checkout.billingAddress.ZipCode
              + "','" + checkout.billingAddress.Country + "','"+ checkout.deliveryAddress.StreetAddress + "','" + checkout.deliveryAddress.city + "','"+ checkout.deliveryAddress.State
               + "','" + checkout.deliveryAddress.Country  + "','" + checkout.SessionId + "','" +  checkout.deliveryAddress.ZipCode + "')";


            
            var SQLQuery3 = "SELECT [CheckOutItemsList].[ID],[CheckOutItemsList].[ProdID],[CheckOutItemsList].[ProdQty], [products].[price]" +
            " FROM[webstore_db].[dbo].[CartLineItem] as [CheckOutItemsList] " + 
              "left join[products] " +
             "on[CheckOutItemsList].[ProdID] = [products].[id]  where [SessionID] ='" + checkout.SessionId + "'";

            var SelectResults = _context.checkoutitemlist.FromSql(SQLQuery3);

            var ItemStr = "";
            Decimal ItemTotal = 0;
            foreach (var item in SelectResults) 
            {
                ItemTotal = ItemTotal + (item.price * item.ProdQty);
                ItemStr = ItemStr + "('"+ checkout.SessionId.ToString() + "','"  + item.ProdID.ToString() + "','" + item.ProdQty.ToString() + "'),";


            }


            String ItemStr2 = ItemStr.Substring(0, (ItemStr.Length - 1));
            var SqlQuery2 = "Insert into OrderLines values" + ItemStr2;
            var SqlQuery4 = "delete from ShoppingCart where SessionID = '" + checkout.SessionId.ToString() + "'";
            var SqlQuery5 = "delete from CartLineItem where SessionID = '" + checkout.SessionId.ToString() + "'";

            _context.Database.ExecuteSqlCommand(SqlQuery);
            _context.Database.ExecuteSqlCommand(SqlQuery2);

            ChargeCustomer(checkout.paymentToken, ItemTotal, checkout.customer.email);


            _context.Database.ExecuteSqlCommand(SqlQuery4);
            _context.Database.ExecuteSqlCommand(SqlQuery5);
            return Ok();
        
        }

        private void ChargeCustomer(string paymentToken, decimal itemTotal, string email)
        {

            StripeConfiguration.ApiKey = "sk_test_wGglOzyHYIB92w1Pv5LAUtTD00pF5tUIbg";

            var options = new ChargeCreateOptions()
            {
                Amount = Convert.ToInt64(itemTotal * 100),
                Currency = "USD",
                Source = paymentToken,
                Metadata = new Dictionary<string, string>() { {"CustomerEmail", email } }

            };
                                                         
            var service = new ChargeService();
            Charge charge = service.Create(options);
        }
    }
}
