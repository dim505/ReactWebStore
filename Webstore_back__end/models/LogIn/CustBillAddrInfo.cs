using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


//represents the data coming from the front end (Account details page - billing address information Section)
namespace Webstore_back__end.models
{
    public class CustBillAddrInfo
    {
        public string AuthOID { get; set; }
        public string StreetAddress { get; set; }
        public string city { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Country { get; set; }
        public string UseDefBillAddr { get; set; }
    }
}
