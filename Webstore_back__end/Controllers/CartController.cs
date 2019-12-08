using System;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Mvc;
using WebStore.models;
using Microsoft.EntityFrameworkCore;
using Webstore_back__end.models;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace WebStore.Controllers
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
                public string Post([FromBody]JObject data)
                {


                    PostRequest postRequest = data["Postdata"].ToObject<PostRequest>();

                            if (String.IsNullOrWhiteSpace(postRequest.Sessionid))
                            {

                                string Sessionid = Guid.NewGuid().ToString();
                                string CreatedOn = DateTime.Now.ToString();
                                var SqlQuery = "INSERT INTO [WebStore_db].[dbo].[ShoppingCart] VALUES (' " + Sessionid + "','" + CreatedOn + "')";
                                var SqlQuery2 = "Insert into [WebStore_db].[dbo].[CartLineItem] values ('" + Sessionid + "','" + postRequest.ProdID + "','" + postRequest.ProdQTY + "')";
                                postRequest.Sessionid = Sessionid;


                                // _context.shoppingCarts.FromSql("INSERT INTO[WebStore_db].[dbo].[ShoppingCart] VALUES(2222,' ded670f3-bfae-4ef9-9cca-7930fcb9ef21', '11/6/2019 12:41:06 AM')");
                                //  _context.CartLineItems.FromSql();
                                _context.Database.ExecuteSqlCommand(SqlQuery);
                                _context.Database.ExecuteSqlCommand(SqlQuery2);

                                return (postRequest.Sessionid);

            }
                            else
                            {


                List<WebStore.models.CartLineItem> Get(string Sessionid, int ProdID )
                                {   

                                   var SqlQuery2 = "SELECT [ID],[SessionID],[ProdID],[ProdQty] FROM [webstore_db].[dbo].[CartLineItem] where SessionID = '" + Sessionid + "' and ProdID= '" + ProdID + "';";
                                  return _context.CartLineItems.FromSql(SqlQuery2).ToList();
                    ;
                                    
                                    
                }


                var  results = Get(postRequest.Sessionid, postRequest.ProdID);

                int ProdCount = 0;
                if (results.Count <= 0)
                {

                    var SqlQuery = "Insert into [webstore_db].[dbo].[CartLineItem] values ('" + postRequest.Sessionid + "'," + postRequest.ProdID + "," + postRequest.ProdQTY + ")";
                    _context.Database.ExecuteSqlCommand(SqlQuery);
                    return (postRequest.Sessionid);



                }
                else {

                    foreach (var result in results)
                    {
                        ProdCount += result.ProdQty;
                    }
                    ProdCount += postRequest.ProdQTY;

                    var SqlQuery = "update [webstore_db].[dbo].[CartLineItem] Set ProdQty = " + ProdCount + " where SessionID=" + "'" + postRequest.Sessionid + "'" + " and ProdID =" + postRequest.ProdID;
                        _context.Database.ExecuteSqlCommand(SqlQuery);
                    return (postRequest.Sessionid);




                }







            }






            













            }


        
        [HttpGet("{sessionId}")]
        public List<Webstore_back__end.models.ReturnCart> GetProdListCart(string sessionId)
        {
            if (String.IsNullOrEmpty(sessionId)) {
                List<Webstore_back__end.models.ReturnCart> Error = new List<Webstore_back__end.models.ReturnCart>();
                Error.Add(new ReturnCart() { ID = 0, Name = "ERROR NO SESSION ID", ProdQty = 0, price = 0 });
                return (Error);
            }
            else
            {
                var SqlQuery = "Select products.[ID],products.[Name],LineItm.[ProdQty], products.[Price] from [WebStore_db].[dbo].[CartLineItem] as LineItm left join [WebStore_db].[dbo].[products] as products on LineItm.[ProdID] = products.[ID] where [SessionID] = '" + sessionId + "'"; 
                return _context.returncart.FromSql(SqlQuery).ToList(); }
}




        [HttpDelete("{sessionId}/lines/{productId}")]


        public IActionResult RemoveItem(string sessionID, int productId) 
        
        {


            var SqlQuery = "delete from [webstore_db].[dbo].[CartLineItem]  where sessionID = '" + sessionID + "' and  ProdID= " + productId;
            return Ok(_context.Database.ExecuteSqlCommand(SqlQuery));


         
        }


        }

}
