import { getCustomer, getOrderTotal, getProduct, getLineAmount } from "./selectors.js";

const ordersTableBody = document.querySelector("#ordersTableBody");
const resultCount = document.querySelector("#resultCount");
const errorMessage = document.querySelector("#errorMessage");
const totalOrders = document.querySelector("#totalOrders");
const deliveredOrders = document.querySelector("#deliveredOrders");
const totalAmount = document.querySelector("#totalAmount");
const totalCustomers = document.querySelector("#totalCustomers");

const createOrderRow = (order) => {
    const customer = getCustomer(order.customerId);
    const total = getOrderTotal(order);
        let badgeClass = "bg-warning text-dark";
    if (order.status === "Livrée") badgeClass = "bg-success";
    if (order.status === "Annulée") badgeClass = "bg-danger";

    return `
        <tr>
            <td>#${order.id}</td>
            <td>${customer ? customer.name : "Inconnu"}</td>
            <td>${order.date}</td>
            <td><span class="badge ${badgeClass}">${order.status}</span></td>
            <td>${total} DH</td>
            <td>
                <button class="btn btn-sm btn-outline-dark btn-detail" data-id="${order.id}">
                    Voir
                </button>
            </td>
        </tr>
    `;
};

export const renderOrders = (orders) => {
    resultCount.textContent = `${orders.length} commande(s) affichée(s)`;

    if (orders.length === 0) {
        ordersTableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">Aucune commande trouvée.</td></tr>`;
        return;
    }

    ordersTableBody.innerHTML = orders.map(createOrderRow).join("");
};

export const renderStats = (orders) => {
    totalOrders.textContent = orders.length;
        const delivered = orders.filter(o => o.status === "Livrée");
    deliveredOrders.textContent = delivered.length;

    let total = 0;
    orders.forEach(order => {
        total += getOrderTotal(order);
    });
    totalAmount.textContent = `${total} DH`;

    totalCustomers.textContent = new Set(orders.map(o => o.customerId)).size;
};

export const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.classList.remove("d-none");
};

export const renderOrderDetail = (order) => {
    // 1. Remplir les infos de base
    const customer = getCustomer(order.customerId);
    document.querySelector("#modalOrderId").textContent = `Commande #${order.id}`;
    document.querySelector("#modalClientName").textContent = customer ? customer.name : "Inconnu";
    document.querySelector("#modalTotal").textContent = `${getOrderTotal(order)} DH`;
    document.querySelector("#modalStatus").textContent = order.status;
    document.querySelector("#modalDate").textContent = order.date;
    const modalElement = document.querySelector("#orderModal");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
};