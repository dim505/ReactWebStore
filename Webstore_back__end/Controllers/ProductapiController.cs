using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebStore.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace WebStore.Controllers

{
    
    [Route("api/[controller]")]
    [ApiController]
    public class ProductapiController : ControllerBase
    {


        private readonly WebStoreDbContext _context;

        public ProductapiController(WebStoreDbContext context)
        {
            _context = context;
        }






        
        // GET: api/Productapi, API endpoint to retrive all products for the home page
        [HttpGet]
        public IQueryable Get()


        {	//gets all product information from the database 
            return _context.products.FromSql("SELECT [ID],[Name],[ShortDesc] FROM [webstore_db].[dbo].[products]");

        }
        // GET: api/Productapi/5, API end point for getting more detailed information about a product for the product detailed page
        [HttpGet("{id}", Name = "Get")]
        public IQueryable Get(string id)
        {
			//gets information for a single product 
            var SqlQuery = "SELECT [ID],[Name],[LongDesc],[price],[ImgPath],[ImgPathMin] FROM [webstore_db].[dbo].[products] where id = " + id;
            return _context.product.FromSql(SqlQuery);
        }

    }
}
