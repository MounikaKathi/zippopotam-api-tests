Feature: Zippopotam postcode lookup API

  As a third-party developer
  I want to retrieve postcode information for US and Great Britain
  So that I can consume valid location details from the API

  @happy-path
  Scenario Outline: Verify retrieving postcode information for  valid  country code and postcode
    Given I have a country code "<countryCode>" and postal code "<postalCode>"
    When I request postcode information from the Zippopotam API
    Then the API response status code should be 200
    And the API response content type should be "application/json"
    And the API response should contain postcode "<postalCode>"
    And the API response should contain country "<expectedCountry>" and country abbreviation "<expectedCountryAbbreviation>"
    And the API response should contain at least one place
    And each place should contain the required location fields

    Examples:
      | countryCode | postalCode | expectedCountry | expectedCountryAbbreviation |
      | US          | 90210      | United States   | US                          |
      | GB          | ip4        | Great Britain   | GB                          |
      | us          | 90210      | United States   | US                          |
      | gb          | DA1        | Great Britain   | GB                          |

  @unhappy-path
  Scenario Outline: Verify the API returns Not Found for a non-existent postcode in a supported country
    Given I have a country code "<countryCode>" and postal code "<invalidPostalCode>"
    When I request postcode information from the Zippopotam API
    Then the API response status code should be 404

    Examples:
      | countryCode | invalidPostalCode |
      | US          | 00000             |
      | GB          | DA1 UL            |
      | US          |                   |
      | GB          | DA1@              |

  @unhappy-path
  Scenario Outline: Verify the API returns Not Found for a non-existent country code in a supported postcode
    Given I have a country code "<invalidCountryCode>" and postal code "<postalCode>"
    When I request postcode information from the Zippopotam API
    Then the API response status code should be 404

    Examples:
      | invalidCountryCode | postalCode |
      | GBP                | DA1        |
      | USA                | 90210      |
      | ZZ                 | IP4        |
      |                    | 90001      |
