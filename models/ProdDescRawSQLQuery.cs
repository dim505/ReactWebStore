using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebStore.models
{
    public class ProdDescRawSQLQuery
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string LongDesc { get; set; }

        public decimal price { get; set; }

        public string ImgPath { get; set; }


    }
}
