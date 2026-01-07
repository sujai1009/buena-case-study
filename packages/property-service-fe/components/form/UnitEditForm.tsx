'use client'
import { ChevronDownIcon, PhotoIcon } from '@heroicons/react/16/solid'
import Form from 'next/form';
import { FormEvent, useState } from 'react';
import AddressForm from './AddressForm';
import { formDataToJson } from "formdata2json";

 interface Props {
  title: string;
  router: any;
  onSubmit: any;
  units: any;
 }

export default function UnitEditForm({title, router, units, onSubmit} : Props) {
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const json = JSON.parse(formDataToJson(formData)).units;
        onSubmit(json);
    }

    return (
        <Form className='p-5' onSubmit={handleSubmit} action={''}>
            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-red-50 bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                    Unit no
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Unit Type
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Floor
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Entrance
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Size
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Co Ownership share
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Built Year
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Rooms
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Status
                </th>
            </tr>
        </thead>
        <tbody>
            {units != null && units.map((unit : any, index: number) => (
            <tr key={"table_tr_key_" + unit.id} className="bg-neutral-primary border-b border-default">
                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                    <input type="hidden" name={"units[" + index + "].id"} defaultValue={unit.id} />

                    <input type="text" name={"units[" + index + "].uNo"} defaultValue={unit.uNo} 
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                    />
                    
                </th>
                <td className="px-6 py-4">
                    <select
                        id={"units[" + index + "].type"}
                        name={"units[" + index + "].type"} defaultValue={unit.type}
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                        <option value={0}>Apartment</option>
                        <option value={1}>Office</option>
                        <option value={2}>Garden</option>
                        <option value={3}>Parking</option>
                        <option value={4}>TEMP_TYPE</option>
                    </select>
                </td>

                <td className="px-6 py-4">
                    <input type="text" name={"units[" + index + "].floor"} defaultValue={unit.floor} 
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </td>

                <td className="px-6 py-4">
                    <select
                    id={"units[" + index + "].entrance"}
                    name={"units[" + index + "].entrance"} defaultValue={unit.entrance} 
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
                </td>

                <td className="px-6 py-4">
                    <input type="text" name={"units[" + index + "].size"} defaultValue={unit.size} 
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </td>

                <td className="px-6 py-4">
                    <input type="text" name={"units[" + index + "].coOwnershipShare"} defaultValue={unit.coOwnershipShare} 
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </td>

                <td className="px-6 py-4">
                    <input type="text" name={"units[" + index + "].builtYear"} defaultValue={unit.builtYear} 
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </td>

                <td className="px-6 py-4">
                    <input type="text" name={"units[" + index + "].rooms"} defaultValue={unit.rooms} 
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </td>

                <td className="px-6 py-4">
                    <select
                    id={"units[" + index + "].status"}
                    name={"units[" + index + "].status"} defaultValue={unit.status} 
                    required
                    autoComplete="unit-type"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                        <option value={0}>CREATED</option>
                        <option value={1}>ADDED</option>
                        <option value={2}>VACANT</option>
                        <option value={3}>OCCUPIED</option>
                        <option value={3}>CONTRACT_SIGNED</option>
                    </select>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
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