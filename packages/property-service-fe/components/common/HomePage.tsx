import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
    return (
        <>
        <div className="min-h-screen bg-gray-100 py-1">
            <main className="max-w-7xl mx-auto py-1 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center mb-16  gap-10">
                    <div className="w-full md:w-1/2 mt-6 md:mt-0">
                        <center><h2 className="text-3xl font-semibold text-gray-800 mb-4">
                            WEG
                        </h2></center>
                        <p className="text-lg text-gray-600 leading-relaxed mb-10">
                            Communities of owners who share responsibility for common areas.
                            Legally complex, with voting and joint decisions.{" "}
                        </p>
                        <center><Link
                            href={`/Property/weg`}
                            className="mt-6 bg-indigo-900 hover:bg-blue text-white font-bold py-4 px-4 rounded-md transition duration-300"
                        >
                            WEG Properties
                        </Link></center>
                    </div>

                    <div className="w-full md:w-1/2 mt-6 md:mt-0">
                        <center><h2 className="text-3xl font-semibold text-gray-800 mb-4">
                            MV
                        </h2></center>
                        <p className="text-lg text-gray-600 leading-relaxed mb-10">
                            Rental properties managed for landlords.
                            Focused on tenant contracts, rent collection, and maintenance.{" "}
                        </p>
                        <center><Link
                            href={`/Property/mv`}
                            className="mt-6 bg-indigo-900 hover:bg-blue text-white font-bold py-4 px-4 rounded-md transition duration-300"
                        >
                            MV Properties
                        </Link></center>
                    </div>
                </div>

                <div className="flex flex-col  items-center mb-16 md:flex-row-reverse gap-10">
                    <div className="w-full md:w-1/2 md:pr-8">
                        <Image
                            src="/images/weg.png"
                            alt="Apartment"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                        />
                    </div>

                    <div className="w-full md:w-1/2 md:pl-8">
                        <Image
                            src="/images/mv.png"
                            alt="Villa"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    
                </div>
            </main>
        </div>

        </>
    );
}