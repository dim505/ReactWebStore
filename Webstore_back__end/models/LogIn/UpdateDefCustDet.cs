using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


//This model represents data being pulled from the Customer information table. This is used by the LoginController. 
namespace Webstore_back__end.models
{
    public class UpdateDefCustDet
    {
        public bool UseDefCustDetails { get; set; }    
        
        public string firstName { get; set; }

        public string lastName { get; set; }

        public string email { get; set; }






        

    }
}
