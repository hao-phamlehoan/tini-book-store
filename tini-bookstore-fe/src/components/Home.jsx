import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import callApi from "../api/callApi";
import Records from "./Pagination/Record";
import Pagination from "./Pagination/Pagination";

const Home = () => {
    const [loading, setLoading] = useState(true);
    
    const [dataBook, setDatabook] = useState([])
    const [dataStationery, setDataStationery] = useState([])


    const [currentPageB, setCurrentPageB] = useState(1);
    const [currentPageS, setCurrentPageS] = useState(1);
    

    const [recordsPerPage] = useState(5);



    useEffect(() => {
        const fetchBook = async () => {
            try {
                var getdataBook = await callApi.getBook();
                var getdataStationery = await callApi.getStationery();
                setDatabook(getdataBook);
                setDataStationery(getdataStationery);
                setLoading(false);
            } catch (error) {
                console.log("Failed to fetch: ", error);
            }
        }

    fetchBook();
    }, [loading])

    const indexOfLastRecordB = currentPageB * recordsPerPage;
    const indexOfFirstRecordB = indexOfLastRecordB - recordsPerPage;
    const currentRecordsB = dataBook.slice(indexOfFirstRecordB, indexOfLastRecordB);
    const nPagesB = Math.ceil(dataBook.length / recordsPerPage)
    
    const indexOfLastRecordS = currentPageS * recordsPerPage;
    const indexOfFirstRecordS = indexOfLastRecordS - recordsPerPage;
    const currentRecordsS = dataStationery.slice(indexOfFirstRecordS, indexOfLastRecordS);
    const nPagesS = Math.ceil(dataStationery.length / recordsPerPage)

    return (
        <div className="flex flex-col min-h-screen">
            <section className="text-gray-600 body-font">
                <div className="max-w-screen-xl px-5 pt-12 mx-auto">
                    <div className="flex flex-wrap w-full mb-20">
                        <div className=" w-full mb-6 lg:mb-0">
                            <h1 className="p-2 rounded-2xl sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 bg-green-300 w-full">
                                Sách trong nước</h1>
                            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                        </div>
                    </div>
                    
                    <Records data={currentRecordsB} />
                    
                    <div className="flex justify-center my-6">
                        <Pagination
                            nPages={nPagesB}
                            currentPage={currentPageB}
                            setCurrentPage={setCurrentPageB}
                        />
                    </div>
                </div>
                <div className="max-w-screen-xl px-5 pt-12 mx-auto">
                    <div className="flex flex-wrap w-full mb-20">
                        <div className=" w-full mb-6 lg:mb-0">
                            <h1 className="p-2 rounded-2xl sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 bg-green-300 w-full">
                                Văn phòng phẩm</h1>
                            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                        </div>
                    </div>
                
                    <Records data={currentRecordsS} />
                    
                    <div className="flex justify-center my-6">
                        <Pagination
                            nPages={nPagesS}
                            currentPage={currentPageS}
                            setCurrentPage={setCurrentPageS}
                        />
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;