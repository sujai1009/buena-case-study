'use client'

import Form from 'next/form';
import { FormEvent, useState } from 'react';
import AddressForm from './AddressForm';

interface Props {
    title: string;
    router: any;
    propertyId: any
    onSubmit: any
}

export default function BuildingCreationForm({title, router, propertyId, onSubmit} : Props) {
    const [isbulkCreation, setIsbulkCreation] = useState(true)
    
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
                <p className="mt-1 text-sm/6 text-gray-600">Use this form to create new building(s) for property {propertyId}</p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                            Building Name
                            <input type='hidden' name="propertyId" id="propertyId" value={propertyId}/>
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                autoComplete="Property name"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="houseNumber" className="block text-sm/6 font-medium text-gray-900">
                            Building Number
                        </label>
                        <div className="mt-2">
                            <input
                                id="houseNumber"
                                name="houseNumber"
                                type="text"
                                required
                                autoComplete="Building number"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <AddressForm isbulkCreation={false}/>
                    
                    <div className="flex gap-3 sm:col-span-3">
                        <div className="flex h-6 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                            <input
                                id="isbulkCreation"
                                name="isbulkCreation"
                                type="checkbox"
                                aria-describedby="candidates-description"
                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                onChange={(checkBoxEvent) => setIsbulkCreation(!checkBoxEvent.target.checked) }
                            />
                            <svg
                                fill="none"
                                viewBox="0 0 14 14"
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                            >
                                <path
                                d="M3 8L6 11L11 3.5"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-0 group-has-checked:opacity-100"
                                />
                                <path
                                d="M3 7H11"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-0 group-has-indeterminate:opacity-100"
                                />
                            </svg>
                            </div>
                        </div>
                        <div className="text-sm/6">
                            <label htmlFor="isbulkCreation" className="font-medium text-gray-900">
                            Create multiple units
                            </label>
                        </div>
                    </div>
                </div>
                <fieldset disabled={isbulkCreation}>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="totalUnits" className="block text-sm/6 font-medium text-gray-900">
                            Total Units to create
                        </label>
                        <div className="mt-2">
                            <input
                                id="totalUnits"
                                name="totalUnits"
                                type="number"
                                required
                                autoComplete="Total number of buildings to create"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                disabled={isbulkCreation}
                            />
                        </div>
                    </div>
                </div>
                </fieldset>
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