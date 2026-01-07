"use client";

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import PropertyCreationForm from '@/components/form/PropertyCreationForm';
import { sendFileRequest, sendRequest } from '@/components/utils/sendRequest';
import BuildingCreationForm from '@/components/form/BuildingCreationForm';
import { toast } from 'react-toastify';
import UnitCreationForm from '@/components/form/UnitCreationForm';
import PropertyEditForm from '@/components/form/PropertyEditForm';
import BuildingEditForm from '@/components/form/BuildingEditForm';
import UnitEditForm from '@/components/form/UnitEditForm';
import { HttpMethods } from '@/components/types/http.methods';


export default function CreateEntityForm() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams()
    const propertyType = searchParams.get('propertyType')
    const propertyId = searchParams.get('propertyId')
    const buildingId = searchParams.get('buildingId')
    console.log("propertyId, buildingId, propertyType", propertyId, buildingId, propertyType);
    console.log(params);
    const type = params.type;

    let title: string = `Create new ${type}`;

    let managers = [];
    let accountants = [];
    let creationURI: string;
    let fileResponse:any;

    if (type === 'property') {
        //title += 'Property';
        creationURI = '/api/properties';
        const { data, error, isLoading } = useSWR('/api/users', sendRequest)
        if (error) return <div>failed to load users</div>;
        if (isLoading) return <div>Loading...</div>;

        if (!data || data.length === 0) {
            title = "No users availalbe available";
        } else {
            managers = data.filter((user: any) => user.type === 'Manager');
            accountants = data.filter((user: any) => user.type === 'Accountant');
        }
    } else if (type === 'building') {
        //title += 'Bulding';
        creationURI = '/api/buildings';
    }  else if (type === 'unit') {
        //title += 'Unit';
        creationURI = '/api/units';
    } else {
        // Unknown request do nothing
        return <div>Request type not supported</div>;
    } 
    
    async function handleSubmit(formdata: any) {
        if (type === "property" && fileResponse != null) {
            formdata["fileId"] = fileResponse.id;
        }

        const response = await sendRequest(creationURI, HttpMethods.POST, JSON.stringify(formdata));
        console.log("Submit form response::", response);
        if ( response.statusCode != null) {
            toast.error(response.error);
        } else {
            if (type === "property") {
                router.push('/Property/' + propertyType);
                toast.success("Property sucessfully created");
            } else if (type === "building") {
                router.push('/Building/' + propertyId);
                toast.success("Building sucessfully created");
            } else if (type === "unit") {
                router.push('/Unit/' + buildingId);
                toast.success("Unit sucessfully created");
            } else {
                // Unknown type
            }
            
        }
    }

    async function handleFileUpload(fileUploadFormData: any) {
        console.log("In handleFileUpload", fileUploadFormData);
        fileResponse = await sendFileRequest("/api/file", fileUploadFormData);
    }

    return (
    <>
        { type === 'property' && <PropertyCreationForm title={title} router={router} managers={managers} accountants={accountants} onSubmit={handleSubmit} fileUploadCallbck={handleFileUpload}/>}
        { type === 'building' && <BuildingCreationForm title={title} router={router} propertyId={propertyId} onSubmit={handleSubmit} />}
        { type === 'unit' && <UnitCreationForm title={title} router={router} buildingId={buildingId} onSubmit={handleSubmit} />}
    </>
  );
}