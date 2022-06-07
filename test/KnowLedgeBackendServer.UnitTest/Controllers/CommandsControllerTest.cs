using KnowledgeSpace.BackendServer.Controllers;
using KnowledgeSpace.BackendServer.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace KnowLedgeBackendServer.UnitTest.Controllers
{
    public class CommandsControllerTest
    {
        private ApplicationDbContext _context;

        public CommandsControllerTest()
        {
            _context = new InMemoryDbContextFactory().GetApplicationDbContext();
        }

        [Fact]
        public void ShouldCreateInstance_NotNull_Success()
        {
            var usersController = new CommandsController(_context);
            Assert.NotNull(usersController);
        }
    }
}
