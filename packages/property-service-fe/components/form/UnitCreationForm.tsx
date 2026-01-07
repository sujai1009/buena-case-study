'use client'
import { ChevronDownIcon, PhotoIcon } from '@heroicons/react/16/solid'
import Form from 'next/form';
import { FormEvent, useState } from 'react';

 interface Props {
  title: string;
  router: any;
  onSubmit: any;
  buildingId: any;
 }

export default function UnitCreationForm({title, router, buildingId, onSubmit} : Props) {
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())
        onSubmit(data);
    }

    return (
        <Form className='p-5' onSubmit={handleSubmit} action={''}>
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">{title}</h2>
                <p className="mt-1 text-sm/6 text-gray-600">Use this form to create new unit(s) for building {buildingId}</p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="uNo" className="block text-sm/6 font-medium text-gray-900">
                            Unit No
                            <input type='hidden' name="buildingId" id="buildingId" value={buildingId}/>
                        </label>
                        <div className="mt-2">
                            <input
                                id="uNo"
                                name="uNo"
                                type="number"
                                required
                                autoComplete="Unit Number"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="type" className="block text-sm/6 font-medium text-gray-900">
                            Unit Type
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                            <select
                            id="type"
                            name="type"
                            required
                            autoComplete="unit-type"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            >
                                {/* <option>Select type</option> */}
                                <option value={0}>Apartment</option>
                                <option value={1}>Office</option>
                                <option value={2}>Garden</option>
                                <option value={3}>Parking</option>
                                <option value={4}>TEMP_TYPE</option>
                            </select>
                            <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="floor" className="block text-sm/6 font-medium text-gray-900">
                            Floor
                        </label>
                        <div className="mt-2">
                            <input
                                id="floor"
                                name="floor"
                                type="text"
                                required
                                autoComplete="Floor"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="entrance" className="block text-sm/6 font-medium text-gray-900">
                            Entrance
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                            <select
                            id="entrance"
                            name="entrance"
                            required
                            autoComplete="unit-type"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            >
                                {/* <option>Select type</option> */}
                                <option value={0}>North</option>
                                <option value={1}>South</option>
                                <option value={2}>East</option>
                                <option value={3}>West</option>
                            </select>
                            <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            />
                        </div>
                    </div>
                    
                    <div className="sm:col-span-3">
                        <label htmlFor="size" className="block text-sm/6 font-medium text-gray-900">
                            Unit size
                        </label>
                        <div className="mt-2">
                            <input
                                id="size"
                                name="size"
                                type="number"
                                required
                                autoComplete="Unit size"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="builtYear" className="block text-sm/6 font-medium text-gray-900">
                            Built Year
                        </label>
                        <div className="mt-2">
                            <input
                                id="builtYear"
                                name="builtYear"
                                type="number"
                                required
                                autoComplete="Built Year"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    
                    <div className="sm:col-span-3">
                        <label htmlFor="rooms" className="block text-sm/6 font-medium text-gray-900">
                            Rooms in Unit
                        </label>
                        <div className="mt-2">
                            <input
                                id="rooms"
                                name="rooms"
                                type="number"
                                required
                                autoComplete="Rooms in Unit"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="coOwnershipShare" className="block text-sm/6 font-medium text-gray-900">
                            Co Ownership share
                        </label>
                        <div className="mt-2">
                            <input
                                id="coOwnershipShare"
                                name="coOwnershipShare"
                                type="text"
                                required
                                autoComplete="Co Ownership share"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" 
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => router.back()}>
                Cancel
                </button>
                <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Save
                </button>
            </div>
        </Form>
    );
}