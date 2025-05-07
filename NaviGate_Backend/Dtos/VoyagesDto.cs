namespace NaviGateAPI.Dtos;

public partial class VoyagesDto
{
    public int VoyageId { get; set; }
    public DateTime VoyageDate { get; set; }
    public string VoyageDeparturePort { get; set; }
    public int VoyageDeparturePortId {get; set; }
    public string VoyageArrivalPort { get; set; }
    public int VoyageArrivalPortId {get; set; }
    public DateTime VoyageStart { get; set; }
    public DateTime VoyageEnd { get; set; }

    public VoyagesDto()
    {
        VoyageDeparturePort ??= "";
        VoyageArrivalPort ??= "";
    }
}