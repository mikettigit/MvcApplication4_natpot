using discounter.Models.JsonResults;
using MvcApplication3.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication3.Controllers
{
    public class BlogController : ControllerWrapper
    {
        //
        // GET: /Blog/

        private DataModel dataModel;

        protected DataModel Dm { get { return dataModel ?? (dataModel = new DataModel()); } }

        [AcceptVerbs(new string[] { "Get", "Post" })]
        public ActionResult List()
        {
            string PageId = Request.Params["page"];
            string xml = Dm.GetListXml("news", PageId);

            List<Post> posts = Dm.ParseList(xml);

            Category category = Dm.ParseCategory(xml);
            category.Name = "news";

            if (Request.HttpMethod.ToLower() == "post")
            {
                JsonMessage jm = new JsonMessage();

                if (posts.Count > 0)
                {
                    jm.Result = true;
                    jm.Object = posts;
                }
                else
                {
                    jm.Result = false;
                }

                return Json(jm);
            }
            else
            {
                ViewData["Posts"] = posts;
                ViewData["Category"] = category;
                return View();
            }
        }

        public ActionResult Item(string param1)
        {
            Post post = Dm.GetItem(param1);

            Category category = new Category();
            category.Name = "news";

            ViewData["Post"] = post;
            ViewData["Category"] = category;
                       

            return View();
        }

    }
}
