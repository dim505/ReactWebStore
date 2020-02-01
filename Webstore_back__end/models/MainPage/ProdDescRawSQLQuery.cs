using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


//used by ProductAPI controller to get data about a single product to be displayed by the product description page
namespace WebStore.models
{
    public class ProdDescRawSQLQuery
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string LongDesc { get; set; }

        public decimal price { get; set; }

        public string ImgPath { get; set; }

        public string ImgPathMin { get; set; }


    }
}
