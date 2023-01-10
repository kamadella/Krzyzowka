using Duende.IdentityServer.EntityFramework.Options;
using Krzyzowka.Models;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Krzyzowka.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }

        public DbSet<Question> Questions { get; set; }
        public DbSet<ClosedQuestion> OpenQuestions { get; set; }
        public DbSet<ClosedQuestion> ClosedQuestions { get; set; }
        public DbSet<PossibleAnswer> PossibleAnswers { get; set; }
        public DbSet<CorrectAnswer> CorrectAnswers { get; set; }
    }
}