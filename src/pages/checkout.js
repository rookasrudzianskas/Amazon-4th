import React, {useEffect} from 'react';
import Header from "../components/Header";
import Image from "next/image";
import {selectItems} from "../slices/basketSlice";
import {useSelector} from "react-redux";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";

const Checkout = () => {
    const items = useSelector(selectItems);
    const [user, loading] = useAuthState(auth);
    const itemsNumber = `${items.length ? items.length : "empty"}`;
    const email = `${user?.email ? user.email : "guest is here 🙂"}`;
    let something = `${itemsNumber >= 2 ? "items)." : "item)."}`;

    console.log(something)
    return (
        <div className="bg-gray-100">
            <Header />

            <main className="lg:flex max-w-screen-2xl mx-auto">
            {/*    left */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image
                        src="https://links.papareact.com/ikj"
                        width={1200}
                        height={250}
                        objectFit="contain"
                    />

                    <div className="flex flex-col p-5 space-y-10 bg-white shadow-md">
                        <h1 className="text-3xl border-b pb-4">{items.length === 0 ? `${email} your Amazon basket is empty 🛍️` : `${email} your Amazon shopping basket has ( ${itemsNumber} ${something}`}</h1>

                        {items.map((item, i) => (
                            <CheckoutProduct
                                key={i}
                                title={item.title}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                rating={item.rating}
                                hasPrime={item.hasPrime}
                            />
                        ))}
                    </div>

                </div>

            {/*    right*/}
                <div className="flex flex-col bg-white p-10 shadow-xl">
                    {items.length > 0 && (
                        <>
                            <h2 className="whitespace-nowrap pt-5">Subtotal ({items.length} items):
                                <span className="font-bold">
                                    {/*<Currency quantity={total} cur="USD" />*/}
                                </span>
                            </h2>
                            <button className={`button mt-2 p-100 ${!user && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed focus:ring-0'} `}>
                                {!user ? "Sign in to check out 🌶️" : "Proceed to check out 🛒"}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Checkout;
      