'use strict';

// Tasks for rewriting:
//   - Apply optimizations of computing resources: processor, memory
//   - Minimize cognitive complexity
//   - Respect SRP and SoC
//   - Improve readability (understanding), reliability
//   - Optimize for maintainability, reusability, flexibility
//   - Make code testable
//   - Implement simple unittests without frameworks
//   - Try to implement in multiple paradigms: OOP, FP, procedural, mixed

class City {
  constructor(name, population, area, density, country) {
    this.name = name;
    this.population = parseInt(population);
    this.area = parseInt(area);
    this.density = parseInt(density);
    this.country = country;
    this.densityPercentage = 0;
  }

  calculateDensityPercentage(maxDensity) {
    this.densityPercentage = Math.round((this.density / maxDensity) * 100);
  }

  toString() {
    return `${this.name.padEnd(18)}${this.population
      .toString()
      .padStart(10)}${this.area.toString().padStart(8)}${this.density
      .toString()
      .padStart(8)}${this.country.padStart(18)}${this.densityPercentage
      .toString()
      .padStart(6)}`;
  }
}

class CityDataProcessor {
  constructor(data) {
    this.data = data;
    this.cities = [];
    this.maxDensity = 0;
  }

  processData() {
    const lines = this.data.split('\n');
    lines.shift(); // Remove header

    for (const line of lines) {
      const [name, population, area, density, country] = line.trim().split(',');
      const city = new City(name, population, area, density, country);
      this.cities.push(city);
      this.maxDensity = Math.max(this.maxDensity, city.density);
    }

    this.calculateDensityPercentages();
    this.sortCities();
  }
  deleteLastCity() {
    this.cities.pop();
  }

  calculateDensityPercentages() {
    for (const city of this.cities) {
      city.calculateDensityPercentage(this.maxDensity);
    }
  }

  sortCities() {
    this.cities.sort((a, b) => b.densityPercentage - a.densityPercentage);
  }

  printCities() {
    for (const city of this.cities) {
      console.log(city.toString());
    }
  }
}

// Usage
const cityData = `city,population,area,density,country
  Shanghai,24256800,6340,3826,China
  Delhi,16787941,1484,11313,India
  Lagos,16060303,1171,13712,Nigeria
  Istanbul,14160467,5461,2593,Turkey
  Tokyo,13513734,2191,6168,Japan
  Sao Paulo,12038175,1521,7914,Brazil
  Mexico City,8874724,1486,5974,Mexico
  London,8673713,1572,5431,United Kingdom
  New York City,8537673,784,10892,United States
  Bangkok,8280925,1569,5279,Thailand`;

const processedCities = new CityDataProcessor(cityData);
processedCities.processData();
processedCities.deleteLastCity();
processedCities.printCities();

// Simple unit tests without frameworks
function testCity() {
  const testCity = new City(
    'TestCity',
    '1000000',
    '100',
    '10000',
    'TestCountry'
  );
  console.assert(testCity.name === 'TestCity', 'City name test failed');
  console.assert(
    testCity.population === 1000000,
    'City population test failed'
  );
  console.assert(testCity.area === 100, 'City area test failed');
  console.assert(testCity.density === 10000, 'City density test failed');
  console.assert(
    testCity.country === 'TestCountry',
    'City country test failed'
  );

  testCity.calculateDensityPercentage(20000);
  console.assert(
    testCity.densityPercentage === 50,
    'City density percentage calculation test failed'
  );

  const cityString = testCity.toString();
  console.assert(
    cityString.includes('TestCity') &&
        cityString.includes('1000000') &&
        cityString.includes('100') &&
        cityString.includes('10000') &&
        cityString.includes('TestCountry') &&
        cityString.includes('50'),
    'City toString test failed'
  );
}

// Test CityDataProcessor class

function testCityDataProcessor() {
  const testData = `city,population,area,density,country
TestCity1,1000000,100,10000,TestCountry1
TestCity2,2000000,200,10000,TestCountry2`;

  const processor = new CityDataProcessor(testData);
  processor.processData();

  console.assert(
    processor.cities.length === 2,
    'CityDataProcessor cities count test failed'
  );
  console.assert(
    processor.maxDensity === 10000,
    'CityDataProcessor maxDensity test failed'
  );

  processor.deleteLastCity();
  console.assert(
    processor.cities.length === 1,
    'CityDataProcessor deleteLastCity test failed'
  );

  const firstCity = processor.cities[0];
  console.assert(firstCity.name === 'TestCity1' &&
        firstCity.population === 1000000 &&
        firstCity.area === 100 &&
        firstCity.density === 10000 &&
        firstCity.country === 'TestCountry1',
  'CityDataProcessor city data test failed');
}

// Run tests
testCity();
testCityDataProcessor();
