using System;

namespace discounter.Models.JsonResults
{
    public class JsonMessage
    {
        private bool _result;
        private string _message;
        private Object _object;

        public bool Result
        {
            get { return _result; }
            set { _result = value; }
        }

        public string Message
        {
            get { return _message; }
            set { _message = value; }
        }

        public Object Object 
        { 
            get { return _object; } 
            set { _object = value; } 
        }

    }
}
