using discounter.Models.JsonResults;
using ElitaCompany.Helpers;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication3.Controllers
{
    public class ControllerWrapper : Controller
    {
        //CAPTCHA
        public string NewCaptcha()
        {
            string CapthaGuid = System.Guid.NewGuid().ToString();
            string CaptchaText = CapthaGuid.Substring(0, 4).ToUpper(); // System.Guid.NewGuid().ToString().Substring(0, 4).ToUpper();
            SessionManager sm = new SessionManager();
            sm.Set(CapthaGuid, CaptchaText);
            return CapthaGuid;
        }

        private string GetCaptchaText(string id)
        {
            string text = "ЕВРО-СТРОЙ";
            SessionManager sm = new SessionManager();
            object CachedCaptchaText = sm.Get(id);
            if (CachedCaptchaText != null)
            {
                text = CachedCaptchaText as string;
            }
            return text;
        }

        private string ReductCaptсhaText(string id)
        {
            return id.ToLower()
                .Replace("o", "0")
                .Replace("о", "0")
                .Replace("а", "a")
                .Replace("в", "b")
                .Replace("с", "c")
                .Replace("е", "e")
                ;
        }

        public bool VerifyCaptcha(string captchaGuid, string captchaText)
        {
            return (ReductCaptсhaText(captchaText) == ReductCaptсhaText(GetCaptchaText(captchaGuid)));
        }

        [AcceptVerbs(new string[] { "Get", "Post" })]
        public ActionResult UpdateCaptcha()
        {
            JsonMessage jm = new JsonMessage();
            jm.Result = true;
            jm.Object = NewCaptcha();
            return Json(jm);
        }

        public ActionResult Captcha(string id)
        {
            Random random = new Random();

            string text = GetCaptchaText(id);

            string ImageName = id;
            int ImageWidth = 100;
            int ImageHeight = 30;

            Bitmap CaptchaImage = new Bitmap(ImageWidth, ImageHeight);
            Graphics CaptchaImageGraphics = Graphics.FromImage(CaptchaImage);

            //заливка подложки
            Rectangle captchaRect = new Rectangle(0, 0, ImageWidth, ImageHeight);
            HatchBrush hatchBrush = new HatchBrush(HatchStyle.SmallConfetti, Color.LightGray, Color.White);
            //CaptchaImageGraphics.FillRectangle(hatchBrush, captchaRect);

            //создание шрифта
            SizeF size;
            float fontSize = 30;
            Font font;
            // подгонка шрифта под размер картинки
            do
            {
                fontSize--;
                font = new Font("Arial", fontSize, FontStyle.Bold);
                size = CaptchaImageGraphics.MeasureString(text, font);
            } while (size.Width > captchaRect.Width);


            ///////////////////////////////////////////////////////////////////////////////////////////////


            // Set up the text format.
            StringFormat format = new StringFormat();
            format.Alignment = StringAlignment.Center;
            format.LineAlignment = StringAlignment.Center;

            // Create a path using the text and warp it randomly.
            GraphicsPath path = new GraphicsPath();
            path.AddString(
              text,
              font.FontFamily,
              (int)font.Style,
              font.Size, captchaRect,
              format);
            float v = 4F;
            PointF[] points =
              {
                new PointF(
                  random.Next(captchaRect.Width) / v,
                  random.Next(captchaRect.Height) / v),
                new PointF(
                  captchaRect.Width - random.Next(captchaRect.Width) / v,
                  random.Next(captchaRect.Height) / v),
                new PointF(
                  random.Next(captchaRect.Width) / v,
                  captchaRect.Height - random.Next(captchaRect.Height) / v),
                new PointF(
                  captchaRect.Width - random.Next(captchaRect.Width) / v,
                  captchaRect.Height - random.Next(captchaRect.Height) / v)
              };
            Matrix matrix = new Matrix();
            matrix.Translate(0F, 0F);
            path.Warp(points, captchaRect, matrix, WarpMode.Perspective, 0F);

            // Draw the text.
            hatchBrush = new HatchBrush(
              HatchStyle.LargeConfetti,
              Color.LightGray,
              Color.DarkGray);
            CaptchaImageGraphics.FillPath(hatchBrush, path);

            Bitmap UpdateIcon = MvcApplication3.Properties.Resources.captcha_update;
            CaptchaImageGraphics.DrawImage(UpdateIcon, 84, 7, 16, 16);

            // Add some random noise.
            //int m = Math.Max(captchaRect.Width, captchaRect.Height);
            //for (int i = 0; i < (int)(captchaRect.Width * captchaRect.Height / 30F); i++)
            //{
            //    int x = random.Next(captchaRect.Width);
            //    int y = random.Next(captchaRect.Height);
            //    int w = random.Next(m / 50);
            //    int h = random.Next(m / 50);
            //    CaptchaImageGraphics.FillEllipse(hatchBrush, x, y, w, h);
            //}


            ///////////////////////////////////////////////////////////////////////////////////////////////


            //сохранение
            ImageCodecInfo[] codecs = ImageCodecInfo.GetImageEncoders();
            ImageCodecInfo JPGCodec = null;
            foreach (ImageCodecInfo codec in codecs)
            {
                if (codec.MimeType == "image/jpeg")
                    JPGCodec = codec;
            }

            EncoderParameters Params = new EncoderParameters();
            Encoder myEncoder = Encoder.Quality;
            Params.Param[0] = new EncoderParameter(myEncoder, (long)100);

            MemoryStream stream = new MemoryStream();
            CaptchaImage.Save(stream, ImageFormat.Png);

            return new FileContentResult(stream.ToArray(), "image/png");
        }


    }
}
