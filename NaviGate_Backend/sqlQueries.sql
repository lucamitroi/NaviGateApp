--CREATE THE DATABASE
CREATE DATABASE NaviGateDatabase
GO

--USE THE DATABASE
USE NaviGateDatabase
GO

--CREATE THE SCHEMA
CREATE SCHEMA NaviGateSchema
GO

--CREATE THE USERS TABLE
CREATE TABLE NaviGateSchema.Users (
    UserId INT IDENTITY(1, 1) NOT NULL,
    FirstName NVARCHAR(50),
    LastName NVARCHAR(50),
    Email NVARCHAR(50) 
)
GO

--CREATE THE AUTH TABLE
CREATE TABLE NaviGateSchema.Auth (
    Email NVARCHAR(50),
    PasswordHash VARBINARY(MAX),
    PasswordSalt VARBINARY(MAX)
)
GO

--CREATE THE SHIPS TABLE
CREATE TABLE NaviGateSchema.Ships (
    ShipId INT IDENTITY(1, 1),
    UserId INT,
    ShipName NVARCHAR(100),
    MaxSpeed DECIMAL(20,5)
)
GO

--CREATE CLUSTERED INDEX FOR NaviGateSchema.Ships
CREATE CLUSTERED INDEX cix_Ships_UserId_ShipId ON NaviGateSchema.Ships(UserId, ShipId)
GO

--CREATE THE VOYAGES TABLE
CREATE TABLE NaviGateSchema.Voyages (
    VoyageId INT IDENTITY(1, 1),
    ShipId INT,
    VoyageDate DATETIME,
    VoyageDeparturePortId INT,
    VoyageArrivalPortId INT,
    VoyageStart DATETIME,
    VoyageEnd DATETIME
)
GO

INSERT INTO NaviGateSchema.Voyages (ShipId, VoyageDate, VoyageDeparturePortId, VoyageArrivalPortId, VoyageStart, VoyageEnd)
VALUES (1, '2025-05-01', 1, 2, '2025-05-01 08:00', '2025-05-03 14:00');

--CREATE CLUSTERED INDEX FOR NaviGateSchema.Voyages
CREATE CLUSTERED INDEX cix_Voyages_ShipId_VoyageId ON NaviGateSchema.Voyages(ShipId, VoyageId)
GO

--CREATE THE PORTS TABLE
CREATE TABLE NaviGateSchema.Ports (
    PortId INT IDENTITY(1, 1),
    PortName NVARCHAR(100),
    PortCountry NVARCHAR(100)
)
GO

--CREATE THE COUNTRIES TABLE
CREATE TABLE NaviGateSchema.Countries (
    CountryId INT IDENTITY(1, 1),
    CountryName NVARCHAR(100),
)
GO

--CREATE THE CountryPorts TABLE
CREATE TABLE NaviGateSchema.CountryPorts (
    CountryPortsId INT IDENTITY(1, 1),
    CountryId INT,
    PortId INT
)
GO

--CREATE CLUSTERED INDEX FOR NaviGateSchema.CountryPorts
CREATE CLUSTERED INDEX cix_CountryPorts_CountryId_PortId ON NaviGateSchema.CountryPorts(CountryId, PortId)
GO