import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";

type onChangeType = (
  newValue: SingleValue<Option> | MultiValue<Option>,
  actionMeta: ActionMeta<Option>
) => void;

interface Option {
  value: string;
  label: string;
  last?: boolean;
  time?: string;
}
interface SelectConfig {
  boxShadow?: string;
  isSelectedFocus?: string;
  bgOptionColor?: string;
  Data: Option[];
}
interface ISelectProps {
  config: SelectConfig;
  onChange: onChangeType;
  isMulti?: boolean;
  placeholder: string;
}

function SelectComponent({
  config,
  onChange,
  isMulti,
  placeholder,
}: ISelectProps) {
  const customStylesReactSelect = {
    control: (provided: any, state: any) => ({
      ...provided,
      boxShadow: state.isFocused ? config.boxShadow : provided.borderColor,
      "&:hover": {
        boxShadow: state.isFocused ? config.boxShadow : provided.borderColor,
      },
    }),
    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? config.isSelectedFocus
          : isFocused
          ? config.isSelectedFocus
          : undefined,
        color: isDisabled ? "#fff" : isSelected ? "#ddd" : "black",
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? "red"
              : config.bgOptionColor
            : undefined,
        },
      };
    }, //option end
    multiValue: (styles: any, { data }: any) => {
      return {
        ...styles,
        backgroundColor: config.bgOptionColor,
      };
    },
  };

  const handleChange = (
    newValue: MultiValue<Option> | SingleValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    // Si isMulti es true, newValue es un array, de lo contrario, es un solo valor o null
    onChange(
      isMulti === true
        ? (newValue as MultiValue<Option>)
        : (newValue as SingleValue<Option>),
      actionMeta
    ); // Pasa directamente el valor a tu función onChange original
  };

  return (
    <>
      <Select
        isMulti={isMulti}
        options={config.Data}
        styles={customStylesReactSelect}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </>
  );
}

export default SelectComponent;
