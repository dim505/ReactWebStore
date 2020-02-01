using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


//This Model represents the data being sent to the CartController from the front end to update the quantity of an item in a cart
namespace Webstore_back__end.models
{
    public class UpdateCart
    {


        public bool UpdateLinkClicked { get; set; }
        public string qty { get; set; }
        public int ItmID { get; set; }

        public string SessionID { get; set; }




    }
}
