using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcApplication3.Models
{
    public class Post
    {
        public string Id;
        public string Title;
        public string Description;
        public string Content;
        public DateTime Date;
        public string DateString
        {
            get { return Date.ToString("dd.MM.yyyy"); }
        }

        public Post()
        {
            Id = "";
            Title = "";
            Description = "";
            Content = "";
            Date = DateTime.MinValue;
        }
    }
}