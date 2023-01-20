using Duende.IdentityServer.EntityFramework.Options;
using Krzyzowka.Models;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Data;

namespace Krzyzowka.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }

        public DbSet<Question> Questions { get; set; }
        public DbSet<PossibleAnswer> PossibleAnswers { get; set; }
        public DbSet<CorrectAnswer> CorrectAnswers { get; set; }

        public DbSet<Crossword> Crosswords { get; set; }
        public DbSet<WordPlacement> WordPlacements { get; set; }
        public DbSet<GuessWord> GuessWords { get; set; }
        public DbSet<CrosswordSave> CrosswordSaves { get; set; }


    }
}