using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Webstore_back__end.models
{
	//this model represents the data that returns all the items with the customers session ID assoicated with a shopping cart
	//The checkout controller uses this
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
