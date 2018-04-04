using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication3.Controllers
{
    public enum Pages { Main, Ceilings, Price, Dealers, Blinds, Rollets, Pictures, Blog, Lights };
    
    public class PagesController : Controller
    {
        //
        // GET: /Pages/

        public ActionResult Index(string param1)
        {
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
