import React, { useState } from "react";

const   ImageUploaderModal = ({ setFile, setImage, chosenImage }) => {
    const [currentFile, setCurrentFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setCurrentFile(file);
            setFile(file);
            
            const preview = URL.createObjectURL(file);
            setPreviewImage(preview);
            setImage(preview);
        }
    };

    const clearFile = () => {
        setCurrentFile(null);
        setPreviewImage(null);
        setFile(null);
        setImage(null);
    };

    return (
        <div>
            <div className="mb-3">
                <label className="form-label fw-bold">Foto do Produto:</label>
                <input 
                    type="file" 
                    className="form-control" 
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {currentFile && (
                    <div className="mt-2">
                        <small className="text-muted">Arquivo: {currentFile.name}</small>
                        <button 
                            type="button" 
                            className="btn btn-sm btn-outline-danger ms-2"
                            onClick={clearFile}
                        >
                            Remover
                        </button>
                    </div>
                )}
            </div>
            
            {previewImage && (
                <div className="mb-3">
                    <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="img-thumbnail" 
                        style={{maxWidth: '200px', maxHeight: '200px'}}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUploaderModal;