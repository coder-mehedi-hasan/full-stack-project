import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';

const Home = () => {
    const [search, setsearch] = useState('')
    const [foods, setfoods] = useState([])
    const [foodsCat, setfoodsCat] = useState([])
    const loadData = async () => {
        const response = await fetch('http://localhost:5000/api/foods', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        setfoods(data[0])
        setfoodsCat(data[1])
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
            <div>
                <div id="carouselExampleDark" className="carousel carousel-dark slide" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-caption">
                        <div className="d-flex justify-content-center ">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} 
                            onChange={(e)=>setsearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="carousel-inner" style={{ objectFit: "contain !important" }}>
                        <div className="carousel-item active" data-bs-interval="10000">
                            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)",objectFit:'fill' }} alt="burger" />
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)",objectFit:'fill' }} alt="Chiken" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?soup" className="d-block w-100" style={{ filter: "brightness(30%)",objectFit:'fill' }} alt="soups" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="container py-5">
                {
                    foodsCat !== [] ?
                        foodsCat.map((data) => {
                            return (
                                <div key={data._id}>
                                    <div className='row'>
                                        <h3 className='fs-2 fw-medium'>Food Category <i className="fa-solid fa-caret-right"></i> {data.CategoryName} </h3>
                                        <hr />
                                        {
                                            foods !== [] ?
                                                foods.filter(items => (items.CategoryName === data.CategoryName ) && 
                                                (items.name.toLowerCase().includes(search.toLowerCase()))
                                                ).map(filterItems => {
                                                    return (
                                                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-10" key={filterItems._id}>
                                                            <Card
                                                                foodItem = {filterItems}
                                                                options={filterItems.options[0]}
                                                            ></Card>
                                                        </div>
                                                    )
                                                }) : <div className='text-center'>Please Wait Some Times Food Is Loading......</div>
                                        }
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div>Not Loaded</div>
                }
            </div>
            <Footer></Footer>
        </>
    );
};

export default Home;