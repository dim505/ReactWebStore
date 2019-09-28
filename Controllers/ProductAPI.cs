using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebStore.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public partial class ProductAPI : Controller
    {


        public IActionResult list()
        {
            Model model = GetProdList();
            return Ok(model);
        }

        private static Model GetProdList()
        {
            return new Model
            {
                Products = new List<Model.ProductListItem>
                {
                    new Model.ProductListItem { ID = 1, title = "Tuna", description = "Made from fish" }



                }
            };
        }

        [HttpGet("{id}")]
        public IActionResult details(int id)
        {
            return Ok(new ProductDetailModel{ID = id, Name = "Insert Product Name", desc = "Insert Product Desc", price= "9999999999999999999"});
        }


    }

}
