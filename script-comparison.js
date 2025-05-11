// Script Comparison System
class ScriptComparison {
    constructor() {
        this.comparisonList = [];
        this.maxComparisonItems = 3;
    }

    addToComparison(script) {
        if (this.comparisonList.length >= this.maxComparisonItems) {
            this.comparisonList.shift(); // Remove oldest item
        }
        this.comparisonList.push(script);
        this.updateComparisonUI();
    }

    removeFromComparison(scriptId) {
        this.comparisonList = this.comparisonList.filter(script => script.id !== scriptId);
        this.updateComparisonUI();
    }

    clearComparison() {
        this.comparisonList = [];
        this.updateComparisonUI();
    }

    updateComparisonUI() {
        const container = document.getElementById('comparisonContainer');
        if (!container) return;

        if (this.comparisonList.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'block';
        container.innerHTML = `
            <div class="comparison-header">
                <h3>Script Comparison (${this.comparisonList.length}/${this.maxComparisonItems})</h3>
                <button class="clear-comparison-btn">Clear All</button>
            </div>
            <div class="comparison-grid">
                ${this.comparisonList.map(script => `
                    <div class="comparison-item" data-script-id="${script.id}">
                        <div class="comparison-item-header">
                            <h4>${script.title}</h4>
                            <button class="remove-comparison-btn" data-script-id="${script.id}">×</button>
                        </div>
                        <div class="comparison-item-content">
                            <div class="comparison-stat">
                                <span class="stat-label">Category:</span>
                                <span class="stat-value">${scriptCategories.getCategoryName(script.category)}</span>
                            </div>
                            <div class="comparison-stat">
                                <span class="stat-label">Rating:</span>
                                <span class="stat-value">${script.rating || 0} ⭐</span>
                            </div>
                            <div class="comparison-stat">
                                <span class="stat-label">Views:</span>
                                <span class="stat-value">${script.views || 0} 👥</span>
                            </div>
                            <div class="comparison-stat">
                                <span class="stat-label">Status:</span>
                                <span class="stat-value">
                                    ${script.verified ? '✅ Verified' : ''}
                                    ${script.premium ? '💰 Premium' : ''}
                                    ${script.patched ? '⚠️ Patched' : ''}
                                </span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Add event listeners
        container.querySelector('.clear-comparison-btn').addEventListener('click', () => this.clearComparison());
        container.querySelectorAll('.remove-comparison-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const scriptId = e.target.dataset.scriptId;
                this.removeFromComparison(scriptId);
            });
        });
    }
}

// Initialize the comparison system
const scriptComparison = new ScriptComparison();

// Export for use in other files
window.scriptComparison = scriptComparison; 