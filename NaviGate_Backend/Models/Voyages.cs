namespace NaviGateAPI.Models;

public partial class Voyages
{
    public int VoyageId { get; set; }
    public int ShipId { get; set; }
    public DateTime VoyageDate { get; set; }
    public string VoyageDeparturePort { get; set; }
    public string VoyageArrivalPort { get; set; }
    public DateTime VoyageStart { get; set; }
    public DateTime VoyageEnd { get; set; }

    public Voyages()
    {
        VoyageDeparturePort ??= "";
        VoyageArrivalPort ??= "";
    }
}