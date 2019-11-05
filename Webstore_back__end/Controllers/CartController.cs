using System;

using Microsoft.AspNetCore.Mvc;
using WebStore.models;
using Microsoft.EntityFrameworkCore;

//stoped trying to figure out why it crashes when ever you press add to the car button
namespace Webstore_back__end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {


        private readonly WebStoreDbContext _context;

        public CartController(WebStoreDbContext context)
        {
            _context = context;
        }



        [HttpPost]
        public IActionResult AddItem(string SessionId, int ProdID, int ProdQTY)
        {


            if (String.IsNullOrWhiteSpace(SessionId))
            {

                string Sessionid = Guid.NewGuid().ToString();
                string CreatedOn = DateTime.Now.ToString();
                var SqlQuery = "INSERT INTO [WebStore_db].[dbo].[ShoppingCart] VALUES (' " + Sessionid + "','" + CreatedOn + "')";
                var SqlQuery2 = "Insert into [WebStore_db].[dbo].[CartLineItem] values ('" + SessionId + "','" + ProdID + "','" + ProdQTY + "')";


                
        _context.shoppingCarts.FromSql(SqlQuery);
                 _context.CartLineItems.FromSql(SqlQuery2);

                return Ok(Sessionid);

            }
            else {

                 var SqlQuery = "Insert into table [webstore_db].[dbo].[CartLineItem] values ('" + SessionId +  "','" + ProdID + "','"+ ProdQTY + "')";
                 _context.CartLineItems.FromSql(SqlQuery);
                 return Ok(SessionId);



            }









        }








    }
}