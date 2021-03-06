﻿using System;
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
        [Route("[action]")]

        //this action method is used to insert products into a shopping cart, update quantities and make new shopping carts as necessary 
        public void UpdateCart([FromBody]JObject data)
        {

            UpdateCart updatecart = data["UpdateData"].ToObject<UpdateCart>();
            var SqlQuery = "Update CartLineItem set ProdQty = '" + updatecart.qty + "' " +
                            "where SessionID = '" + updatecart.SessionID + "' " +
                            "and ProdID = '" + updatecart.ItmID + "'";
            _context.Database.ExecuteSqlCommand(SqlQuery);

        }


        [HttpPost]
        //this action method is used to insert products into a shopping cart, update quantities and make new shopping carts as necessary 
        public string Post([FromBody]JObject data)
        {

            //maps the post data to a the postRequest object 
            PostRequest postRequest = data["Postdata"].ToObject<PostRequest>();
            //checks if session id is emypt 
            if (String.IsNullOrWhiteSpace(postRequest.Sessionid))
            {
                //creates new session ID 
                string Sessionid = Guid.NewGuid().ToString();
                //creates a new time stamp 
                string CreatedOn = DateTime.Now.ToString();
                //builds SQL query to insert data into the shopping cart header and lines table 
                var SqlQuery = "INSERT INTO [WebStore_db].[dbo].[ShoppingCart] VALUES (' " + Sessionid + "','" + CreatedOn + "')";
                var SqlQuery2 = "Insert into [WebStore_db].[dbo].[CartLineItem] values ('" + Sessionid + "','" + postRequest.ProdID + "','" + postRequest.ProdQTY + "')";
                //updates the session id variable 
                postRequest.Sessionid = Sessionid;

                //exicutes the sql queries 
                _context.Database.ExecuteSqlCommand(SqlQuery);
                _context.Database.ExecuteSqlCommand(SqlQuery2);
                //returns the new session ID for the client 
                return (postRequest.Sessionid);

            }
            else
            {

                //if there is a session ID,  this function will get all items associated with the session ID 
                List<WebStore.models.CartLineItem> Get(string Sessionid, int ProdID)
                {

                    var SqlQuery2 = "SELECT [ID],[SessionID],[ProdID],[ProdQty] FROM [WebStore_db].[dbo].[CartLineItem] where SessionID = '" + Sessionid + "' and ProdID= '" + ProdID + "';";
                    return _context.CartLineItems.FromSql(SqlQuery2).ToList();
                    ;


                }

                //invokes function to get any current items in the shoppping cart to update quantity 
                var results = Get(postRequest.Sessionid, postRequest.ProdID);
                //if the current item does not exiist in this shopping cart it,it will add it to the cartline table
                int ProdCount = 0;
                if (results.Count <= 0)
                {
                    //builds of the query 
                    var SqlQuery = "Insert into [WebStore_db].[dbo].[CartLineItem] values ('" + postRequest.Sessionid + "'," + postRequest.ProdID + "," + postRequest.ProdQTY + ")";
                    //exicutes the query against DB
                    _context.Database.ExecuteSqlCommand(SqlQuery);
                    //returns ID 
                    return (postRequest.Sessionid);



                }
                //if the item does exist in the cart, the quantity gets updated 
                else
                {
                    //loops through and totals  the quantity for the item
                    foreach (var result in results)
                    {
                        ProdCount += result.ProdQty;
                    }

                    //updates the final count 
                    ProdCount += postRequest.ProdQTY;
                    //builds out the SQL query 
                    var SqlQuery = "update [WebStore_db].[dbo].[CartLineItem] Set ProdQty = " + ProdCount + " where SessionID=" + "'" + postRequest.Sessionid + "'" + " and ProdID =" + postRequest.ProdID;
                    //exicutes the query against the DB
                    _context.Database.ExecuteSqlCommand(SqlQuery);
                    //returns the session ID 
                    return (postRequest.Sessionid);




                }







            }




















        }



        [HttpGet("{sessionId}")]
        //this action method is used to get the cart list asscioated with a particular id 
        public List<Webstore_back__end.models.ReturnCart> GetProdListCart(string sessionId)
        {

            //if there is no session ID in the request it returns an error
            if (String.IsNullOrEmpty(sessionId))
            {
                List<Webstore_back__end.models.ReturnCart> Error = new List<Webstore_back__end.models.ReturnCart>();
                Error.Add(new ReturnCart() { ID = 0, Name = "ERROR NO SESSION ID", ProdQty = 0, price = 0 });
                return (Error);
            }
            //else it returns the list of items 
            else
            {
                //builds out the query 
                var SqlQuery = "Select products.[ID],products.[Name],LineItm.[ProdQty], products.[Price] from [WebStore_db].[dbo].[CartLineItem] as LineItm left join [WebStore_db].[dbo].[products] as products on LineItm.[ProdID] = products.[ID] where [SessionID] = '" + sessionId + "'";

                //returns the shoppping cart list 
                return _context.returncart.FromSql(SqlQuery).ToList();
            }
        }




        [HttpDelete("{sessionId}/lines/{productId}")]

        //this action method is used by the remove item button in the shopping cart. it removes the item from the cart 
        public IActionResult RemoveItem(string sessionID, int productId)

        {

            //builds out query 
            var SqlQuery = "delete from [WebStore_db].[dbo].[CartLineItem]  where sessionID = '" + sessionID + "' and  ProdID= " + productId;

            //exicutes the command 
            return Ok(_context.Database.ExecuteSqlCommand(SqlQuery));



        }


    }

}
