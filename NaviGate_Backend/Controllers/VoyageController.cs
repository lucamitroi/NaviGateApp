using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NaviGateAPI.Data;
using NaviGateAPI.Dtos;
using NaviGateAPI.Helpers;

namespace NaviGateAPI.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class VoyageController : ControllerBase
{
    private readonly DataContextDapper _dapper;
    private readonly ControllerHelper _controllerHelper;
    public VoyageController(IConfiguration config)
    {
        _dapper = new DataContextDapper(config);
        _controllerHelper = new ControllerHelper(config);
    }

    // Endpoint used to get all the information related to a user Ships
    [HttpGet("GetVoyages/{shipId}/{voyageId}")]
    public IEnumerable<VoyagesDto> GetVoyages(int shipId, int voyageId = 0)
    {
        string voyageSql = @"
        SELECT 
            V.VoyageId, 
            V.ShipId,
            V.VoyageDate,
            DP.PortName AS VoyageDeparturePort,
            DP.PortId AS VoyageDepartureId,
            AP.PortName AS VoyageArrivalPort,
            AP.PortId AS VoyageArrivalId,
            V.VoyageStart,
            V.VoyageEnd
        FROM NaviGateSchema.Voyages V
        JOIN NaviGateSchema.Ports DP 
            ON V.VoyageDeparturePortId = DP.PortId
        JOIN NaviGateSchema.Ports AP 
            ON V.VoyageArrivalPortId = AP.PortId
        WHERE V.ShipId = " + shipId.ToString();

        if(voyageId != 0) {
            voyageSql += " AND VoyageId = " + voyageId.ToString();
        }

        IEnumerable<VoyagesDto> voyages = _dapper.LoadData<VoyagesDto>(voyageSql);

        return voyages;
    }

    // Endpoint used to add a new Ship
    // This endpoint is also responsible of adding new ports and countries in their respective tables. In case they already exist, 
    // their existing id will be used to get the required information
    [HttpPost("AddVoyage")]
    public IActionResult AddVoyage(VoyageToAddDto voyageToAdd)
    {
        string findShipSql = "SELECT ShipId FROM NaviGateSchema.Ships WHERE ShipId = " + voyageToAdd.ShipId.ToString();
        try
        {
            _dapper.LoadSingleData<int>(findShipSql);
        }
        catch (InvalidOperationException)
        {
            return StatusCode(404, "The ship with the ShipId = " + voyageToAdd.ShipId + " was not found!");
        }

        int departurePortId = _controllerHelper.AddPort(voyageToAdd.VoyageDeparturePortName, voyageToAdd.VoyageDeparturePortCountry);
        int arrivalPortId = _controllerHelper.AddPort(voyageToAdd.VoyageArrivalPortName, voyageToAdd.VoyageArrivalPortCountry);

        DateTime formatedVoyageStart = DateTime.ParseExact(voyageToAdd.VoyageStart.ToString(), "M/d/yyyy h:mm:ss tt", null);
        DateTime formatedVoyageEnd = DateTime.ParseExact(voyageToAdd.VoyageEnd.ToString(), "M/d/yyyy h:mm:ss tt", null);

        string sql = @"
        INSERT INTO NaviGateSchema.Voyages (
            [ShipId],
            [VoyageDate],
            [VoyageDeparturePortId],
            [VoyageArrivalPortId],
            [VoyageStart],
            [VoyageEnd]
        ) VALUES ("
        + voyageToAdd.ShipId +
        ", GETDATE()" + 
        ", " + departurePortId + 
        ", " + arrivalPortId + 
        ", '" + formatedVoyageStart.ToString("MM-dd-yy HH:mm:ss") + 
        "', '" + formatedVoyageEnd.ToString("MM-dd-yy HH:mm:ss") + "')";

        if (_dapper.ExecuteSql(sql))
        {
            return Ok();
        }
        throw new Exception("Failed to add the Voyage!");
    }

    // Endpoint used to edit a Ship
    [HttpPut("EditVoyage")]
    public IActionResult EditVoyage(VoyageToEditDto voyageToEdit)
    {
        int departurePortId = _controllerHelper.AddPort(voyageToEdit.VoyageDeparturePortName, voyageToEdit.VoyageDeparturePortCountry);
        int arrivalPortId = _controllerHelper.AddPort(voyageToEdit.VoyageArrivalPortName, voyageToEdit.VoyageArrivalPortCountry);

        DateTime formatedVoyageStart = DateTime.ParseExact(voyageToEdit.VoyageStart.ToString(), "M/d/yyyy h:mm:ss tt", null);
        DateTime formatedVoyageEnd = DateTime.ParseExact(voyageToEdit.VoyageEnd.ToString(), "M/d/yyyy h:mm:ss tt", null);

        string sql = @"
        UPDATE NaviGateSchema.Voyages 
            SET VoyageDeparturePortId = " + departurePortId.ToString() +
            ", VoyageArrivalPortId = " + arrivalPortId.ToString() +
            ", VoyageStart = '" + formatedVoyageStart.ToString("MM-dd-yy HH:mm:ss") +
            "', VoyageEnd = '" + formatedVoyageEnd.ToString("MM-dd-yy HH:mm:ss") + "'" +
            @" WHERE VoyageId = " + voyageToEdit.VoyageId.ToString();

        if (_dapper.ExecuteSql(sql))
        {
            return Ok();
        }
        throw new Exception("Failed to edit the voyage!");
    }

    // Endpoint used to delete a ship; it also deletes all the related voyages, contries and ports
    [HttpDelete("DeleteVoyage/{voyageId}")]
    public IActionResult DeleteShip(int voyageId)
    {
        string sqlRemoveVoyages = "DELETE FROM NaviGateSchema.Voyages WHERE VoyageId = " + voyageId.ToString();

          if (_dapper.ExecuteSql(sqlRemoveVoyages))
        {
            return Ok();
        }
        throw new Exception("Failed to Delete the Ship");

    }
}