using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webstore_back__end.models
{
    public class CheckOut
    {
        public String SessionId { get; set; }

        public BillingAddress billingAddress { get; set;  }
        public DeliveryAddress deliveryAddress { get; set; }
        public string paymentToken { get; set; }

        public Customer customer { get; set; }







        public class BillingAddress
        { 
                    public string StreetAddress { get; set; }
                    public string city { get; set; }

                    public string State { get; set; }
                   
                    public string ZipCode { get; set; }

                    public string Country { get; set; }

        }

        public class DeliveryAddress
        {
            public string StreetAddress { get; set; }
            public string city { get; set; }

            public string State { get; set; }

            public string ZipCode { get; set; }

            public string Country { get; set; }

        }



        public class Customer
        {

            public string firstName { get; set; }
            public string lastName { get; set; }
            public string email { get; set; }




        }






    }
}
