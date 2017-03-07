using System.Web;
using System.Web.Mvc;

namespace MvcApplication16_m.natpot
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}