namespace NaviGateAPI.Dtos;

public partial class CountriesDto
{
    public int CountryId { get; set; }
    public string CountryName { get; set; }

    public CountriesDto()
    {
        CountryName ??= "";
    }
}