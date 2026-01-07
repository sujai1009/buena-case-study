'use client'

import Form from 'next/form';
import { FormEvent, useState } from 'react';
import { formDataToJson } from "formdata2json";

interface Props {
 title: string;
 router: any;
 onSubmit: any;
 managers: any;
 accountants: any;
 properties: any;
}

export default function PropertyEditForm({title, properties, router, managers, accountants, onSubmit} : Props) {
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const json = JSON.parse(formDataToJson(formData)).properties; 
        onSubmit(json);
    }

    return (
        <Form className='p-5' onSubmit={handleSubmit} action={''}>
            
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-red-50 bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                    Property name
                </th>
                {/* <th scope="col" className="px-6 py-3 font-medium">
                    Property type
                </th> */}
                <th scope="col" className="px-6 py-3 font-medium">
                    Manager
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Accountant
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Teilungserklärung
                </th>
            </tr>
        </thead>
        <tbody>
            {properties != null && properties.map((property: any, index: number) => (
            <tr key={"table_tr_key_" + property.id} className="bg-neutral-primary border-b border-default">
                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                    <input type="hidden" name={"properties[" + index + "].id"} defaultValue={property.id} />

                    <input type="text" name={"properties[" + index + "].name"} defaultValue={property.name} 
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                    />
                    
                </th>
                {/* <td className="px-6 py-4">
                    <select
                        id={"properties[" + index + "].type"}
                        name={"properties[" + index + "].type"} defaultValue={property.type}
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                        <option value={0}>WEG</option>
                        <option value={1}>MV</option>
                    </select>
                </td> */}
                <td className="px-6 py-4">
                    <select
                        id={"properties[" + index + "].manager"}
                        name={"properties[" + index + "].manager"} defaultValue={property.manager}
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                        {managers && managers.map((m: any) => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                    </select>
                </td>
                <td className="px-6 py-4">
                    <select
                        id={"properties[" + index + "].accountant"}
                        name={"properties[" + index + "].accountant"} defaultValue={property.accountant}
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                        {accountants && accountants.map((accountant: any) => (
                            <option key={accountant.id} value={accountant.id}>{accountant.name}</option>
                        ))}
                    </select>
                </td>

                <td className="px-6 py-4">
                    <label> {property.aggrementFile?.originalname} </label>
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