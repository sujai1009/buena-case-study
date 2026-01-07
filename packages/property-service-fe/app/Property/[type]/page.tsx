"use client";

import { PropertyCard } from "@/components/ui/property/property-card";
import useSWR from "swr";
import { useParams, useRouter } from "next/navigation";
import { downloadFile, sendRequest } from "@/components/utils/sendRequest";
import Button from "@/components/common/Button";
import { toast } from "react-toastify";
import { allowedPropertyTypes } from "@/app/api/properties/route";
import { Property } from "@/components/types/app.types";
import { useStoreContext } from "@/components/provider/store.context.provider";
import { HttpMethods } from "@/components/types/http.methods";

export default function AllProperties() {
  const router = useRouter();
  const params = useParams();
  const { setSharedObject } : any = useStoreContext();

  const propertyType:any = params.type;// as unknown as number;
  if (!allowedPropertyTypes.includes(propertyType)) {
    return <center><div>Invalid property type only <b>{allowedPropertyTypes.join(",")}</b> allowed</div></center>;
  }
  const { data, error, isLoading, mutate } = useSWR<Property[]>('/api/properties?propertyType=' + propertyType, sendRequest)

  let title = `${propertyType} properties`;

  if (error) return <center><div>failed to load property.</div></center>;
  if (isLoading) return <center><div>Loading...</div></center>;

  let vlaignclass = "container mx-auto py-2 sm:px-3 lg:px-5 ";
  if (!data || data.length === 0) {
    title = "No properties available of type" + propertyType;
    vlaignclass += "flex items-center justify-center"
  }

  async function callDownload(prop: Property) {
      // console.log("Before calling download property file", prop.aggrementFile.path);
      // const response = downloadFile("/api/file?path=" + prop.aggrementFile.path);

    const response = await fetch(`/api/file?path=${encodeURIComponent(prop.aggrementFile.path)}`);
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${prop.aggrementFile.originalname}`;
    link.click();
    window.URL.revokeObjectURL(downloadUrl);
  }

  async function callEdit(prop: Property) {
      setSharedObject(prop);
      console.log("Before calling edit property,", prop);
      router.push('/EditEntityForm/property');
  }

  async function callDetail(prop: Property) {
      console.log("Detail called", prop)
      router.push('/Building/' + prop.id);
  }

  async function callDelete(prop: Property) {
      console.log("Delete called", prop)
      const result = window.confirm("Do you want to delete this Property and its buildings and units? Action not revertable. Kindly confirm.");
      
      if (result) {
        const remainingProperties = data && data.filter(card => card.id !== prop.id);
        mutate(remainingProperties, false);

        try {
          await fetch("/api/properties?id=" + prop.id, { method: 'DELETE' });
          mutate(); 
          toast.success("Property deleted sucessfully")
        } catch (err: any) {
          mutate(data);
          toast.error("Error in delete property:", err);
        }
      }
  }

  async function addNewFn() {
    router.push('/CreateEntityForm/property?propertyType=' + propertyType);
  }

  return (
    <>
      <div className={vlaignclass}>
        <div className="grid grid-cols-2 gap-10">
          <div className="text-3xl sm:text-2xl lg:text-4xl font-bold text-indigo-700 mb-8 sm:mb-10 lg:mb-12">{title}</div>
          <div className="flex justify-between relative">
              <div className="absolute right-0 h-full">
                <Button onClick={addNewFn}>Add</Button>
              </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 min-h-90">          
          {data != null && data.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              callDelete={() => callDelete(property)} 
              callDownload={() => callDownload(property)} 
              callEdit={() => callEdit(property)}
              callDetail={() => callDetail(property)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

