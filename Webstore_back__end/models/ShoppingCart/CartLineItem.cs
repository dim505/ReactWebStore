﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

//this model represent data (items) thats being pulled from the CartLineItem table. The Cart Controller uses this 
namespace WebStore.models
{
    public class CartLineItem
    {

       
        public int ID { get; set; }

        public string SessionID { get; set; } 

        public int ProdID { get; set; }

        public int ProdQty { get; set; }
    }
}
