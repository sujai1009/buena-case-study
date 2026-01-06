'use client'
import { ChevronDownIcon, PhotoIcon } from '@heroicons/react/16/solid'
import Form from 'next/form';
import { FormEvent, useState } from 'react';
import AddressForm from './AddressForm';
 
export default function PropertyCreationForm({title, router, managers, accountants, onSubmit, fileUploadCallbck}) {
    const [isbulkCreation, setIsbulkCreation] = useState(true)

	const onFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        const fileUploadData = new FormData();
        fileUploadData.append("file", uploadedFile);
        console.log("onFileChange", fileUploadData)

        fileUploadCallbck(fileUploadData);
	};
    
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())
        console.log(data)
        onSubmit(data);
    }

    return (
        <Form className='p-5' onSubmit={handleSubmit} action={''}>
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">{title}</h2>
                <p className="mt-1 text-sm/6 text-gray-600">Use this form to create new property</p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                            Property Name
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
                        <label htmlFor="type" className="block text-sm/6 font-medium text-gray-900">
                            Property Type
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                            <select
                            id="type"
                            name="type"
                            required
                            autoComplete="property-type"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            >
                            {/* <option>Select type</option> */}
                            <option value={0}>WEG</option>
                            <option value={1}>MV</option>
                            </select>
                            <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="manager" className="block text-sm/6 font-medium text-gray-900">
                            Manager
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                            <select
                            id="manager"
                            name="manager"
                            required
                            autoComplete="Select manager"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            >
                            {/* <option>Select manager</option> */}
                            {managers != null && managers.map((m) => (
                                <option key={m.id} value={m.id}>{m.name}</option>
                            ))}
                            </select>
                            <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="accountant" className="block text-sm/6 font-medium text-gray-900">
                            Accountant
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                            <select
                                id="accountant"
                                name="accountant"
                                required
                                autoComplete="Select accountant"
                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                {/* <option selected >Select accountant</option> */}
                                {accountants != null && accountants.map((m) => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                            <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-6">
                        <div className="mt-2 grid grid-cols-1">
                        <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                            Teilungserklärung
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                                <div className="mt-4 flex text-sm/6 text-gray-600">
                                <label
                                    htmlFor="file_input"
                                    className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500"
                                >
                                    <span>Upload a file</span>
                                    <input
                                    id="file_input"
                                    name="file_input"
                                    type="file" 
                                    onChange={onFileChange}
                                    accept="application/pdf"         
                                    className="sr-only" />
                                </label>
                                </div>
                            {/* <input 
                            id="file_input"
                            name="file_input"
                            type="file" 
                            onChange={onFileChange}
                            accept="application/pdf"
                            className="cursor-pointer bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full shadow-xs placeholder:text-body"/> */}
                            </div>
                        </div>
                    </div>
                    </div>


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
                            Create Bulk Buildings
                            </label>
                        </div>
                    </div>
                </div>
                <fieldset disabled={isbulkCreation}>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="totalBuildings" className="block text-sm/6 font-medium text-gray-900">
                            Total Buildings to create
                        </label>
                        <div className="mt-2">
                            <input
                                id="totalBuildings"
                                name="totalBuildings"
                                type="number"
                                required
                                autoComplete="Total number of buildings to create"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                disabled={isbulkCreation}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3"></div>

                    <AddressForm isbulkCreation={isbulkCreation}/>
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