import React from 'react'
import { Link } from 'react-router-dom';

const Records = ({ data }) => {

    return (
        <div className="flex flex-wrap m-4">
            {data.map((item, index) => (
                <div key={index} className="xl:w-1/5 md:w-1/2 p-4" onClick={() => {window.scrollTo(0, 0)}}>
                    <Link to={`${item.product_type_code[0] === '1' ? '/book/'+item.uuid : '/stationery/'+item.uuid}`}>
                        <div className="bg-gray-100 p-6 rounded-lg h-96 flex flex-col justify-between">
                            <img className="h-40 rounded object-cover object-center mb-6" src={item.cover} alt="content" />
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-4 h-32">{item.p_name}</h2>
                            <div className='flex'>
                                <p className="leading-relaxed text-base text-gray-500 mx-2 items-end line-through">{item.price}đ</p>
                                <p className="leading-relaxed text-xl text-red-500 mx-2 items-end">{item.price*(1-item.discount)}đ</p>

                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Records  