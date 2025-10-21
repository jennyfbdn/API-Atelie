import React from 'react';
import femblusaazul from '../../assets/images/femblusaazul.png';
import masccamisabranca from '../../assets/images/masccamisabranca.png';
import vestidoFloral from '../../assets/images/vestido_floral.jpg';
import conjuntoJeans from '../../assets/images/conjunto_jeans.jpg';
import blusadecroche from '../../assets/images/blusadecroche.jpg';
import saiapreta from '../../assets/images/saiapreta.jpg';
import logo from '../../assets/images/logo.png';

const ProductShowcase = () => {
    const featuredProducts = [
        {
            id: 1,
            name: "Blusa Feminina Azul",
            image: femblusaazul,
            category: "Feminino"
        },
        {
            id: 2,
            name: "Camisa Masculina Branca",
            image: masccamisabranca,
            category: "Masculino"
        },
        {
            id: 3,
            name: "Vestido Floral",
            image: vestidoFloral,
            category: "Feminino"
        },
        {
            id: 4,
            name: "Conjunto Jeans",
            image: conjuntoJeans,
            category: "Casual"
        },
        {
            id: 5,
            name: "Blusa de Crochê",
            image: blusadecroche,
            category: "Artesanal"
        },
        {
            id: 6,
            name: "Saia Preta",
            image: saiapreta,
            category: "Feminino"
        }
    ];

    return (
        <div className="container-fluid py-5">
            <div className="row mb-5">
                <div className="col-12 text-center">
                    <h2 className="text-gradient mb-3">Produtos em Destaque</h2>
                    <p className="lead">Conheça algumas de nossas criações mais populares</p>
                </div>
            </div>
            
            <div className="row g-4">
                {featuredProducts.map((product) => (
                    <div className="col-lg-4 col-md-6" key={product.id}>
                        <div className="product-card fade-in">
                            <img 
                                src={product.image}
                                alt={product.name}
                                className="product-image"
                                onError={(e) => {
                                    e.target.src = logo;
                                }}
                            />
                            <div className="p-4">
                                <span className="badge bg-primary mb-2">{product.category}</span>
                                <h5 className="mb-3 fw-bold">{product.name}</h5>
                                <p className="text-muted mb-3">Peça exclusiva do Ateliê Pano Fino</p>
                                <button className="btn btn-primary w-100">
                                    <i className="bi bi-phone me-2"></i>
                                    Disponível no App
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductShowcase;