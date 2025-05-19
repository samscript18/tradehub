import React, { FC } from 'react';
import SelectField from '../inputs/select-field';
import ListTile from '../list-tile';

interface Props {
  data: number[];
  loading: boolean;
  onSelect(level?: number): void;
  selected?: number;
  label?: string;
  helperText?: string;
  placeholder?: string;
}

const SelectLevel: FC<Props> = ({
  data,
  loading,
  onSelect,
  selected,
  label,
  helperText,
  placeholder,
}) => {
  return (
    <SelectField
      loading={loading}
      className="w-full"
      placeholder={placeholder}
      label={label}
      helperText={helperText}
      data={data?.map((level) => ({
        label: <ListTile title={`${level} Level`} />,
        value: level,
        id: level.toString(),
      }))}
      value={selected ? `${selected} Level` : ''}
      onSelect={(option) => {
        onSelect(option.value);
      }}
      onClear={() => {
        onSelect(undefined);
      }}
      onSearch={(search) => {
        if (!search) {
          return data?.map((level) => ({
            label: <ListTile title={`${level} Level`} />,
            value: level,
            id: level.toString(),
          }));
        }

        if (data) {
          return data
            .filter(
              (level) =>
                search &&
                `${level} Level`.toLowerCase().includes(search.toLowerCase())
            )
            .map((level) => {
              return {
                label: <ListTile title={`${level} Level`} />,
                value: level,
                id: level.toString(),
              };
            });
        }
        return [];
      }}
    />
  );
};

export default SelectLevel;
