using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NaviGateAPI.Data;
using NaviGateAPI.Dtos;
using NaviGateAPI.Models;

namespace NaviGateAPI.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class ShipController : ControllerBase
{
    private readonly DataContextDapper _dapper;
    public ShipController(IConfiguration config)
    {
        _dapper = new DataContextDapper(config);
    }

    // Endpoint used to get all the information related to a user Ships
    [HttpGet("GetShips/{userId}/{shipId}")]
    public IEnumerable<ShipDto> GetShips(int userId, int shipId = 0)
    {
        string shipSql = @"
        SELECT [ShipId], 
            [UserId],
            [ShipName], 
            [MaxSpeed] 
        FROM NaviGateSchema.Ships WHERE UserId = " + userId.ToString();

        if(shipId != 0) {
            shipSql += " AND ShipId = " + shipId.ToString();
        }

        IEnumerable<ShipDto> ships = _dapper.LoadData<ShipDto>(shipSql);

        foreach (ShipDto ship in ships)
        {
            string voyageSql = @"
            SELECT 
                V.VoyageId, 
                V.ShipId,
                V.VoyageDate,
                DP.PortName AS VoyageDeparturePort,
                VoyageDeparturePortId,
                AP.PortName AS VoyageArrivalPort,
                VoyageArrivalPortId,
                V.VoyageStart,
                V.VoyageEnd
            FROM NaviGateSchema.Voyages V
            JOIN NaviGateSchema.Ports DP 
                ON V.VoyageDeparturePortId = DP.PortId
            JOIN NaviGateSchema.Ports AP 
                ON V.VoyageArrivalPortId = AP.PortId
            WHERE V.ShipId = " + ship.ShipId.ToString();
            ship.ListOfVoyages = _dapper.LoadData<VoyagesDto>(voyageSql);

            string portsSql = @"
            SELECT DISTINCT 
                P.PortId,
                P.PortName,
                P.PortCountry
            FROM NaviGateSchema.Voyages V
            JOIN NaviGateSchema.Ports P
                ON P.PortId IN (V.VoyageDeparturePortId, V.VoyageArrivalPortId)
            WHERE V.ShipId = " + ship.ShipId.ToString();
            ship.ListOfPorts = _dapper.LoadData<PortsDto>(portsSql);

            string countriesSql = @"
                SELECT DISTINCT 
                    C.CountryId,
                    C.CountryName
                FROM NaviGateSchema.Voyages V
                JOIN NaviGateSchema.CountryPorts CP
                    ON (
                        (CP.PortId = V.VoyageDeparturePortId AND V.VoyageStart >= DATEADD(YEAR, -1, GETDATE()))
                        OR
                        (CP.PortId = V.VoyageArrivalPortId AND V.VoyageEnd >= DATEADD(YEAR, -1, GETDATE()))
                    )
                JOIN NaviGateSchema.Countries C
                    ON CP.CountryId = C.CountryId
                WHERE V.ShipId = " + ship.ShipId.ToString();
            ship.ListOfCountries = _dapper.LoadData<CountriesDto>(countriesSql);
        }
        return ships;
    }

    // Endpoint used to add a new Ship
    [HttpPost("AddShip")]
    public IActionResult AddShip(ShipToAddDto shipToAdd)
    {
        string findUserSql = "SELECT UserId FROM NaviGateSchema.Users WHERE UserId = " + shipToAdd.UserId.ToString();
        try
        {
            _dapper.LoadSingleData<int>(findUserSql);
        }
        catch (InvalidOperationException)
        {
            return StatusCode(404, "The user with the UserId = " + shipToAdd.UserId + " not found!");
        }

        string sql = @"
        INSERT INTO NaviGateSchema.Ships (
            [UserId],
            [ShipName],
            [MaxSpeed]
        ) VALUES ("
        + shipToAdd.UserId +
        ", '" + shipToAdd.ShipName +
        "', " + shipToAdd.MaxSpeed + ")";

        if (_dapper.ExecuteSql(sql))
        {
            return Ok();
        }
        throw new Exception("Failed to add the Ship!");
    }

    // Endpoint used to edit a Ship
    [HttpPut("EditShip")]
    public IActionResult EditProject(ShipToEditDto shipToEdit)
    {
        string sql = @"
        UPDATE NaviGateSchema.Ships 
            SET ShipName = '" + shipToEdit.ShipName +
            "', MaxSpeed = " + shipToEdit.MaxSpeed +
            @" WHERE ShipId = " + shipToEdit.ShipId.ToString() +
                    "AND UserId = " + this.User.FindFirst("userId")?.Value;

        if (_dapper.ExecuteSql(sql))
        {
            return Ok();
        }
        throw new Exception("Failed to edit the ship!");
    }

    // Endpoint used to delete a ship; it also deletes all the related voyages, contries and ports
    [HttpDelete("DeleteShip/{shipId}")]
    public IActionResult DeleteShip(int shipId)
    {
        string sqlRemoveVoyages = "DELETE FROM NaviGateSchema.Voyages WHERE ShipId = " + shipId.ToString();
        string sqlRemoveShip = "DELETE FROM NaviGateSchema.Ships WHERE ShipId = " + shipId.ToString();

        _dapper.ExecuteSql(sqlRemoveVoyages);

        if (_dapper.ExecuteSql(sqlRemoveShip))
        {
            return Ok();
        }
        throw new Exception("Failed to Delete the Ship");

    }
}