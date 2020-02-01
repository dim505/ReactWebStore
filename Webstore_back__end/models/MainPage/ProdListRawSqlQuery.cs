

//used by the productapi controller. This model represents the data being sent to the client to prepopulate the main
//page with products 
namespace WebStore.models
{
    public class ProdListRawSqlQuery
    {

        public int ID { get; set; }
        public string Name { get; set; }
        public string ShortDesc { get; set; }


    }
}
