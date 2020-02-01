using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


//this model is used by the CartController to retrieve a cart associated with a certain session ID to be returned to the front end 
namespace Webstore_back__end.models
{
    public class ReturnCart
    {

            public int ID { get; set; }

            public string Name { get; set; }
            public int ProdQty { get; set; }
            public decimal price { get; set; }

        
    }


 
}
