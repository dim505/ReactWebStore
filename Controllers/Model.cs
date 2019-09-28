using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebStore.Controllers
{
    public partial class ProductAPI
    {
        public class Model
        {

            public List<ProductListItem> Products { get; set; } = new List<ProductListItem>();

            public class ProductListItem
            {
               
                public string title { get; set; }

                public string description { get; set; }


                public int ID { get; set; }







            }





        }


    }

}
