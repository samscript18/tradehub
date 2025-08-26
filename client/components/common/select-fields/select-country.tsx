import React, { FC, useEffect, useState } from 'react';
import SelectField from '../inputs/select-field';
import ListTile from '../list-tile';
import { nigerianStatesAndCities } from '@/lib/data';
import { cn } from '@/lib/utils';

interface Props {
	onLocationSelect?: (location: { country: string; state: string; city: string }) => void;
	loading?: boolean;
	label?: string;
	helperText?: string;
	className?: string;
	initialCountry?: string;
	initialState?: string;
	initialCity?: string;
}

const SelectCountry: FC<Props> = ({
	onLocationSelect,
	loading = false,
	className,
	initialCountry = '',
	initialState = '',
	initialCity = '',
}) => {
	const [selectedCountry, setSelectedCountry] = useState<string>('');
	const [selectedState, setSelectedState] = useState<string>('');
	const [selectedCity, setSelectedCity] = useState<string>('');

	useEffect(() => {
    setSelectedCountry(initialCountry);
    setSelectedState(initialState);
    setSelectedCity(initialCity);
  }, [initialCountry, initialState, initialCity]);

  useEffect(() => {
    if (selectedCountry && selectedState && selectedCity) {
      onLocationSelect?.({
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
      });
    }
  }, [selectedCountry, selectedState, selectedCity, onLocationSelect]);

	const handleCountryChange = (option: {
		value: string | number | { label?: string; min?: number; max?: number | null };
	}) => {
		setSelectedCountry(String(option.value));
		setSelectedState('');
		setSelectedCity('');
	};

	const handleStateChange = (option: {
		value: string | number | { label?: string; min?: number; max?: number | null };
	}) => {
		setSelectedState(String(option.value));
		setSelectedCity('');
	};

	const handleCityChange = (option: {
		value: string | number | { label?: string; min?: number; max?: number | null };
	}) => {
		const cityValue = String(option.value);
		setSelectedCity(cityValue);
		onLocationSelect?.({
			country: selectedCountry,
			state: selectedState,
			city: selectedCity || cityValue,
		});
	};

	const availableCities = selectedState
		? nigerianStatesAndCities[selectedState as keyof typeof nigerianStatesAndCities]?.cities || []
		: [];

	return (
		<div className={cn(`w-full grid grid-cols-1 gap-12`, className)}>
			<SelectField
				loading={loading}
				className="w-full"
				placeholder="Country"
				label="Country"
				data={[
					{
						label: <ListTile title="Nigeria" />,
						value: 'nigeria',
						id: 'nigeria',
					},
				]}
				value={selectedCountry}
				onSelect={handleCountryChange}
				onClear={() => {
					setSelectedCountry('');
					setSelectedState('');
					setSelectedCity('');
				}}
			/>

			<SelectField
				loading={loading}
				className="w-full"
				placeholder={selectedCountry ? 'State' : 'Select country first'}
				label="State"
				disabled={!selectedCountry}
				data={Object.entries(nigerianStatesAndCities).map(([key, state]) => ({
					label: <ListTile title={state.name} />,
					value: state.name.toLowerCase(),
					id: key,
				}))}
				value={selectedState}
				onSelect={handleStateChange}
				onClear={() => {
					setSelectedState('');
					setSelectedCity('');
				}}
				onSearch={(search) => {
					const filteredStates = Object.entries(nigerianStatesAndCities)
						.filter(([_, state]) => {
							console.log(_);
							return state.name.toLowerCase().includes(search!.toLowerCase());
						})
						.map(([key, state]) => ({
							label: <ListTile title={state.name} />,
							value: state.name.toLowerCase(),
							id: key,
						}));
					return filteredStates;
				}}
			/>

			<SelectField
				loading={loading}
				className="w-full"
				placeholder={selectedState ? 'City' : 'Select state first'}
				label="City"
				disabled={!selectedState}
				data={availableCities.map((city) => ({
					label: <ListTile title={city} />,
					value: city.toLowerCase(),
					id: city,
				}))}
				value={selectedCity}
				onSelect={handleCityChange}
				onClear={() => {
					setSelectedCity('');
				}}
				onSearch={(search) => {
					const filteredCities = availableCities
						.filter((city) => city.toLowerCase().includes(search!.toLowerCase()))
						.map((city) => ({
							label: <ListTile title={city} />,
							value: city.toLowerCase(),
							id: city,
						}));
					return filteredCities;
				}}
			/>
		</div>
	);
};

export default SelectCountry;
