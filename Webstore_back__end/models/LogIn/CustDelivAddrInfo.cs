using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


//represents the data coming from the front end (Account details page - Delivery address information Section)
namespace Webstore_back__end.models
{
    public class CustDelivAddrInfo
    {
        public string AuthOID { get; set; }
        public string StreetAddress { get; set; }
        public string city { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Country { get; set; }
        public string UseDefDelivAddr { get; set; }
    }
}
