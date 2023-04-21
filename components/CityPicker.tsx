"use client";

import { FC, useState } from "react";
import { Country, City } from "country-state-city";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { GlobeIcon } from "@heroicons/react/solid";

interface CityPickerProps {}

const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

type option =
  | {
      value: {
        latitude: string;
        longitude: string;
        isoCode: string;
      };
      label: string;
    }
  | null
  | undefined;

type cityOption =
  | {
      value: {
        latitude: string | null | undefined;
        longitude: string | null | undefined;
        countryCode: string;
        name: string;
        stateCode: string;
      };
      label: string;
    }
  | null
  | undefined;

const CityPicker: FC<CityPickerProps> = ({}) => {
  const [selectedCountry, setSelectedCountry] = useState<option>(null);
  const [selectedCity, setSelectedCity] = useState<cityOption>(null);
  const router = useRouter();

  const handleSelectedCountry = (option: option) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };

  const handleSelectedCity = (option: cityOption) => {
    setSelectedCity(option);
    // router.push(`location`,{
    //     query: {
    //         latitude: option?.value.latitude,
    //         longitude: option?.value.longitude,
    //     }
    // })
    // router.push(
    //   `location?latitude=${option?.value.latitude}&longitude=${option?.value.longitude}`
    // );
    router.push(
      `/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white">
          <GlobeIcon className="h-5 w-5 text-white" aria-hidden="true" />
          <label htmlFor="country">Country</label>
        </div>
        <Select
          className="text-black"
          value={selectedCountry}
          onChange={handleSelectedCountry}
          options={options}
        />
      </div>
      {selectedCountry && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white">
            <GlobeIcon className="h-5 w-5 text-white" aria-hidden="true" />
            <label htmlFor="city">City</label>
          </div>
          <Select
            className="text-black"
            value={selectedCity}
            onChange={handleSelectedCity}
            options={City.getCitiesOfCountry(
              selectedCountry.value.isoCode
            )?.map((city) => ({
              value: {
                latitude: city.latitude,
                longitude: city.longitude,
                countryCode: city.countryCode,
                name: city.name,
                stateCode: city.stateCode,
              },
              label: city.name,
            }))}
          />
        </div>
      )}
    </div>
  );
};

export default CityPicker;
