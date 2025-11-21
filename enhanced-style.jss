/* Enhanced CSS for Advanced BIN Generator */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --error-color: #ef4444;
    --background-color: #f8fafc;
    --card-background: #ffffff;
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
    --border-color: #e5e7eb;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

[data-theme="dark"] {
    --background-color: #1f2937;
    --card-background: #374151;
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    --border-color: #4b5563;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    min-height: 100vh;
    padding: 20px;
    color: var(--text-primary);
    transition: background-color 0.3s ease;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    background: var(--card-background);
    padding: 30px;
    border-radius: 20px;
    box-shadow: var(--shadow);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
}

/* Header Styles */
header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--border-color);
}

h1 {
    color: var(--text-primary);
    font-size: 2.5rem;
    margin-bottom: 10px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.subtitle {
    color: var(--text-secondary);
    font-size: 1.1rem;
}

/* Control Panel */
.control-panel {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
    padding: 25px;
    background: var(--card-background);
    border-radius: 15px;
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
}

.form-group {
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 8px;
    font-weight: 600;
    color: var(--text-primary);
    font-size: 0.9rem;
}

input, select {
    padding: 12px 15px;
    border: 2px solid var(--border-color);
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: var(--card-background);
    color: var(--text-primary);
}

input:focus, select:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Button Styles */
.btn {
    padding: 15px 25px;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.generate-btn {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    box-shadow: var(--shadow);
}

.generate-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.generate-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.clear-btn {
    background: linear-gradient(135deg, #fd79a8, #e84393);
    color: white;
}

.clear-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(253, 121, 168, 0.4);
}

/* Stats Section */
.stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 30px;
}

.stat-item {
    background: var(--card-background);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: var(--shadow);
    border-left: 4px solid var(--primary-color);
    border: 1px solid var(--border-color);
}

.stat-label {
    display: block;
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin-bottom: 5px;
}

.stat-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--text-primary);
}

/* Results Section */
.results-section {
    background: var(--card-background);
    padding: 25px;
    border-radius: 15px;
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
}

.results-section h2 {
    color: var(--text-primary);
    margin-bottom: 20px;
    font-size: 1.5rem;
}

.result-controls {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.copy-btn {
    background: linear-gradient(135deg, var(--success-color), #059669);
    color: white;
}

.export-btn {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
}

.result-area {
    max-height: 600px;
    overflow-y: auto;
    border: 2px dashed var(--border-color);
    border-radius: 10px;
    padding: 20px;
    background: var(--background-color);
}

/* Card Item Styles */
.card-item {
    background: var(--card-background);
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 12px;
    border-left: 4px solid var(--primary-color);
    box-shadow: var(--shadow);
    transition: transform 0.3s ease;
    border: 1px solid var(--border-color);
}

.card-item:hover {
    transform: translateX(5px);
}

.card-header {
    display: flex;
    justify-content: between;
    align-items: center;
    margin-bottom: 15px;
    gap: 15px;
}

.card-number {
    font-family: 'Courier New', monospace;
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--text-primary);
    letter-spacing: 1px;
    flex: 1;
}

.card-type-badge {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
}

.card-details {
    margin-bottom: 15px;
}

.detail-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    margin-bottom: 10px;
}

.detail-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.9rem;
    color: var(--text-secondary);
}

.detail-item strong {
    color: var(--text-primary);
}

.country-flag {
    font-size: 1.2rem;
    margin-right: 5px;
}

.card-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.copy-card-btn, .validate-card-btn {
    padding: 8px 15px;
    font-size: 0.8rem;
    border-radius: 6px;
}

.copy-card-btn {
    background: var(--success-color);
    color: white;
}

.validate-card-btn {
    background: var(--warning-color);
    color: white;
}

/* Loading Animation */
.loading {
    display: none;
    text-align: center;
    padding: 40px;
}

.spinner {
    border: 4px solid var(--border-color);
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0 auto 15px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Message Styles */
.success-message, .error-message {
    padding: 15px;
    border-radius: 10px;
    margin-top: 15px;
    display: none;
    text-align: center;
    font-weight: 600;
}

.success-message {
    background: #d1fae5;
    color: #065f46;
    border: 1px solid #a7f3d0;
}

.error-message {
    background: #fee2e2;
    color: #991b1b;
    border: 1px solid #fecaca;
}

/* Empty State */
.empty-state {
    text-align: center;
    color: var(--text-secondary);
    padding: 40px;
}

/* Scrollbar Styling */
.result-area::-webkit-scrollbar {
    width: 8px;
}

.result-area::-webkit-scrollbar-track {
    background: var(--border-color);
    border-radius: 4px;
}

.result-area::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
}

.result-area::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-color);
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        padding: 15px;
    }
    
    .control-panel {
        grid-template-columns: 1fr;
    }
    
    .result-controls {
        flex-direction: column;
    }
    
    .card-header {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .detail-row {
        grid-template-columns: 1fr;
    }
    
    h1 {
        font-size: 2rem;
    }
    
    .card-actions {
        justify-content: center;
    }
}

@media (max-width: 480px) {
    body {
        padding: 10px;
    }
    
    .container {
        padding: 15px;
    }
    
    .stats {
        grid-template-columns: 1fr;
    }
    
    .card-number {
        font-size: 1rem;
    }
}

/* Print Styles */
@media print {
    body {
        background: white !important;
    }
    
    .container {
        box-shadow: none;
        padding: 0;
    }
    
    .btn, .result-controls, .loading {
        display: none !important;
    }
    
    .card-item {
        break-inside: avoid;
        margin-bottom: 20px;
    }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    :root {
        --primary-color: #0000ff;
        --secondary-color: #000080;
        --border-color: #000000;
    }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
