using Microsoft.Data.SqlClient;
using NaviGateAPI.Data;
namespace NaviGateAPI.Helpers;

public class ControllerHelper
{
    private readonly DataContextDapper _dapper;
    public ControllerHelper(IConfiguration config)
    {
        _dapper = new DataContextDapper(config);
    }

    // Function that is used to populate the Ports and Countries tables, and ensure their relationship is correct. The function returns the id of the port.
    // In case the port and the country already exist, the function will return the id that already exists.
    public int AddPort(string portName, string portCountry)
    {
        // Check if the country exists
        string findCountrySql = "SELECT CountryId FROM NaviGateSchema.Countries WHERE CountryName = @CountryName";
        int? countryId = _dapper.LoadSingleDataNoError<int?>(findCountrySql, new { CountryName = portCountry });

        if (countryId == null)
        {
            string insertCountrySql = @"
                INSERT INTO NaviGateSchema.Countries (CountryName)
                VALUES (@CountryName);
                SELECT CAST(SCOPE_IDENTITY() AS INT)";
            countryId = _dapper.LoadSingleDataNoError<int>(insertCountrySql, new { CountryName = portCountry });
        }

        // Check if the port exists
        string findPortSql = "SELECT PortId FROM NaviGateSchema.Ports WHERE PortName = @PortName AND PortCountry = @portCountry";
        int? portId = _dapper.LoadSingleDataNoError<int?>(findPortSql, new { PortName = portName, PortCountry = portCountry });

        if (portId == null)
        {
            string insertPortSql = @"
                INSERT INTO NaviGateSchema.Ports (PortName, PortCountry)
                VALUES (@PortName, @PortCountry);
                SELECT CAST(SCOPE_IDENTITY() AS INT)";
            portId = _dapper.LoadSingleDataNoError<int>(insertPortSql, new { PortName = portName, PortCountry = portCountry });
        }

        // Check if the country-port relationship exists
        string findPortIdSql = "SELECT PortId FROM NaviGateSchema.CountryPorts WHERE PortId = @PortId";
        if (_dapper.LoadSingleDataNoError<int?>(findPortIdSql, new { PortId = portId }) == null)
        {
            string insertCountryPortSql = @"
                INSERT INTO NaviGateSchema.CountryPorts (CountryId, PortId)
                VALUES (@CountryId, @PortId)";

            List<SqlParameter> parameters =
            [
                new("@CountryId", countryId),
                new("@PortId", portId)
            ];

        _dapper.ExecuteSqlWithParameters(insertCountryPortSql, parameters);
        }

        string portIdReturnSql = "SELECT PortId FROM NaviGateSchema.Ports WHERE PortName = '" + portName + "' AND PortCountry = '" + portCountry + "'";
        return _dapper.LoadSingleData<int>(portIdReturnSql);
    }
}