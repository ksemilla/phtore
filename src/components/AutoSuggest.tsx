import { Combobox, Transition } from "@headlessui/react";
import React, { forwardRef, Ref, useCallback, useEffect, useState } from "react"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline"
import { classNames } from "@/utils";
import { useFormContext } from "react-hook-form";
import Spinner from "./Spinner";

export interface GenericRecord extends Record<string, any> {}

interface AutosuggestType<T> extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  options: T[];
  resource: string
  hasError?: boolean
  onQueryChange?: (val: string) => void
  onOptionSelect?: (val: T) => void
  loading?: boolean
  renderOption?: (obj: T) => React.ReactNode
}

const AutoSuggest = forwardRef(
  <T,>(props: AutosuggestType<GenericRecord>, ref: Ref<HTMLInputElement>) => {

    const { getValues } = useFormContext()

    const { options, resource, hasError, onQueryChange, onOptionSelect, loading, renderOption, ...rest } = props

    const [query, setQuery] = useState<string>('')
    const [selectedOption, setSelectedOption] = useState<T | null | undefined>({} as T)

    const filteredOptions = 
      query === ''
      ? options
      : options.filter(option => option?.[resource]?.toLowerCase().includes(query.toLowerCase()))

    const handleSelect: React.Dispatch<React.SetStateAction<T>> = useCallback((selected) => {
      setSelectedOption(selected as T)
      onOptionSelect?.(selected as GenericRecord)
    }, [])

    const displayValue = useCallback((option: GenericRecord) => option?.[resource], [])

    const onSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value)
      onQueryChange?.(event.target.value)
    }, [])

    const className = useCallback(({ active  }: { active: boolean }) =>
    classNames(
      active ? 'text-white bg-indigo-600' : 'text-gray-900',
      'cursor-pointer select-none relative py-2 pl-3 pr-9'
    ), [])

    useEffect(()=>{
      if (rest.name) {
        const val = { [resource]: getValues(rest.name) } as T
        setSelectedOption(val)
      }
    }, [rest.name, getValues])

    return (
      <Combobox value={selectedOption} onChange={handleSelect} nullable as="div">
        <div className="relative">
          <Combobox.Input
            ref={ref}
            {...rest}
            className={classNames(
              hasError ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
              "bg-white relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 sm:text-sm disabled:text-gray-500"
            )}
            displayValue={displayValue}
            onChange={onSelect}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
          <Transition
            as='div'
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {!loading && filteredOptions.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                !loading && filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.id}
                    className={className}
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}
                        >
                          {renderOption ? renderOption(option) : option?.[resource]}
                        </span>
                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
              {loading && <div className="p-2 flex justify-center">
                <Spinner color="text-gray-500"/></div>}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    )
  }
)

export default AutoSuggest as <T>(props: AutosuggestType<GenericRecord> & { ref: Ref<HTMLInputElement> }) => JSX.Element