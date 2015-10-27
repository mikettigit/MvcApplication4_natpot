using MvcApplication4_natpot.Helpers;
using MvcApplication4_natpot.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication4_natpot.Controllers
{
    public class HomeController : Controller
    {
        private DataModel dataModel;
        protected DataModel Dm { get { return dataModel ?? (dataModel = new DataModel()); } }

        public ActionResult Index()
        {
            string xml = Dm.GetListXml("news", "0");

            List<Post> posts = Dm.ParseList(xml);

            ViewData["Posts"] = posts;
            ViewData["Post"] = Dm.GetItem("293");

            return View();
        }

        public ActionResult Contacts()
        {
            ViewData["Post"] = Dm.GetItem("287");

            return View();
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult MeasurementRequest(FormCollection collection)
        {

            JsonMessage jm = new JsonMessage();

            try
            {
                string name = collection["name"];
                string phone = collection["phone"];
                string body = "Имя: " + name + "\n";
                body += "Телефон: " + phone + "\n";
                string subject = "Запись на замер c сайта natpotolki";

                if (Convert.ToBoolean(ConfigurationManager.AppSettings["UseAgavaMail"]))
                {
                    MailMessage mailObj = new MailMessage();
                    mailObj.From = new MailAddress(ConfigurationManager.AppSettings["messageFrom"]);
                    mailObj.To.Add(ConfigurationManager.AppSettings["messageTo"]);
                    mailObj.Subject = subject;
                    mailObj.Body = body;

                    SmtpClient SMTPServer = new SmtpClient("localhost");
                    SMTPServer.Send(mailObj);
                }
                else
                {
                    System.Web.Mail.MailMessage mail = new System.Web.Mail.MailMessage();

                    string SMTP_SERVER = "http://schemas.microsoft.com/cdo/configuration/smtpserver";
                    string SMTP_SERVER_PORT = "http://schemas.microsoft.com/cdo/configuration/smtpserverport";
                    string SEND_USING = "http://schemas.microsoft.com/cdo/configuration/sendusing";
                    string SMTP_USE_SSL = "http://schemas.microsoft.com/cdo/configuration/smtpusessl";
                    string SMTP_AUTHENTICATE = "http://schemas.microsoft.com/cdo/configuration/smtpauthenticate";
                    string SEND_USERNAME = "http://schemas.microsoft.com/cdo/configuration/sendusername";
                    string SEND_PASSWORD = "http://schemas.microsoft.com/cdo/configuration/sendpassword";

                    mail.Fields[SMTP_SERVER] = ConfigurationManager.AppSettings["SMTP"];
                    mail.Fields[SMTP_SERVER_PORT] = 465;
                    mail.Fields[SEND_USING] = 2;
                    mail.Fields[SMTP_USE_SSL] = true;
                    mail.Fields[SMTP_AUTHENTICATE] = 1;
                    mail.Fields[SEND_USERNAME] = ConfigurationManager.AppSettings["SMTP_login"];
                    mail.Fields[SEND_PASSWORD] = ConfigurationManager.AppSettings["SMTP_password"];

                    mail.From = ConfigurationManager.AppSettings["messageFrom"];
                    mail.To = ConfigurationManager.AppSettings["messageTo"];
                    mail.Subject = subject;
                    mail.BodyFormat = System.Web.Mail.MailFormat.Text;
                    mail.Body += body;

                    System.Web.Mail.SmtpMail.SmtpServer = ConfigurationManager.AppSettings["SMTP"] + ":465";
                    System.Web.Mail.SmtpMail.Send(mail);
                }

                jm.Result = true;
                jm.Message = "Мы получили Ваш запрос и скоро свяжемся с Вами...";
            }
            catch (Exception e)
            {
                jm.Result = true;
                jm.Message = "Во время отправки произошла ошибка - " + e.ToString();
            }

            return Json(jm);
        }
        
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult FeedbackRequest(FormCollection collection)
        {

            JsonMessage jm = new JsonMessage();

            try
            {
                string name = collection["name"];
                string message = collection["message"];

                System.Web.Mail.MailMessage mail = new System.Web.Mail.MailMessage();

                string SMTP_SERVER = "http://schemas.microsoft.com/cdo/configuration/smtpserver";
                string SMTP_SERVER_PORT = "http://schemas.microsoft.com/cdo/configuration/smtpserverport";
                string SEND_USING = "http://schemas.microsoft.com/cdo/configuration/sendusing";
                string SMTP_USE_SSL = "http://schemas.microsoft.com/cdo/configuration/smtpusessl";
                string SMTP_AUTHENTICATE = "http://schemas.microsoft.com/cdo/configuration/smtpauthenticate";
                string SEND_USERNAME = "http://schemas.microsoft.com/cdo/configuration/sendusername";
                string SEND_PASSWORD = "http://schemas.microsoft.com/cdo/configuration/sendpassword";

                mail.Fields[SMTP_SERVER] = ConfigurationManager.AppSettings["SMTP"];
                mail.Fields[SMTP_SERVER_PORT] = 465;
                mail.Fields[SEND_USING] = 2;
                mail.Fields[SMTP_USE_SSL] = true;
                mail.Fields[SMTP_AUTHENTICATE] = 1;
                mail.Fields[SEND_USERNAME] = ConfigurationManager.AppSettings["SMTP_login"];
                mail.Fields[SEND_PASSWORD] = ConfigurationManager.AppSettings["SMTP_password"];

                mail.From = ConfigurationManager.AppSettings["messageFrom"];
                mail.To = ConfigurationManager.AppSettings["messageTo"];
                mail.Subject = "Отзыв c сайта natpotolki";
                mail.BodyFormat = System.Web.Mail.MailFormat.Text;
                mail.Body += "Имя: " + name + "\n";
                mail.Body += "Сообщение: " + message + "\n";

                System.Web.Mail.SmtpMail.SmtpServer = ConfigurationManager.AppSettings["SMTP"] + ":465";
                System.Web.Mail.SmtpMail.Send(mail);

                jm.Result = true;
                jm.Message = "Мы получили Ваш отзыв и опубликуем его после проверки...";
            }
            catch (Exception e)
            {
                jm.Result = true;
                jm.Message = "Во время отправки произошла ошибка - " + e.ToString();
            }

            return Json(jm);
        }
    }
}
