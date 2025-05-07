namespace NaviGateAPI.Models;

public partial class Countries
{
    public int CountryId { get; set; }
    public int ShipId { get; set; }
    public string CountryName { get; set; }

    public Countries()
    {
        CountryName ??= "";
    }
}