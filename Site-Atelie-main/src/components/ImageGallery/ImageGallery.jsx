import React from 'react';

// Importando imagens diretamente
import femblusaazul from '../../assets/images/femblusaazul.png';
import masccamisabranca from '../../assets/images/masccamisabranca.png';
import vestidoFloral from '../../assets/images/vestido_floral.jpg';
import conjuntoJeans from '../../assets/images/conjunto_jeans.jpg';
import blusadecroche from '../../assets/images/blusadecroche.jpg';
import saiapreta from '../../assets/images/saiapreta.jpg';
import blusaBege from '../../assets/images/blusa_bege.jpg';
import vestidoRosa from '../../assets/images/vestidorosa.png';

const ImageGallery = () => {
    const images = [
        { src: femblusaazul, alt: "Blusa Feminina Azul", category: "Feminino" },
        { src: masccamisabranca, alt: "Camisa Masculina Branca", category: "Masculino" },
        { src: vestidoFloral, alt: "Vestido Floral", category: "Feminino" },
        { src: conjuntoJeans, alt: "Conjunto Jeans", category: "Casual" },
        { src: blusadecroche, alt: "Blusa de Crochê", category: "Artesanal" },
        { src: saiapreta, alt: "Saia Preta", category: "Feminino" },
        { src: blusaBege, alt: "Blusa Bege", category: "Feminino" },
        { src: vestidoRosa, alt: "Vestido Rosa", category: "Feminino" }
    ];

    return (
        <div className="container py-5">
            <div className="row mb-4">
                <div className="col-12 text-center">
                    <h3 className="text-gradient">Galeria de Produtos</h3>
                    <p className="text-muted">Algumas de nossas criações</p>
                </div>
            </div>
            <div className="row g-3">
                {images.map((image, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                        <div className="card h-100">
                            <img 
                                src={image.src} 
                                alt={image.alt}
                                className="card-img-top"
                                style={{height: '200px', objectFit: 'cover'}}
                            />
                            <div className="card-body p-3">
                                <h6 className="card-title mb-1">{image.alt}</h6>
                                <small className="text-muted">{image.category}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;