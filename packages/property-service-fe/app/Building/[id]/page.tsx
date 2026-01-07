"use client";

import useSWR from "swr";
import { BuildingCard } from "@/components/ui/building/building-card";
import { useParams, useRouter } from "next/navigation";
import { sendRequest } from "@/components/utils/sendRequest";
import Button from "@/components/common/Button";
import { toast } from "react-toastify";
import { Building } from "@/components/types/app.types";
import { useStoreContext } from "@/components/provider/store.context.provider";

export default function AllBuildings() {
  const router = useRouter();
  const params = useParams();
  const { setSharedObject } : any = useStoreContext();

  console.log("In Buildings page:::", params);
  const propertyId = params.id;// as unknown as number;

  const { data, error, mutate, isLoading } = useSWR<Building[]>('/api/buildings?propertyId=' + propertyId, sendRequest)
  let title = "All Buildings of property";
  let vlaignclass = "container mx-auto py-2 sm:px-3 lg:px-5 ";

  if (error) return <div>failed to load buildings</div>;
  if (isLoading) return <div>Loading...</div>;
  
  if (!data || data.length === 0) {
    title = "No Buildings available";
    vlaignclass += "flex items-center justify-center";
  }

  async function callEdit(prop: Building) {
      setSharedObject(prop);
      router.push('/EditEntityForm/building');
  }
  
  async function callDetail(prop: Building) {
      router.push('/Unit/' + prop.id);
  }

  async function callDelete(prop: Building) {
      const result = window.confirm("Do you want to delete this building and its units? Action not revertable. Kindly confirm.");
      
      if (result) {
        const remainingBuildings = data && data.filter(card => card.id !== prop.id);
        mutate(remainingBuildings, false);

        try {
          await fetch("/api/buildings?id=" + prop.id, { method: 'DELETE' });
          mutate(); 
          toast.success("Building deleted sucessfully")
        } catch (err: any) {
          mutate(data);
          toast.error("Failed to delete Building:", err);
        }
      }
  }

  async function addNewFn() {
    router.push('/CreateEntityForm/building?propertyId=' + propertyId);
  }

  async function editAllFn() {
    router.push('/EditEntityForm/building?propertyId=' + propertyId);
  }

  return (
    <>
      <div className={vlaignclass}>
        <div className="grid grid-cols-3 gap-10">
          <div className="flex justify-between relative">
              <div className="absolute left-0 h-full">
                <Button onClick={() => router.back()}>Back</Button>
              </div>
          </div>
          <div className="text-3xl sm:text-2xl lg:text-4xl font-bold text-indigo-700 mb-8 sm:mb-10 lg:mb-12">{title}</div>
          <div className="flex justify-between relative">
              <div className="absolute right-0 h-full">
                <Button onClick={addNewFn}>Add</Button>
              </div>
              <div className="absolute left-55 h-full">
                <Button onClick={editAllFn}>Edit All</Button>
              </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {data != null && data.map((building) => (
            <BuildingCard 
              key={building.id} 
              building={building}  
              callDelete={() => callDelete(building)} 
              callDetail={() => callDetail(building)} 
              callEdit={() => callEdit(building)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
