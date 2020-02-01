using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


//used by LoginController to represent the data for all the orders that were placed with a particular account. 
//gets sent back to the front end 
namespace Webstore_back__end.models
{
    public class GetAllOrders
    {
       
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string BillingStrAddr { get; set; }
        public string BillingCity { get; set; }
        public string BillingState { get; set; }
        public string BillingZipCode { get; set; }
        public string BillingCountry { get; set; }
        public string DelivStrAddr { get; set; }
        public string DelivCity { get; set; }
        public string DelivZipCode { get; set; }
        public string DelivState { get; set; }
        public string DelivCountry { get; set; }
        public string CheckoutTime { get; set; }
        public int ProdQty { get; set; }
        public string Name { get; set; }
        public decimal price { get; set; }
       



    }
}

