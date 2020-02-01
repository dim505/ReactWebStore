using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


//represents the data coming from the front end (Account details page - customer details information Section )
namespace Webstore_back__end.models.LogIn
{
    public class DefCustomerDetails
    {
        public string AuthOID { get; set; }
        public string CustFirstName { get; set; }
        public string CustLastName { get; set; }
        public string CustEmail { get; set; }
        public string UseDefCustDetails { get; set; }
     }

}
