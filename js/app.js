import { state } from "./state.js";
import { fetchData } from "./dataService.js";
import { getVisibleOrders, getCustomer, getProduct, getLineAmount, getOrderTotal } from "./selectors.js";
import { renderOrders, renderStats, showError, renderOrderDetail, renderActiveFilters } from "./view.js";
const searchInput = document.querySelector("#searchInput");
const statusButtons = document.querySelectorAll(".status-btn");
const categoryButtons = document.querySelectorAll(".category-btn");
const ordersTableBody = document.querySelector("#ordersTableBody");
const render = () => {
    const visibleOrders = getVisibleOrders();
    renderOrders(visibleOrders);
    renderStats(state.orders);
    renderActiveFilters(state.status, state.category);
};
searchInput.addEventListener("input", (e) => {
    state.search = e.target.value.trim();
    render();
});
statusButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        state.status = btn.dataset.status;
        render();
    });
});
categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        state.category = btn.dataset.category;
        render();
    });
});
ordersTableBody.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-detail");
    if (!btn) return;

    const orderId = Number(btn.dataset.id);
    const order = state.orders.find(o => o.id === orderId); 
    
    if (order) {
        renderOrderDetail(order);
    }
});
const init = async () => {
    try {
        const data = await fetchData();
        state.customers = data.customers;
        state.products = data.products;
        state.orders = data.orders;
        render();
    } catch (error) {
        showError("Impossible de charger les données. Vérifiez les fichiers JSON.");
    }
};

init();