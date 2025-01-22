using Application.UseCases.GetAllCrimes;
using Microsoft.AspNetCore.SignalR;

namespace Web.Hubs
{
    public class RealHub : Hub
    {
        public async Task AddingCrime(ShowOnMapCrimeResponse crimeDto)
        {
            if (crimeDto == null)
            {
                await Clients.Caller.SendAsync("Error", "Invalid request for add crime");
                return;
            }

            await Clients.Others.SendAsync("AddedCrime", crimeDto);
        }

        public async Task UpdatingCrime(ShowOnMapCrimeResponse crimeDto)
        {
            if (crimeDto == null)
            {
                await Clients.Caller.SendAsync("Error", "Invalid request for update crime");
                return;
            }

            await Clients.Others.SendAsync("UpdatedCrime", crimeDto);
        }

        public async Task DeletingCrime(Guid? id)
        {
            if (id == null)
            {
                await Clients.Caller.SendAsync("Error", "Invalid request for delete crime");
                return;
            }

            await Clients.Others.SendAsync("DeletedCrime", id);
        }
    }
}
