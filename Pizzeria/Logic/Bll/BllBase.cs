using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBobinaTesla.Bll
{
    public class BllBase
    {
        protected BllResult OperationResult;

        public BllBase()
        {
            OperationResult = new BllResult();
        }
        protected void SetResponseOK()
        {
            this.OperationResult.Status = true;
        }
        protected void SetResponseFail(string msg)
        {
            this.OperationResult.Status = false;
            this.OperationResult.Message = msg;
        }
    }
}
