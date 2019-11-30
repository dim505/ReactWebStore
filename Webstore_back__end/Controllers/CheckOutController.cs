using System;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Mvc;
using WebStore.models;
using Microsoft.EntityFrameworkCore;
using Webstore_back__end.models;
using System.Linq;
using System.Collections;
using System.Collections.Generic;

namespace Webstore_back__end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckoutController : ControllerBase
    {



        [HttpPost]

        public IActionResult Checkout([FromBody]JObject data)
        {
            CheckOut checkout = data["CheckOutdata"].ToObject<CheckOut>();
            return Ok();
        
        }


    }
}
