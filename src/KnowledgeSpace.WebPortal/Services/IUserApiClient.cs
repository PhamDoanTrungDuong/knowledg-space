using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnowledgeSpace.ViewModels.Systems;

namespace KnowledgeSpace.WebPortal.Services
{
    public interface IUserApiClient
    {
        Task<UserVm> GetById(string id);
    }
}