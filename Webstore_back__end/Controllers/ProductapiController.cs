using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebStore.models;
using Microsoft.EntityFrameworkCore;


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






        
        // GET: api/Productapi
        [HttpGet]
        public IQueryable Get()


        {
            return _context.products.FromSql("SELECT [ID],[Name],[ShortDesc] FROM [webstore_db].[dbo].[products]");

        }
        // GET: api/Productapi/5
        [HttpGet("{id}", Name = "Get")]
        public IQueryable Get(string id)
        {

            var SqlQuery = "SELECT [ID],[Name],[LongDesc],[price],[ImgPath],[ImgPathMin] FROM [webstore_db].[dbo].[products] where id = " + id;
            return _context.product.FromSql(SqlQuery);
        }

    }
}
