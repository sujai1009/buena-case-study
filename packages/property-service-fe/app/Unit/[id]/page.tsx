"use client";

import useSWR from "swr";
import { useParams, useRouter } from "next/navigation";
import { UnitCard } from "@/components/ui/unit/unit-card";
import { sendRequest } from "@/components/utils/sendRequest";
import Button from "@/components/common/Button";
import { toast } from "react-toastify";
import { Unit } from "@/components/types/app.types";
import { useStoreContext } from "@/components/provider/store.context.provider";

export default function AllUnits() {
  const router = useRouter();
  const params = useParams();
  const { setSharedObject } : any = useStoreContext();

  console.log("In Units page:::", params);
  const buildingId = params.id;// as unknown as number;

  const { data, error, isLoading, mutate } = useSWR<Unit[]>('/api/units?buildingId=' + buildingId, sendRequest)
  
  if (error) return <div>failed to load units</div>;
  if (isLoading) return <div>Loading...</div>;

  let title = "All Units of building"
  let vlaignclass = "container mx-auto py-2 sm:px-3 lg:px-5 ";
  if (!data || data.length === 0) {
      title = "No Units available";
      vlaignclass += "flex items-center justify-center";
  }

  async function callEdit(prop: Unit) {
        setSharedObject(prop);
        router.push('/EditEntityForm/unit');
  }

  async function callDetail(prop: Unit) {
      router.push('/Unit/details/' + prop.id);
  }

  async function callDelete(prop: Unit) {
      const result = window.confirm("Do you want to delete this unit? Action not revertable. Kindly confirm.");
      
      if (result) {
        const remainingUnits = data && data.filter(card => card.id !== prop.id);
        mutate(remainingUnits, false);

        try {
          await fetch("/api/units?id=" + prop.id, { method: 'DELETE' });
          mutate(); 
          toast.success("Unit deleted sucessfully")
        } catch (err: any) {
          mutate(data);
          toast.error("Failed to delete Unit:", err);
        }
      }
  }

  async function addNewFn() {
    router.push('/CreateEntityForm/unit?buildingId=' + buildingId);
  }

  async function editAllFn() {
    router.push('/EditEntityForm/unit?buildingId=' + buildingId);
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

                <div className="absolute left-35 h-full">
                  <Button onClick={editAllFn}>Edit All</Button>
                </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {data != null && data.map((unit) => (
              <UnitCard 
                key={unit.id} 
                unit={unit} 
                callDelete={() => callDelete(unit)} 
                callDetail={() => callDetail(unit)} 
                callEdit={() => callEdit(unit)}
              />
            ))}
          </div>
        </div>
      </>
    );
  }