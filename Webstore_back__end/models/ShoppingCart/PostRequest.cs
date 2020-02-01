using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


//used by the Cart Controller, data comes from the front end when adding an item to a cart
namespace Webstore_back__end.models
{
    public class PostRequest
    {


            public string Sessionid { get; set; }
            public int ProdID { get; set; }
            public int ProdQTY { get; set; }


       


    }
}
