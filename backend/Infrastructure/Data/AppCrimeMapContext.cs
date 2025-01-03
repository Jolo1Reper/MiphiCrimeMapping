﻿using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace Infrastructure.Data
{
    public class AppCrimeMapContext(DbContextOptions<AppCrimeMapContext> options) : DbContext(options)
    {
        public DbSet<Crime> Crimes { get; set; } = null!;
        public DbSet<CrimeType> CrimeTypes { get; set; } = null!;
        public DbSet<WantedPerson> WantedPersons { get; set; } = null!;
        public DbSet<Lawsuit> Lawsuits { get; set; } = null!;
    }
}
