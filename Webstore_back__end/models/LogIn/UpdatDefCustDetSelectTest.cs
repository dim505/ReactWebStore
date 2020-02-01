using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


//This model is used by the Login controller. Action methods use this model to see if there is a record associated with
//a customer. They used that information to update an existing record or insert another one. 
namespace Webstore_back__end.models
{
    public class UpdatDefCustDetSelectTest
    {
        [Key]
        public string AuthOID { get; set; }
    }
}
