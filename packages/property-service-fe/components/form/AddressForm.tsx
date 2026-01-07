interface Props {
    isbulkCreation: boolean;
}

export default function AddressForm({isbulkCreation} : Props) {
    return (
        <>
            <div className="sm:col-span-3">
                <label htmlFor="street" className="block text-sm/6 font-medium text-gray-900">
                    Street
                </label>
                <div className="mt-2">
                    <input
                        id="street"
                        name="street"
                        type="text"
                        required
                        autoComplete="Street name"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        disabled={isbulkCreation}
                    />
                </div>
            </div>

            <div className="sm:col-span-3">
                <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                    City
                </label>
                <div className="mt-2">
                    <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        autoComplete="City name"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        disabled={isbulkCreation}
                    />
                </div>
            </div>

            <div className="sm:col-span-3">
                <label htmlFor="zipcode" className="block text-sm/6 font-medium text-gray-900">
                    zipcode
                </label>
                <div className="mt-2">
                    <input
                        id="zipcode"
                        name="zipcode"
                        type="number"
                        required
                        autoComplete="Zip code"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        disabled={isbulkCreation}
                    />
                </div>
            </div>

            <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                    Country
                </label>
                <div className="mt-2">
                    <input
                        id="country"
                        name="country"
                        type="text"
                        required
                        autoComplete="Country"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        disabled={isbulkCreation}
                    />
                </div>
            </div>
        </>
    );
}