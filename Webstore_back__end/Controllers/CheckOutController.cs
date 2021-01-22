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
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Webstore_back__end.Controllers
{

    // [Authorize]
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


        [HttpPost]

        public IActionResult Checkout([FromBody]JObject data)
        {
            var LoginUserIdentifier = "";

            try
            {
                //gets the login token from Auth0
                LoginUserIdentifier = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            }
            catch (Exception e)
            {
                LoginUserIdentifier = "";

            }


            //gets the customer data and maps it to the checkout object 
            CheckOut checkout = data["CheckOutdata"].ToObject<CheckOut>();


            //builds out a SQL query for an entry into the order header table contain information about the order 
            var SqlQuery = "Insert into OrderHeader values ('" + checkout.customer.firstName + "','" + checkout.customer.lastName + "',' " + checkout.customer.email +
             "','" + checkout.billingAddress.StreetAddress + "','" + checkout.billingAddress.city + "','" + checkout.billingAddress.State + "','" + checkout.billingAddress.ZipCode
              + "','" + checkout.billingAddress.Country + "','" + checkout.deliveryAddress.StreetAddress + "','" + checkout.deliveryAddress.city + "','" + checkout.deliveryAddress.State
               + "','" + checkout.deliveryAddress.Country + "','" + checkout.SessionId + "','" + checkout.deliveryAddress.ZipCode + "','" + LoginUserIdentifier + "','" + checkout.CheckoutTime + "')";


            //Finds all the items with the customers session ID 
            var SQLQuery3 = "SELECT [CheckOutItemsList].[ID],[CheckOutItemsList].[ProdID],[CheckOutItemsList].[ProdQty], [products].[price]" +
            " FROM [WebStore_db].[dbo].[CartLineItem] as [CheckOutItemsList] " +
              "left join[products] " +
             "on[CheckOutItemsList].[ProdID] = [products].[id]  where [SessionID] ='" + checkout.SessionId + "'";
            //gets the results 
            var SelectResults = _context.checkoutitemlist.FromSql(SQLQuery3);
            //declares item string that will contain the list of items 
            var ItemStr = "";

            Decimal ItemTotal = 0;
            //loops through results and builds out the lust
            foreach (var item in SelectResults)
            {
                ItemTotal = ItemTotal + (item.price * item.ProdQty);
                //gets session Id, prod id, and prod qty later to be used to insert into order lines table 
                ItemStr = ItemStr + "('" + checkout.SessionId.ToString() + "','" + item.ProdID.ToString() + "','" + item.ProdQty.ToString() + "'),";


            }


            //if user submits request without first adding to shopping cart will result in a bad request 
            if (ItemStr.Equals(""))
            {

                return BadRequest();

            }
            else
            {
                //removes comma from last item in string list 
                String ItemStr2 = ItemStr.Substring(0, (ItemStr.Length - 1));
                //builds query to insert into OrderLines table
                var SqlQuery2 = "Insert into OrderLines values" + ItemStr2;
                //prepares queery used to delete items from the shopping cart header table 
                var SqlQuery4 = "delete from ShoppingCart where SessionID = '" + checkout.SessionId.ToString() + "'";
                //prepares queery used to delete items from the shopping cart lines table 
                var SqlQuery5 = "delete from CartLineItem where SessionID = '" + checkout.SessionId.ToString() + "'";

                //exicutes the queries against the database
                _context.Database.ExecuteSqlCommand(SqlQuery);
                _context.Database.ExecuteSqlCommand(SqlQuery2);

                ChargeCustomer(checkout.paymentToken, ItemTotal, checkout.customer.email);

                //exicutes the queries against the database
                _context.Database.ExecuteSqlCommand(SqlQuery4);
                _context.Database.ExecuteSqlCommand(SqlQuery5);
                //returns a status code 200
                return Ok();

            }





        }

        private void ChargeCustomer(string paymentToken, decimal itemTotal, string email)
        {
            //defined api key  to identify one self to strip 
            StripeConfiguration.ApiKey = "sk_test_wGglOzyHYIB92w1Pv5LAUtTD00pF5tUIbg";

            var options = new ChargeCreateOptions()
            {
                //specifies the amount to charge
                Amount = Convert.ToInt64(itemTotal * 100),
                //specifies currency 
                Currency = "USD",
                //specifies customer credit card 
                Source = paymentToken,
                //also sents customers email to strip for additional identification 
                Metadata = new Dictionary<string, string>() { { "CustomerEmail", email } }

            };
            //charges the customer                                      
            var service = new ChargeService();
            Charge charge = service.Create(options);
        }
    }
}
