import React from 'react'

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)



    const nextPage = () => {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <nav aria-label="Page navigation example">
            <ul className="flex list-style-none">
                <li className="page-item disabled"><button
                    onClick={prevPage}
                    className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                    >Previous</button>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber}
                        className={`page-item ${currentPage == pgNumber ? 'active' : ''} `} >

                        <button onClick={() => setCurrentPage(pgNumber)}
                            className={`${currentPage == pgNumber ? 
                                'page-link relative block py-1.5 px-3 border-0 bg-blue-600 outline-none transition-all duration-300 rounded-full text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md' : 
                                'page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'} `}
                            >

                            {pgNumber}
                        </button>
                    </li>
                ))}
                <li className="page-item"><button
                    onClick={nextPage}
                    className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                    >Next</button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination