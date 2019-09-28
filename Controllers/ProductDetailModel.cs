// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebStore.Controllers
{
    public partial class ProductAPI
    {
        public class ProductDetailModel

        {

            public int ID { get; set; }
            public string Name { get; set; }

            public string desc { get; set; }

            public string price { get; set; }


        }


    }

}
