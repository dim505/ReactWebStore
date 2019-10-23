using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebStore.models
{
    public class ProductsModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Desc { get; set; }
        
        public decimal price { get; set; }

    }
}
