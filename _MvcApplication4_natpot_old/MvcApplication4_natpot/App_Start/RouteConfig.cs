using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace MvcApplication4_natpot
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute("etapy-montazhaw", "etapy-montazhaw", new { controller = "Pages", action = "Index", param1 = Path.GetFileName("InstallationStages.cshtml") });
            routes.MapRoute("vybrat-cvetl", "vybrat-cvetl", new { controller = "Pages", action = "Index", param1 = Path.GetFileName("ColorRequest.cshtml") });
            routes.MapRoute("stoimostg", "stoimostg", new { controller = "Pages", action = "Index", param1 = Path.GetFileName("PriceRequest.cshtml") });
            routes.MapRoute("maskirovochnaya-lentab", "montazh-potolkav/maskirovochnaya-lentab", new { controller = "Pages", action = "Index", param1 = Path.GetFileName("MaskingBand.cshtml") });
            routes.MapRoute("obvody-karnizyp", "montazh-potolkav/obvody-karnizyp", new { controller = "Pages", action = "Index", param1 = Path.GetFileName("PipeBypass.cshtml") });
            routes.MapRoute("svetilniki-v-nalichiim", "montazh-potolkav/svetilniki-v-nalichiim", new { controller = "Pages", action = "Index", param1 = Path.GetFileName("Lights.cshtml") });
            routes.MapRoute("montazh-potolkav", "montazh-potolkav", new { controller = "Pages", action = "Index", param1 = Path.GetFileName("CeilingsInstallation.cshtml") });
            routes.MapRoute("dileramw", "dileramw", new { controller = "Pages", action = "Index", param1 = Path.GetFileName("ForDealers.cshtml") });
            routes.MapRoute("novostit", "novostit", new { controller = "List", action = "List", param1 = "News" });
            routes.MapRoute("akcii-bonusy", "akcii-bonusy", new { controller = "List", action = "List", param1 = "Discounts" });
            routes.MapRoute("zhalyuzie", "zhalyuzie", new { controller = "Pages", action = "Index", param1 = Path.GetFileName("Blinds.cshtml") });
            routes.MapRoute("zhilye-pomesheniya", "galereya/zhilye-pomesheniya", new { controller = "List", action = "Item", param1 = "Gallery", param2 = "37" });
            routes.MapRoute("obshestvennye", "galereya/obshestvennye", new { controller = "List", action = "Item", param1 = "Gallery", param2 = "41" });
            routes.MapRoute("seminary", "galereya/seminary", new { controller = "List", action = "Item", param1 = "Gallery", param2 = "43" });
            routes.MapRoute("galereya", "galereya", new { controller = "Pages", action = "Index", param1 = Path.GetFileName("Gallery.cshtml") });
            routes.MapRoute("gostevaya", "gostevaya", new { controller = "List", action = "List", param1 = "Feedback" });
            routes.MapRoute("kontakty", "kontakty", new { controller = "Home", action = "Contacts" });

            string[] pages = Directory.GetFiles(HttpContext.Current.Server.MapPath("/Views/Pages/"), "*.cshtml");
            foreach (string page in pages)
            {
                string PageName = Path.GetFileNameWithoutExtension(page);
                routes.MapRoute(
                    PageName, // Route name
                    PageName, // URL with parameters
                    new { controller = "Pages", action = "Index", param1 = Path.GetFileName(page) } // Parameter defaults
                );
            }

            string[] ListNames = new string[] { "News", "Discounts", "Gallery", "Vacancies", "ForDealers", "Feedback" };
            foreach (string ListName in ListNames)
            {
                routes.MapRoute(
                    ListName + "List",
                    "List/" + ListName,
                    defaults: new { controller = "List", action = "List", param1 = ListName }
                );
                routes.MapRoute(
                    ListName + "Item",
                    "List/" + ListName + "/{param2}",
                    defaults: new { controller = "List", action = "Item", param1 = ListName, param2 = UrlParameter.Optional }
                );
            }

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{param1}",
                defaults: new { controller = "Home", action = "Index", param1 = UrlParameter.Optional }
            );
        }
    }
}