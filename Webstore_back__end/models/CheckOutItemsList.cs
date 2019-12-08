using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Webstore_back__end.models
{

    [Table("CartLineItem")]
    public class CheckOutItemsList
    {

        [Key]
        public int ID { get; set; }
        public int ProdID { get; set; }
        public Decimal price { get; set; }
        public int ProdQty { get; set; }



    }
}
