using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webstore_back__end.models
{
    public class CartLineItem
    {

        public int ID { get; set; }

        public string SessionID { get; set; } 

        public int ProdId { get; set; }

        public int Quantity { get; set; }
    }
}
