using MvcApplication4_natpot.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication4_natpot.Controllers
{
    public class PagesController : Controller
    {
        private DataModel dataModel;
    
        protected DataModel Dm { get { return dataModel ?? (dataModel = new DataModel()); } }

        public ActionResult Index(string param1)
        {
            if (param1.ToLower() == "blinds.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("234");
            }
            if (param1.ToLower() == "rollets.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("873");
            }
            if (param1.ToLower() == "pricerequest.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("247");
            }
            if (param1.ToLower() == "exclusive.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("766");
            }
            if (param1.ToLower() == "photoforprinting.cshtml")
            {
                ViewData["Post"] = Dm.GetItem("950");
            }

            string ViewFileName = "~/Views/Pages/" + param1;

            if (Request.IsAjaxRequest())
            {
                return PartialView(ViewFileName);
            }
            else
            {
                return View(ViewFileName);
            }
        }

    }
}
