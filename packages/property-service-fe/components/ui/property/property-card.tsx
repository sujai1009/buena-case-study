import Button from "@/components/common/Button";
import { Property } from "@/components/types/app.types";
import Link from "next/link";
import { FaEdit, FaInfo, FaTrash } from "react-icons/fa";

export const PropertyCard: React.FC<{ key:number, property: Property, callDownload: Function, callEdit: Function, callDelete: Function, callDetail: Function}> = ({ property, callDownload, callEdit, callDelete, callDetail }) => (
  <div className="bg-blue-100 rounded-md shadow-xl overflow-hidden max-h-65">
    <img
      src={`/images/${property.type.toLowerCase()}.png`}
      alt={property.name}
      className="w-full h-28 md:h-40 lg:h-28 object-cover"
    />
    <div className="p-4">
      <h4 className="text-sm font-semibold text-indigo-900">{property.name}</h4>
      {/* <p className="text-indigo-900">Type : {property.type}</p> */}
      <p className="text-indigo-900">Teilungserklärung : {property.aggrementFile ? <Button onClick={callDownload}>Download</Button> : "Not available"}</p>
      {/* <a href={`/api/file?path=${encodeURIComponent(property.aggrementFile?.path)}`}>
        Download PDF
      </a> */}
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