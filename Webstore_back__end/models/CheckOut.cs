using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webstore_back__end.models
{
    public class CheckOut
    {
        public String SessionId { get; set; }

        public Address BillingAddress { get; set;  }
        public Address DeliveryAddress { get; set; }
        public string PaymentToken { get; set; }
 






        public class Address
             { 
                    public string Street { get; set; }
                    public string City { get; set; }
                    public string Country { get; set; }
                    
                    public string zipcode { get; set; }
        
             }

        public class CustDetails {

            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }




        }



    }
}
