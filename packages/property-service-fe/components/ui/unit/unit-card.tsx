import Button from "@/components/common/Button";
import { Unit } from "@/components/types/app.types";
import { FaEdit, FaTrash } from "react-icons/fa";

export const UnitCard: React.FC<{ key:number, unit: Unit, callDetail: Function, callEdit: Function, callDelete: Function}> = ({ unit, callDetail, callEdit, callDelete }) => (
  <div className="bg-cyan-50 rounded-md shadow-xl overflow-hidden max-h-70">
    <div className="p-4">
      <p className="text-gray-600">Unit number : {unit.uNo}</p>
      <p className="text-gray-600">Floor : {unit.floor}</p>
      <p className="text-gray-600">Type : {unit.type}</p>
      <p className="text-gray-600">Size : {unit.size}</p>
      <p className="text-gray-600">Entrance : {unit.entrance}</p>
      <p className="text-gray-600">Rooms : {unit.rooms}</p>
      <p className="text-gray-600">Built Year : {unit.buildtYear}</p>
      <p className="text-gray-600">Status : {unit.status}</p>
      
      <div className="mt-8 flex justify-between items-center text-gray-600">          
        <div className="flex items-center">
          <Button onClick={callEdit}><FaEdit/></Button>
        </div>

        {/* <div className="flex items-center">
          <Button onClick={callDetail}><FaInfo/></Button>
        </div> */}

        <div className="flex items-center">
          <Button onClick={callDelete}><FaTrash/></Button>
        </div>
      </div>
    </div>
  </div>
);