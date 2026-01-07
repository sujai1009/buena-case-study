import Button from "@/components/common/Button";
import { Building } from "@/components/types/app.types";
import { FaEdit, FaInfo, FaTrash } from "react-icons/fa";

export const BuildingCard: React.FC<{ key:number, building: Building, callDetail: Function, callEdit: Function, callDelete: Function}> = ({ building, callDetail, callEdit, callDelete }) => (
  <div className="bg-red-50 rounded-md shadow-xl overflow-hidden max-h-75">
    <div className="p-2">
      <p className="text-gray-600">Name : {building.name}</p>
      <p className="text-gray-600">Number : {building.houseNumber}</p>

      <p className="text-gray-600">Street : {building.address.street}</p>
      <p className="text-gray-600">City : {building.address.city}</p>
      <p className="text-gray-600">Zipcode : {building.address.code}</p>
      <p className="text-gray-600">Land : {building.address.country}</p>
      <p className="text-gray-600">Property : {building.property.name}</p>
      
      <div className="mt-8 flex justify-between items-center text-gray-600">          
        <div className="flex items-center">
          <Button onClick={callEdit}><FaEdit/></Button>
        </div>

        <div className="flex items-center">
          <Button onClick={callDetail}><FaInfo/></Button>
        </div>

        <div className="flex items-center">
          <Button onClick={callDelete}><FaTrash/></Button>
        </div>
      </div>
    </div>
  </div>
);