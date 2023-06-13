import React, {useEffect, useState} from 'react';
import "../styles/FilterForm.css"

const FilterForm = ({ onFilter, onCancel, params }) => {
    const [osEnabled, setOSEnabled] = useState(false);
    const [ramEnabled, setRAMEnabled] = useState(false);
    const [gpuEnabled, setGPUEnabled] = useState(false);
    const [requiredSpaceEnabled, setRequiredSpaceEnabled] = useState(false);
    const [processorEnabled, setProcessorEnabled] = useState(false);

    const [os, setOS] = useState(null);
    const [ram, setRAM] = useState(null);
    const [gpu, setGPU] = useState(null);
    const [requiredSpace, setRequiredSpace] = useState(null);
    const [processor, setProcessor] = useState(null);

    useEffect(() => {
        if (params.os) {
            setOSEnabled(true);
            setOS(params.os);
        }
        if (params.ram) {
            setRAMEnabled(true);
            setRAM(params.ram);
        }
        if (params.gpu) {
            setGPUEnabled(true);
            setGPU(params.gpu);
        }
        if (params.requiredSpace) {
            setRequiredSpaceEnabled(true);
            setRequiredSpace(params.requiredSpace);
        }
        if (params.processor) {
            setProcessorEnabled(true);
            setProcessor(params.processor);
        }
    }, [params]);

    const handleFilter = (e) => {
        e.preventDefault();
        const filters = {
            os: osEnabled ? os : null,
            ram: ramEnabled ? ram : null,
            gpu: gpuEnabled ? gpu : null,
            requiredSpace: requiredSpaceEnabled ? requiredSpace : null,
            processor: processorEnabled ? processor : null,
        };
        onFilter(filters);
    };

    return (
        <div className="modal-content1">
        <form onSubmit={handleFilter}>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${osEnabled ? 'active' : ''}`}
                    onClick={() => setOSEnabled(!osEnabled)}
                >
                    OS
                </button>
                {osEnabled && (
                    <input
                        type="text"
                        value={os}
                        onChange={(e) => setOS(e.target.value)}
                    />
                )}
            </div>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${ramEnabled ? 'active' : ''}`}
                    onClick={() => setRAMEnabled(!ramEnabled)}
                >
                    RAM (MB)
                </button>
                {ramEnabled && (
                    <input
                        type="number"
                        value={ram}
                        onChange={(e) => setRAM(e.target.value)}
                    />
                )}
            </div>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${gpuEnabled ? 'active' : ''}`}
                    onClick={() => setGPUEnabled(!gpuEnabled)}
                >
                    GPU
                </button>
                {gpuEnabled && (
                    <input
                        type="text"
                        value={gpu}
                        onChange={(e) => setGPU(e.target.value)}
                    />
                )}
            </div>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${requiredSpaceEnabled ? 'active' : ''}`}
                    onClick={() => setRequiredSpaceEnabled(!requiredSpaceEnabled)}
                >
                    Required Space (GB)
                </button>
                {requiredSpaceEnabled && (
                    <input
                        type="number"
                        value={requiredSpace}
                        onChange={(e) => setRequiredSpace(e.target.value)}
                    />
                )}
            </div>
            <div className="filter-option">
                <button
                    type="button"
                    className={`filter-option-button ${processorEnabled ? 'active' : ''}`}
                    onClick={() => setProcessorEnabled(!processorEnabled)}
                >
                    Processor
                </button>
                {processorEnabled && (
                    <input
                        type="text"
                        value={processor}
                        onChange={(e) => setProcessor(e.target.value)}
                    />
                )}
            </div>
            <button type="submit">Filter</button>
            <button type="button" className="filter-option-cancel" onClick={onCancel}>Cancel</button>
        </form>
        </div>
    );
};

export default FilterForm;
