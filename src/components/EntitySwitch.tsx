import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { classNames } from '@/utils'
import { useQuery } from '@apollo/client'
import { EntityType } from '@/types'
import { MY_ENTITIES } from '@/api'
import Spinner from './Spinner'
import { useNavigate, useParams } from 'react-router-dom'

export default function EntitySwitch() {
  const navigate = useNavigate()
  const { slug } = useParams<{slug: string}>()
  const [selected, setSelected] = useState<EntityType>()
  const {loading, data} = useQuery<{ myEntities: EntityType[] }, {}>(MY_ENTITIES, {fetchPolicy: "no-cache"})

  useEffect(()=>{
    if (data) {
      const entity = data.myEntities.find(el => el.slug === slug)
      if (entity) setSelected(entity)
    }
  }, [data])

  useEffect(()=>{
    if (selected) {
      navigate(`/${selected?.slug}/admin`)
    }
  }, [selected])

  if (loading) {
    return <div className='flex justify-center'>
      <Spinner color='text-gray-500'/>
    </div>
  }

  return (
    <Listbox value={selected ?? {}} onChange={setSelected}>
      {({ open }) => (
        <>
          {/* <Listbox.Label className="block text-sm font-medium text-gray-700">Assigned to</Listbox.Label> */}
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate">{selected?.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data?.myEntities.map((entity) => (
                  <Listbox.Option
                    key={entity.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={entity}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {entity.name}
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
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
