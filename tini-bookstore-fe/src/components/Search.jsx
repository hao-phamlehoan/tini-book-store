import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import callApi from "../api/callApi";
import Records from "./Pagination/Record";
import Pagination from "./Pagination/Pagination";

const Search = ({search, handleSearch, loading}) => {
    const [dataBook, setDatabook] = useState([])
    const [currentPageB, setCurrentPageB] = useState(1);
    const [recordsPerPage] = useState(15);
    useEffect(() => {
        const fetchBook = async () => {
            try {
                var getdataBook = await callApi.search(search);
                setDatabook(getdataBook);
            } catch (error) {
                console.log("Failed to fetch: ", error);
            }
        }
        fetchBook();
        handleSearch(false);
    }, [loading])

    const indexOfLastRecordB = currentPageB * recordsPerPage;
    const indexOfFirstRecordB = indexOfLastRecordB - recordsPerPage;
    const currentRecordsB = dataBook.slice(indexOfFirstRecordB, indexOfLastRecordB);
    const nPagesB = Math.ceil(dataBook.length / recordsPerPage)

    return (
        <div className="flex flex-col min-h-screen">
            <section className="text-gray-600 body-font">
                <div className="max-w-screen-xl px-5 pt-12 mx-auto">
                    <div className="flex flex-wrap w-full mb-20">
                        <div className=" w-full mb-6 lg:mb-0">
                            <h1 className="p-2 rounded-2xl sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 bg-green-300 w-full">
                                Kết quả</h1>
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
            </section>
        </div>
    );
};

export default Search;