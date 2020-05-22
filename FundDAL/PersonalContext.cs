using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FundDAL
{
    public partial class PersonalContext : DbContext
    {
        public PersonalContext()
        {
        }

        public PersonalContext(DbContextOptions<PersonalContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Accounts> Accounts { get; set; }
        public virtual DbSet<CyberAccount> CyberAccount { get; set; }
        public virtual DbSet<Emails> Emails { get; set; }
        public virtual DbSet<FundAllocation> FundAllocation { get; set; }
        public virtual DbSet<FundsValue> FundsValue { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.;Database=Personal;Trusted_connection=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Accounts>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CountName).HasMaxLength(100);

                entity.Property(e => e.Email)
                    .HasColumnName("EMAIL")
                    .HasMaxLength(150);

                entity.Property(e => e.Owner).HasMaxLength(50);

                entity.Property(e => e.Password).HasMaxLength(50);

                entity.Property(e => e.SecurityQuestion1).HasMaxLength(50);

                entity.Property(e => e.SecurityQuestion2).HasMaxLength(50);

                entity.Property(e => e.SecurityQuestion3).HasMaxLength(50);

                entity.Property(e => e.Url)
                    .HasColumnName("URL")
                    .HasMaxLength(150);

                entity.Property(e => e.UserName).HasMaxLength(100);
            });

            modelBuilder.Entity<CyberAccount>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Institution)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RelatedCompany)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Emails>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Address).HasMaxLength(50);

                entity.Property(e => e.Owner).HasMaxLength(50);

                entity.Property(e => e.Password).HasMaxLength(50);

                entity.Property(e => e.SecurityQuestion1).HasMaxLength(50);

                entity.Property(e => e.SecurityQuestion2).HasMaxLength(50);

                entity.Property(e => e.SecurityQuestion3).HasMaxLength(50);
            });

            modelBuilder.Entity<FundAllocation>(entity =>
            {
                entity.HasKey(e => e.Symbol);

                entity.HasIndex(e => e.Symbol)
                    .HasName("FundAllocationPK")
                    .IsUnique();

                entity.Property(e => e.Symbol)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DateModified).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.NonUsequity).HasColumnName("NonUSEquity");

                entity.Property(e => e.Usequity).HasColumnName("USEquity");
            });

            modelBuilder.Entity<FundsValue>(entity =>
            {
                entity.HasKey(e => e.FvId)
                    .HasName("PK_FundsValue_fvID");

                entity.Property(e => e.FvId).HasColumnName("fvID");

                entity.Property(e => e.AccountId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CyberAccountId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.FundName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FundType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FundTypeFull)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Notes)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Value).HasColumnType("money");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
