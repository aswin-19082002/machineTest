import React, { useEffect, useRef, useState } from 'react'
import "../Components/Css/IntroPage.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import axios from 'axios';

import img2 from "../assets/logo.png"
import img1 from "../assets/logo.png"
import { FaPhoneAlt } from "react-icons/fa";

const IntroPage = () => {

    const [title, setTitle] = useState("");
    const [addItems, setAddItems] = useState(false);
    const [view, setView] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categoryError, setCategoryError] = useState("");

    const popupRef = useRef(null);

    const [items, setItems] = useState({
        itemName: "",
        description: "",
        price: "",
        category: selectedCategory,
    })

    const change = (e) => {
        setItems({ ...items, [e.target.name]: e.target.value })
    }

    const submit = (e) => {
        e.preventDefault();

        const newItem = {
            itemName: items.itemName,
            description: items.description,
            price: items.price,
            category: selectedCategory 
        };

        axios.post("http://localhost:5100/addedItems", newItem)
            .then((res) => {
                console.log("Added:", res.data);
                alert("Item added successfully");

                setItems({ itemName: "", description: "", price: "", category: selectedCategory });
                setAddItems(false);

                setView(prevItems => [...prevItems, newItem]);
            })
            .catch((err) => {
                console.error("Error adding item:", err);
            });
    };

    const viewAll = () => {
        axios.get("http://localhost:5100/viewItems")
            .then((response) => {
                // console.log("Fetched Items:", response.data);

                const filteredItems = response.data.data?.filter(item => item.category === selectedCategory) || [];
                setView(filteredItems);
            })
            .catch((error) => {
                console.error("Error fetching items:", error);
            });
    };

    useEffect(() => {
        if (selectedCategory) {
            setCategoryError(""); 
            setItems(prevItems => ({ ...prevItems, category: selectedCategory }));
            viewAll();
        }
    }, [selectedCategory]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setAddItems(false);
            }
        };

        if (addItems) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [addItems]);

    const handleAddItemsClick = () => {
        if (!selectedCategory) {
            setCategoryError("Please select a category (Food or Drinks) before adding items.");
        } else {
            setAddItems(true);
        }
    };

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark " id='landing-navbar'>
                <div class="container-fluid">
                    <div className='logo-and-name-div'>
                        <div>
                            <img className='logo-img image-fluid' src={img1} alt='#' />
                        </div>
                        <div className='name-div'>
                            <a className="navbar-brand landing-navbar-logo" href="#">
                                <span className='deep-span'>DEEP</span> <span className='net-span'>NET</span>
                            </a><br />
                            <a class="navbar-brand landing-navbar-logo" href="#"><span className='soft-span'>SOFT</span> </a>
                        </div>

                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-expanded="false" >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item" >
                                <a class="nav-link landing-navbar-a" href="#home">HOME</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link landing-navbar-a" href="#menu">MENU</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link landing-navbar-a" href="#reservation">MAKE A RESERVATION</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link landing-navbar-a" href="#contact">CONTACT US</a>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
            <section id='menu'>
                <div className='menu-background'>
                    <h1 className='menu-h1 text-center'>MENU</h1>
                    <p className='menu-p'>Please take a look at our menu featuring food, drinks, and brunch. If you'd like to <br />place an order, use the "Order Online" button located below the menu.</p>

                </div>

            </section>
            <section>
                <div className='button-background'>
                    <div className='menu-btn-div'>
                        <button className='menu-btn' onClick={() => {
                            setTitle("FOOD DETAILS");
                            setSelectedCategory("food");
                        }}>FOOD</button>

                        <button className='menu-btn' onClick={() => {
                            setTitle("DRINKS DETAILS");
                            setSelectedCategory("drinks");
                        }}>DRINKS</button>
                    </div>
                </div>
            </section>
            <section>
                <div className="content-background">
                    {!addItems && (
                        <>
                            <button className="btn-add-items" onClick={handleAddItemsClick}>Add items</button>
                            {categoryError && <p className="error-message">{categoryError}</p>}
                        </>
                    )}
                    {addItems && (
                        <div className="input-container">
                            <form onSubmit={submit}>
                                <div className="input-card" ref={popupRef}>
                                    <h3 className="input-title">Add New Item</h3>
                                    <div className="mb-3">
                                        <label htmlFor="itemName" className="form-label">Item Name</label>
                                        <input type="text" className="form-control" id="itemName" onChange={change} value={items.itemName} name="itemName" placeholder="Enter item name" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="description" onChange={change} value={items.description} name="description" placeholder="Enter description" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="price" className="form-label">Price</label>
                                        <input type="number" className="form-control" id="price" onChange={change} value={items.price} name="price" placeholder="Enter price" required />
                                    </div>
                                    <button type="submit" className="btn btn-primary add-btn">ADD</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {!addItems && (
                        <>  
                        <h2 className="content-h2">{title}</h2>
                            <div className="row content-border">
                                {view.length > 0 ? (
                                    view.map((item, index) => (
                                        <div key={index} className="content-h6-and-p-div">
                                            <div className="content-prize-and-h6-div">
                                                <h6 className="content-h6"><span className='content-h6-span'>Name :</span> {item.itemName}</h6>
                                                <p className="content-price"><span className='content-price-span'>$ </span>{item.price}</p>
                                            </div>
                                            <p className="content-p "><span className='content-discription-span'>Description : </span> {item.description}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className='no-selection-message'>No items available in this category.</p>
                                )}
                            </div>

                        </>

                    )}
                </div>

            </section>

            <section id="contact">
                <div className="contact-background">
                    <div className="row contact-row">
                        {/* CONNECT WITH US */}
                        <div className="col-3 contact-us-div">
                            <h6 className="contact-main-contents">CONNECT WITH US</h6>
                            <div className="logo-and-contact-div">
                                <div className="contact-logo"><FaPhoneAlt /></div>
                                <div className="contact-phonenum">+91 9567843340</div>
                            </div>
                            <div className="logo-and-email-div">
                                <div className="contact-phonenum">Email: info@deepnetsoft.com</div>
                            </div>
                        </div>

                        {/* COMPANY LOGO */}
                        <div className="col-3 contact-us-div">
                            <img className="contact-us-img" src={img2} alt="Company Logo" />
                            <h6 className="contact-main-contents">
                                DEEP<span className="h6-net-span"> NET</span>
                                <span className="h6-soft-span"> SOFT</span>
                            </h6>
                        </div>

                        {/* FIND US */}
                        <div className="col-3 contact-us-div">
                            <h6 className="contact-main-contents">FIND US</h6>
                            <p className="find-us-p">
                                First Floor Geo Infopark, <br /> Infopark EXPY, Kakkanad
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer id='footer'>
                <div className='footer-ovefrall-div'>
                    <p className='footre-p1'>© 2024 Deepnetsoft Solutions. All rights reserved.</p>
                    <div className='footer-p2-p3'>
                        <p className='footer-p2'>Terms & Conditions <span className='footer-span'>   Privacy Policy</span></p>

                    </div>
                </div>
            </footer>

        </div>
    )
}

export default IntroPage