import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import callApi from '../api/callApi';
import './Book.css';

const Cart = ({ totalItem, onAddToCart }) => {
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || []);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [pay, setPay] = React.useState('')
    const [street, setStreet] = React.useState('');
    const [city, setCity] = React.useState('');
    const [district, setDistrict] = React.useState('');

    // - Waiting: Đang chờ được phê duyệt.
    // - Shipping: Đang vận chuyển.
    // - Done: Đơn hàng hoàn thành.
    // - Cancelled: Đơn hàng đã bị hủy bỏ.

    const decrement = (index) => {
        if (products[index].quantity > 1) {
            products[index].quantity -= 1;
            setProducts(products => [...products]);
            localStorage.setItem('products', JSON.stringify(products));
        } else {
            remove(index);
        }
    }

    const increment = (index) => {
        products[index].quantity += 1;
        setProducts(products => [...products]);
        localStorage.setItem('products', JSON.stringify(products));
    }

    const sum = products.reduce((accumulator, value) => {
        return accumulator + value.quantity * value.price;
    }, 0)

    const remove = (index) => {
        products.splice(index, 1);
        setProducts(products => [...products]);
        onAddToCart(totalItem - 1);
        localStorage.setItem('products', JSON.stringify(products));
    };

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
        return (
            [
                padTo2Digits(date.getDate()),
                padTo2Digits(date.getMonth() + 1),
                date.getFullYear(),
            ].join('/') +
            ' ' +
            [
                padTo2Digits(date.getHours()),
                padTo2Digits(date.getMinutes()),
            ].join(':')
        );
    }

    const checkout = async () => {
        const include = [];
        for (var i = 0; i < products.length; i++) {
            include.push({
                "p_id": products[i].id,
                "amount": products[i].quantity,
            })
        }
        const bill = {
            "b_time": formatDate(new Date()),
            "city": city,
            "district": district,
            "streetNum": street,
            "b_status": "Waiting",
            "phone": phone,
            "email": email,
            "customer_name": name,
            "payment_method": pay,
            "include": include,
        }
        await callApi.postBill(bill);
        alert("Gửi thành công");
        localStorage.clear();
    };

    return (
        <div className="Cart bg-gray-100 py-2">
            <div className="container mx-auto mt-10">
                <div className="flex shadow-md my-10">
                    <div className="w-3/4 bg-white px-10 py-10">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl">Giỏ hàng</h1>
                            <h2 className="font-semibold text-2xl"></h2>
                        </div>
                        <div className="flex mt-10 mb-5">
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Tên sản phẩm</h3>
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Số lượng</h3>
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Giá</h3>
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Tổng cộng</h3>
                        </div>
                        {products.map((item, index) => (
                            <div key={index} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                                <div className="flex w-2/5">
                                    <div className="w-20">
                                        <img className="h-24" src={item.image} alt="" />
                                    </div>
                                    <div className="flex flex-col justify-between ml-4 flex-grow">
                                        <span className="font-bold text-sm">{item.name}</span>
                                        <button onClick={() => remove(index)} className="text-left font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</button>
                                    </div>
                                </div>
                                <div className="flex justify-center w-1/5">

                                    <div className="flex flex-row h-10 w-1/2 rounded-lg relative bg-transparent mt-1">
                                        <button onClick={() => decrement(index)} className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                                            <span className="m-auto text-2xl font-thin">−</span>
                                        </button>
                                        <input
                                            type="number"
                                            className=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                                            name="custom-input-number"
                                            value={item.quantity}
                                            onChange={() => { }}>

                                        </input>
                                        <button onClick={() => increment(index)} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                                            <span className="m-auto text-2xl font-thin">+</span>
                                        </button>
                                    </div>
                                </div>
                                <span className="text-center w-1/5 font-semibold text-sm">{item.price}</span>
                                <span className="text-center w-1/5 font-semibold text-sm">{item.price * item.quantity}đ</span>
                            </div>

                        ))}


                        <Link to="/" className="flex font-semibold text-indigo-600 text-sm mt-10">

                            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                            Continue Shopping
                        </Link>
                    </div>

                    <div id="summary" className="w-1/4 px-8 py-10">
                        <h1 className="font-semibold text-2xl border-b pb-8">Thông tin thanh toán</h1>

                        <div className="py-1">
                            <label className="font-semibold inline-block mb-3 text-sm uppercase">Họ và tên <span className="text-red-600">*</span></label>
                            <input type="text" className="p-2 text-sm w-full" onChange={event => setName(event.target.value)} />
                        </div>
                        <div className="py-1">
                            <label className="font-semibold inline-block mb-3 text-sm uppercase">Email <span className="text-red-600">*</span></label>
                            <input type="email" className="p-2 text-sm w-full" onChange={event => setEmail(event.target.value)} />
                        </div>
                        <div className="py-1">
                            <label className="font-semibold inline-block mb-3 text-sm uppercase">Số điện thoại <span className="text-red-600">*</span></label>
                            <input type="text" className="p-2 text-sm w-full" onChange={event => setPhone(event.target.value)} />
                        </div>
                        <div className="py-1">
                            <label className="font-semibold inline-block mb-3 text-sm uppercase">Phương thức thanh toán <span className="text-red-600">*</span></label>
                            <input type="text" className="p-2 text-sm w-full" onChange={event => setPay(event.target.value)} />
                        </div>
                        <div className="py-1">
                            <label className="font-semibold inline-block mb-3 text-sm uppercase">Số nhà <span className="text-red-600">*</span></label>
                            <input type="text" className="p-2 text-sm w-full" onChange={event => setStreet(event.target.value)} />
                        </div>
                        <div className="py-1">
                            <label className="font-semibold inline-block mb-3 text-sm uppercase">Quận/Huyện <span className="text-red-600">*</span></label>
                            <input type="text" className="p-2 text-sm w-full" onChange={event => setDistrict(event.target.value)} />
                        </div>
                        <div className="py-1">
                            <label className="font-semibold inline-block mb-3 text-sm uppercase">Tỉnh/Thành phố <span className="text-red-600">*</span></label>
                            <input type="text" className="p-2 text-sm w-full" onChange={event => setCity(event.target.value)} />
                        </div>
                        <div className="border-t mt-8">
                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Tổng giá</span>
                                <span>{sum}</span>
                            </div>
                            <a href="/">
                                <button href='/' onClick={() => { checkout() }} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Đặt hàng</button>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;
