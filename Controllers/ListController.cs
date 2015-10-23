using MvcApplication4_natpot.Helpers;
using MvcApplication4_natpot.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication4_natpot.Controllers
{
    public class ListController : Controller
    {
        private DataModel dataModel;

        protected DataModel Dm { get { return dataModel ?? (dataModel = new DataModel()); } }

        [AcceptVerbs(new string[] { "Get", "Post" })]
        public ActionResult List(string param1)
        {
            string PageId = Request.Params["page"];
            string xml = Dm.GetListXml(param1, PageId);

            List<Post> posts = Dm.ParseList(xml);
            
            Category category = Dm.ParseCategory(xml);
            category.Name = param1;

            if (Request.HttpMethod.ToLower() == "post")
            {
                JsonMessage jm = new JsonMessage();

                if (posts.Count > 0){
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

                if (param1.ToLower() == "news")
                {
                    return View("ListNews");
                }
                else if (param1.ToLower() == "vacancies")
                {
                    return View("ListVacancies");
                }
                else if (param1.ToLower() == "feedback")
                {
                    return View("ListFeedback");
                }

                return View();
            }
        }

        public ActionResult Item(string param1, string param2)
        {
            Post post = Dm.GetItem(param2);
            
            Category category = new Category();
            category.Name = param1;

            ViewData["Post"] = post;
            ViewData["Category"] = category;

            if (param1.ToLower() == "gallery")
            {
                return View("ItemGallery");
            }
            else if (param1.ToLower() == "fordealers")
            {
                return View("ItemForDealers");
            }
            else if (param1.ToLower() == "news")
            {
                return View("ItemNews");
            }
            else if (param1.ToLower() == "discounts")
            {
                return View("ItemDiscounts");
            }

            return View();
        }

    }
}
