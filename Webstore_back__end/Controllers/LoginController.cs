using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using WebStore.models;
using Webstore_back__end.models;

namespace Webstore_back__end.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {


        private readonly WebStoreDbContext _context;

        public LoginController(WebStoreDbContext context)
        {
            _context = context;
        }


        // used to get all orders 
        [HttpGet]
        public IQueryable GetOrders()
        {
			//gets the login token from Auth0
            var LogInID = User.FindFirst(ClaimTypes.NameIdentifier).Value;

   

			//builds out SQL query to get all the nesscary information to get all the orders for the account
            var SqlQuery = "select [getallorders].FirstName, [getallorders].LastName, " +
                         "[getallorders].Email, [getallorders].BillingStrAddr, [getallorders].BillingCity, [getallorders].BillingState, [getallorders].BillingZipCode, " +
                       "[getallorders].BillingCountry, [getallorders].DelivStrAddr, [getallorders].DelivCity, [getallorders].DelivZipCode, [getallorders].DelivState, " +
                       " [getallorders].DelivCountry, [getallorders].CheckoutTime, [OrderLines].ProdQty,  [products].Name  ,  [products].price  " +
                         " from OrderHeader as [getallorders] " +
                        "inner join OrderLines on [getallorders].SessionID = OrderLines.SessionID " +
                        "inner join products on OrderLines.ProdId = products.ID " +
                        "where [getallorders].LoginUserIdentifier = '" + LogInID + "'" +
                        "order by CONVERT(DATETIME,CheckoutTime, 102) desc";
            //executes the sql code and returns back all order made for that account
			return _context.getallorders.FromSql(SqlQuery);






        }
		
		//action method used to get first name, last name, and email of logged in account 
        [HttpGet] 
        [Route("[action]")]
        public IQueryable GetDefCustomerDetails() 
        {
			//gets the login token from Auth0
		    var LogInID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
			//builds out SQL query
            var SQLQuery = "select * from PriAcctInfo where AuthOID = '" + LogInID + "' ";
            //executes the sql code and returns back all order made for that account
			return _context.Defcustomerdetails.FromSql(SQLQuery);


            

        }
		//action method used to get defaulting billing information of logged in account 
        [HttpGet]
        [Route("[action]")]
        public IQueryable GetDefBillAddr() 
        {
			//gets the login token from Auth0
            var LogInID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
			//builds out SQL query
            var SQLQuery = "select * from CustBillAddrInfo where AuthOID = '" + LogInID + "' ";
			//executes the sql code and returns back all order made for that account
            return _context.Custbilladdrinfo.FromSql(SQLQuery);


        }

        [HttpGet]
        [Route("[action]")]
        public IQueryable GetDefDelivAddr() 
        {
			//gets the login token from Auth0
            var LogInID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
			//builds out SQL query
            var SQLQuery = "select * from CustDelivAddrInfo where AuthOID = '" + LogInID + "' ";
			//executes the sql code and returns back all order made for that account
            return _context.Custdelivaddrinfo.FromSql(SQLQuery);


        }

		//this action method is used to update the first name, last name and email address fields in the accounts details section 
        [HttpPost]
        [Route("[action]")]
        public IActionResult UpdatDefCustomerDetails([FromBody]JObject data)
        {

            var LogInID = "";
            try
            {	//gets the login token from Auth0
                LogInID = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            }
            catch (Exception e)
            {
                LogInID = "";


            }
 
			//maps the post data to a class
            UpdateDefCustDet Updatedefcustdet = data["DefCustDet"].ToObject<UpdateDefCustDet>();

            
			//function is used to test of this is the users first time updating his information
            List<Webstore_back__end.models.UpdatDefCustDetSelectTest> Get(string LogInid) 
             {
                var SQLQuery = "select AuthOID from PriAcctInfo where AuthOID = '" + LogInid + "' ";
                return  _context.UpdatDefCustDetSelecttest.FromSql(SQLQuery).ToList();


            }

			//calls the function
            var result = Get(LogInID);

			//if there are no rows, it insert the data into the database
            if (result.Count <= 0)
            {

                var SQLQuery = "insert into PriAcctInfo values('" + LogInID + "','" + Updatedefcustdet.firstName + "','" + Updatedefcustdet.lastName + "','" + Updatedefcustdet.email + "','" + Updatedefcustdet.UseDefCustDetails + "')";
                _context.Database.ExecuteSqlCommand(SQLQuery);
            }
            //else it update the fields of the existing record in the database 
			else {
			
                var SQLQuery =
                  "Update PriAcctInfo " +
                  "set CustFirstName = '" + Updatedefcustdet.firstName + "'," +
                  "CustLastName = '" + Updatedefcustdet.lastName + "'," +
                  "CustEmail = '" + Updatedefcustdet.email + "'," +
                  "UseDefCustDetails ='" + Updatedefcustdet.UseDefCustDetails + "'"
                  + "where AuthOID = '" + LogInID + "'";
                _context.Database.ExecuteSqlCommand(SQLQuery);

            }

            return Ok(Updatedefcustdet);
        }


		//this action method is used to update the billing address in the accounts details section 
        [HttpPost]
        [Route("[action]")]
        public void UpdateDefBillAddr([FromBody]JObject data)
        {

            var LogInID = "";
            try
            {
				//gets the login token from Auth0
                LogInID = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            }
            catch (Exception e)
            {
                LogInID = "";


            }
 
			//maps the post data to a class
            CustBillAddrInfo Custbilladdrinfo = data["DefBillAddr"].ToObject<CustBillAddrInfo>();


			//function is used to test of this is the users first time updating his information
            List<Webstore_back__end.models.UpdatDefCustDetSelectTest> Get(string LogInid)
            {
                var SQLQuery = "select AuthOID from CustBillAddrInfo where AuthOID = '" + LogInid + "' ";
                return _context.UpdatDefCustDetSelecttest.FromSql(SQLQuery).ToList();


            }

			//calls the function
            var result = Get(LogInID);
			//if there are no rows, it insert the data into the database
            if (result.Count <= 0)
            {

                var SQLQuery = "insert into CustBillAddrInfo values('" + LogInID + "','" + Custbilladdrinfo.StreetAddress + "','" + Custbilladdrinfo.city + "','" + Custbilladdrinfo.State + "','" + Custbilladdrinfo.ZipCode + "','" + Custbilladdrinfo.Country + "','" + Custbilladdrinfo.UseDefBillAddr + "')";
                _context.Database.ExecuteSqlCommand(SQLQuery);
            }
			//else it update the fields of the existing record in the database 
            else
            {

                var SQLQuery =
                  "Update CustBillAddrInfo " +
                  "set StreetAddress = '" + Custbilladdrinfo.StreetAddress + "'," +
                  "city = '" + Custbilladdrinfo.city + "'," +
                  "State = '" + Custbilladdrinfo.State + "'," +
                  "ZipCode ='" + Custbilladdrinfo.ZipCode + "'," +
                  "Country ='" + Custbilladdrinfo.Country + "'," +
                  "UseDefBillAddr ='" + Custbilladdrinfo.UseDefBillAddr + "'"
                  + " where AuthOID = '" + LogInID + "'";
                _context.Database.ExecuteSqlCommand(SQLQuery);

            }

          


        }

		//this action method is used to update the delivery address in the accounts details section 
        [HttpPost]
        [Route("[action]")]
        public void UpdateDefDelivAddr([FromBody]JObject data)
        {


            var LogInID = "";
            try
            {	//gets the login token from Auth0
                LogInID = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            }
            catch (Exception e)
            {
                LogInID = "";


            }
 
			//maps the post data to a class
			CustDelivAddrInfo Custdelivaddrinfo = data["DefDelivAddr"].ToObject<CustDelivAddrInfo>();


			//function is used to test of this is the users first time updating his information
            List<Webstore_back__end.models.UpdatDefCustDetSelectTest> Get(string LogInid)
            {
                var SQLQuery = "select AuthOID from CustDelivAddrInfo where AuthOID = '" + LogInid + "' ";
                return _context.UpdatDefCustDetSelecttest.FromSql(SQLQuery).ToList();


            }
			
			//calls the function
            var result = Get(LogInID);

			//if there are no rows, it insert the data into the database
            if (result.Count <= 0)
            {

                var SQLQuery = "insert into CustDelivAddrInfo values('" + LogInID + "','" + Custdelivaddrinfo.StreetAddress + "','" + Custdelivaddrinfo.city + "','" + Custdelivaddrinfo.State + "','" + Custdelivaddrinfo.ZipCode + "','" + Custdelivaddrinfo.Country + "','" + Custdelivaddrinfo.UseDefDelivAddr + "')";
                _context.Database.ExecuteSqlCommand(SQLQuery);
            }
             //else it update the fields of the existing record in the database 
			else
            {

                var SQLQuery =
                  "Update CustDelivAddrInfo " +
                  "set StreetAddress = '" + Custdelivaddrinfo.StreetAddress + "'," +
                  "city = '" + Custdelivaddrinfo.city + "'," +
                  "State = '" + Custdelivaddrinfo.State + "'," +
                  "ZipCode ='" + Custdelivaddrinfo.ZipCode + "'," +
                  "Country ='" + Custdelivaddrinfo.Country + "'," +
                  "UseDefDelivAddr ='" + Custdelivaddrinfo.UseDefDelivAddr + "'"
                  + " where AuthOID = '" + LogInID + "'";
                _context.Database.ExecuteSqlCommand(SQLQuery);

            }








        }


 
    }
}
