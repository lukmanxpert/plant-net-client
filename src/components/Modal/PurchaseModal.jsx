/* eslint-disable react/prop-types */
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import Button from '../Shared/Button/Button';

const PurchaseModal = ({ closeModal, isOpen, plant }) => {
  const { user } = useAuth();
  const { name, category, quantity, price } = plant;
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);

  const handleQuantity = (q) => {
    // Convert input value to number and handle empty input
    const quantityNumber = q === "" ? "" : Number(q);
    // setTotalPrice(quantityNumber && quantityNumber * price)
    if (quantityNumber === "") {
      setTotalQuantity(""); // Allow empty input temporarily
      setTotalPrice(0)
    } else if (quantityNumber > quantity) {
      toast.error("Total quantity exceeded!");
      setTotalQuantity(quantity);
      setTotalPrice(quantity * price)
    } else if (quantityNumber < 1) {
      toast.error("Quantity cannot be less than 1!");
      setTotalQuantity(1);
      setTotalPrice(price)
    } else {
      setTotalQuantity(quantityNumber);
      setTotalPrice(quantityNumber * price)
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium text-center leading-6 text-gray-900'
                >
                  Review Info Before Purchase
                </DialogTitle>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Plant: {name}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Category: {category}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Customer: {user?.displayName}</p>
                </div>

                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Price: $ {price}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Available Quantity: {quantity}</p>
                </div>
                <div className='flex space-y-2 items-center gap-2 text-sm'>
                  <label htmlFor='quantity' className='block text-gray-600'>
                    Quantity:
                  </label>
                  <input
                    className='px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                    name='quantity'
                    id='quantity'
                    type='number'
                    max={quantity}
                    min={1}
                    value={totalQuantity}
                    onChange={(e) => handleQuantity(e.target.value)}
                    required
                  />
                </div>
                <div className='space-y-2 flex items-center gap-2 text-sm'>
                  <label htmlFor='name' className='block text-gray-600'>
                    Address:
                  </label>
                  <input
                    className='px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                    name='name'
                    id='name'
                    type='text'
                    placeholder='shipping address'
                    required
                  />
                </div>
                <div className='mt-2'>
                  <Button label={`Pay $${totalPrice}`}></Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default PurchaseModal;
