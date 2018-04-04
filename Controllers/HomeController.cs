using discounter.Models.JsonResults;
using MvcApplication3.Models;
using System;
using System.Configuration;
using System.IO;
using System.Net.Mail;
using System.Web.Mvc;

namespace MvcApplication3.Controllers
{
    public class HomeController : ControllerWrapper
    {
        private DataModel dataModel;

        protected DataModel Dm { get { return dataModel ?? (dataModel = new DataModel()); } }

        public ActionResult Index()
        {
            //ViewData["CaptсhaGuid"] = NewCaptcha();

            ViewData["PostSpoiler4"] = Dm.GetItem("262");

            return View();
        }


        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Feedback(FormCollection collection)
        {

            JsonMessage jm = new JsonMessage();

            try
            {
                string system = collection["system"];
                string name = collection["name"];
                string phone = collection["phone"];
                string email = collection["email"];
                string message = collection["message"];

                string subject = "Запись на замер c сайта demyr";
                string body = "Система: " + system + "\n";
                body += "Имя: " + name + "\n";
                body += "Телефон: " + phone + "\n";
                body += "Email: " + email + "\n";
                if (message != null)
                {
                    body += "Сообщение: " + message + "\n";
                }

                if (Convert.ToBoolean(ConfigurationManager.AppSettings["UseAgavaMail"]))
                {
                    //1
                    MailMessage mailObj = new MailMessage();
                    mailObj.From = new MailAddress(ConfigurationManager.AppSettings["messageFrom"]);
                    mailObj.To.Add(ConfigurationManager.AppSettings["messageTo"]);
                    mailObj.Subject = subject;
                    mailObj.Body = body;

                    SmtpClient SMTPServer = new SmtpClient("localhost");
                    SMTPServer.Send(mailObj);

                    //2
                    if (!String.IsNullOrWhiteSpace(email))
                    {
                        MailMessage mailObj2 = new MailMessage();
                        mailObj2.From = new MailAddress(ConfigurationManager.AppSettings["messageFrom"]);
                        mailObj2.To.Add(email);
                        mailObj2.Subject = "Облако. Благодарим Вас за обращение в нашу компанию";

                        string filename = Server.MapPath("/Content/themes/ictec/templates/mail.htm");
                        if (System.IO.File.Exists(filename))
                        {
                            using (StreamReader sr = new StreamReader(filename))
                            {
                                mailObj2.Body = sr.ReadToEnd();
                            };
                            mailObj2.IsBodyHtml = true;

                            SMTPServer.Send(mailObj2);
                        }
                    }
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
                    mail.Body = body;

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
    }
}
