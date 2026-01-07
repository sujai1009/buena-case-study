"use client";

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import PropertyCreationForm from '@/components/form/PropertyCreationForm';
import { sendRequest } from '@/components/utils/sendRequest';
import BuildingCreationForm from '@/components/form/BuildingCreationForm';
import { toast } from 'react-toastify';
import { detailedDiff } from 'deep-object-diff';
import UnitCreationForm from '@/components/form/UnitCreationForm';
import PropertyEditForm from '@/components/form/PropertyEditForm';
import BuildingEditForm from '@/components/form/BuildingEditForm';
import UnitEditForm from '@/components/form/UnitEditForm';
import { Building, Property, Unit } from '@/components/types/app.types';
import { HttpMethods } from '@/components/types/http.methods';
import { useState } from 'react';
import { useStoreContext } from '@/components/provider/store.context.provider';


export default function EditEntityForm() {
    const router = useRouter();
    const params = useParams();
    const { sharedObject } : any = useStoreContext();

    const searchParams = useSearchParams()
    const propertyType = searchParams.get('propertyType')
    let propertyId:any = searchParams.get('propertyId')
    let buildingId = searchParams.get('buildingId')
    console.log("propertyId, buildingId, propertyType", propertyId, buildingId, propertyType);
    const type = params.type;

    let dataForTable = null;
    let updationURI:string;
    let title: string = `Edit ${type}`;

    let managers;
    let accountants;
    
    if (type === "building") {
        if (propertyId) {
            const { data, error, isLoading } = useSWR<Building[]>('/api/buildings?propertyId=' + propertyId, sendRequest)
            if (error) return <div>failed to load buildings</div>;
            if (isLoading) return <div>Loading...</div>;
            dataForTable = data;
        } else {
            if ( sharedObject as Building ) {
                propertyId = sharedObject?.property.id;
                dataForTable = [sharedObject];
            }
        }
        updationURI = '/api/buildings';
    } else if (type === "property") {
        // title += 'Property';
        console.log("Before calling users")
        const userResponse = useSWR('/api/users', sendRequest).data;
        console.log("UserResponse", userResponse, type);

        managers = userResponse && userResponse.filter((user: any) => user.type === 'Manager');
        accountants = userResponse && userResponse.filter((user: any) => user.type === 'Accountant');
        console.log("sharedObject,", sharedObject);
        if ( sharedObject ) {
            propertyId = sharedObject.id;
            dataForTable = [sharedObject];
        }

        updationURI = '/api/properties';
    } else if (type === "unit") {
        // title += 'Units';
        if (buildingId) {
            const { data, error, isLoading } = useSWR<Unit[]>('/api/units?buildingId=' + buildingId, sendRequest)
            if (error) return <div>failed to load units</div>;
            if (isLoading) return <div>Loading...</div>;
            dataForTable = data;
        } else {
            if ( sharedObject ) {
                buildingId = sharedObject.building.id;
                dataForTable = [sharedObject];
            }
        }
        updationURI = '/api/units';
    } else {
        // Unknown type not supported
        throw Error("Unknown type not supported");
    }
    
    async function handleSubmit(formdata: any) {
        const response = await sendRequest(updationURI, HttpMethods.PUT, JSON.stringify(formdata));
        console.log("Submit form response::", response);
        if ( response.statusCode != null) {
            toast.error(response.error);
        } else {
            if (type === "property") {
                const updatedPropertyType = response[0].type.toLowerCase();
                router.push(`/Property/${updatedPropertyType}`);
                toast.success("Property updated sucessfully");
            } else if (type === "building") {
                router.push('/Building/' + propertyId);
                toast.success("Building updated sucessfully");
            } else if (type === "unit") {
                router.push('/Unit/' + buildingId);
                toast.success("Unit updated sucessfully");
            } else {
                // Unknown type
            }
        }
    }

    return (
    <>
        { type === 'property' && <PropertyEditForm title={title} router={router} properties= {dataForTable} managers={managers} accountants={accountants} onSubmit={handleSubmit} />}
        { type === 'building' && <BuildingEditForm title={title} router={router} buildings = {dataForTable} onSubmit={handleSubmit} />}
        { type === 'unit' && <UnitEditForm title={title} router={router} units={dataForTable} onSubmit={handleSubmit} />}
    </>
  );
}