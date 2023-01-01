import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import { useEntityStore } from '@/stores'
import useCartStore from '@/stores/cart'
import OrderItem from './OrderItem'
import { useNavigate } from 'react-router-dom'

type OrderSummaryProps = {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export default function OrderSummary(props: OrderSummaryProps) {

  const navigate = useNavigate()
  const entity = useEntityStore(state=>state.entity)
  const order = useCartStore(state=>state.order)
  const { show, setShow } = props

  const total = order.items.reduce((acc, obj)=>{
    return acc + (obj.sellPrice * obj.quantity)
  }, 0)

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShow}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-2xl">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setShow(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl divide-y-2">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-lg font-medium text-gray-900">Order Summary</Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 px-4 sm:px-6 divide-y">
                        {/* <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true" /> */}
                        <div className='space-y-6 py-4'>
                          {order.items.map((item, idx) => (
                            <OrderItem
                              key={item.uuid}
                              orderItem={item}
                              idx={idx}
                              setShow={setShow}
                            />
                          ))}
                        </div>
                        <div className='space-y-2 py-2'>
                          <div className='flex justify-end'>
                            <div className='bg-gray-50 rounded'>
                              <div className='divide-y space-y-2 px-4 py-6'>
                                <div className='w-72 flex justify-between'>
                                  <div className='text-gray-500 text-sm'>Subtotal</div>
                                  <div className='text-gray-800'>&#8369; {total.toFixed(2)}</div>
                                </div>
                                <div className='w-72 flex justify-between py-2'>
                                  <div className='flex text-gray-500 text-sm'>Shipping <QuestionMarkCircleIcon className='w-4'/></div>
                                  <div className='text-gray-800'>&#8369; 0</div>
                                </div>
                                <div className='w-72 flex justify-between py-2'>
                                  <div className='flex text-gray-900'>Total</div>
                                  <div>&#8369; {total.toFixed(2)}</div>
                                </div>
                              </div>
                              <div className='w-full box-border flex justify-between py-2'>
                                <button
                                  className='bg-indigo-600 w-full rounded p-2 m-2 text-white hover:bg-indigo-700'
                                  onClick={()=>{
                                    navigate(`/${entity?.slug}/checkout`)
                                    setShow(false)
                                  }}
                                >Checkout</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
