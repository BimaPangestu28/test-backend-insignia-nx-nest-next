'use client';

import Select from 'react-select';
const fixedInputClass =
  'rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm';

/* eslint-disable-next-line */
export interface InputProps {}

export function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass,
  options,
}: any) {
  return (
    <div className="my-5">
      <label htmlFor={labelFor} className="mb-2">
        {labelText}
      </label>
      {type === 'select' ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          className={`${fixedInputClass} ${customClass}`}
          required={isRequired}
          key={id}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options &&
            options.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      ) : type === 'multiple-select' ? (
        <Select
          key={id}
          id={id}
          instanceId={id}
          isMulti
          name={name}
          className={fixedInputClass + customClass}
          classNamePrefix="select"
          options={options}
          onChange={handleChange}
          placeholder={placeholder}
          value={value}
        />
      ) : (
        <input
          key={id}
          onChange={handleChange}
          value={value}
          id={id}
          name={name}
          type={type}
          required={isRequired}
          className={fixedInputClass + customClass}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export default Input;
