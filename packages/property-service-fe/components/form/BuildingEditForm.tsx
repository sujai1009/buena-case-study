'use client'
import { ChevronDownIcon, PhotoIcon } from '@heroicons/react/16/solid'
import Form from 'next/form';
import { FormEvent, useState } from 'react';
import AddressForm from './AddressForm';
import { Building } from '../types/app.types';
import { formDataToJson } from "formdata2json";

interface Props {
    title: string;
    router: any;
    buildings: any
    onSubmit: any
}

export default function BuildingEditForm({title, buildings, router, onSubmit} : Props) {
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const json = JSON.parse(formDataToJson(formData)).buildings; 
        onSubmit(json);
    }

    return (
        <Form className='p-5' onSubmit={handleSubmit} action={''}>
            
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-red-50 bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                    Building name
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    House Number
                </th>
            </tr>
        </thead>
        <tbody>
            {buildings != null && buildings.map((building: any, index: number) => (
            <tr key={"table_tr_key_" + building.id} className="bg-neutral-primary border-b border-default">
                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                    <input type="hidden" name={"buildings[" + index + "].id"} defaultValue={building.id} />

                    <input type="text" name={"buildings[" + index + "].name"} defaultValue={building.name} 
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                    />
                    
                </th>
                <td className="px-6 py-4">
                    <input type="text" name={"buildings[" + index + "].houseNumber"} defaultValue={building.houseNumber} 
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
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