using MvcApplication4_natpot.Helpers;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication16_m.natpot.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        public ActionResult Index()
        {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Post(FormCollection collection)
        {
            JsonMessage jm = new JsonMessage();

            string messagefrom = ConfigurationManager.AppSettings["DefaultMessageFrom"];
            string messageto = ConfigurationManager.AppSettings["DefaultMessageTo"];

            if (String.IsNullOrEmpty(collection["2fea14ff-d8e3-42c1-a230-3917b7a640c9"]))
            {
                return new EmptyResult();
            }
            else  if (String.IsNullOrEmpty(messagefrom))
            {
                jm.Result = true;
                jm.Message = "Невозможно отправить данные - не настроен сервер отправки";
            }
            else if (String.IsNullOrEmpty(messageto))
            {
                jm.Result = true;
                jm.Message = "Невозможно отправить данные - не задан получатель";
            }
            else
            {
                try
                {
                    string subject = "Notification " + Request.Url.Authority;
                    string body = "";
                    Collection<Attachment> attachments = new Collection<Attachment>();

                    string[] AllKeys = ((System.Collections.Specialized.NameValueCollection)(collection)).AllKeys;
                    foreach (var key in AllKeys)
                    {
                        body += key + ": " + collection[key] + System.Environment.NewLine;
                    }

                    foreach (string OneFile in Request.Files)
                    {
                        HttpPostedFileBase hpf = Request.Files[OneFile] as HttpPostedFileBase;
                        if (hpf.ContentLength > 0)
                        {
                            Attachment attachment = new Attachment(hpf.InputStream, hpf.FileName);
                            attachments.Add(attachment);
                        }
                    }

                    MailMessage mailObj = new MailMessage();
                    mailObj.From = new MailAddress(messagefrom);
                    mailObj.To.Add(messageto);
                    mailObj.Subject = subject;
                    mailObj.Body = body;
                    foreach (var attachment in attachments)
                    {
                        mailObj.Attachments.Add(attachment);
                    }

                    SmtpClient SMTPServer = new SmtpClient("localhost");
                    SMTPServer.Send(mailObj);

                    jm.Result = true;
                    jm.Message = "Данные отправлены, благодарим за сотрудничество...";
                }
                catch (Exception e)
                {
                    jm.Result = true;
                    jm.Message = "Во время отправки произошла ошибка - " + e.ToString();
                }
            }

            return Json(jm);
        }

    }
}
