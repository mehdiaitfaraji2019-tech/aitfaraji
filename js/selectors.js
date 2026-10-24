import { state } from "./state.js";

export const getCustomer = (customerId) => {
    return state.customers.find(c => c.id === customerId);
};

export const getProduct = (productId) => {
    return state.products.find(p => p.id === productId);
};
export const getLineAmount = (item) => {
    const product = getProduct(item.productId);
    return product ? product.price * item.quantity : 0;
};
export const getOrderTotal = (order) => {
    let total = 0;
    order.items.forEach(item => {
        total += getLineAmount(item);
    });
    return total;
};
export const getVisibleOrders = () => {
    return state.orders.filter(order => {
        const customer = getCustomer(order.customerId);
        const matchesSearch = customer && customer.name.toLowerCase().includes(state.search.toLowerCase());
        const matchesStatus = state.status === "all" || order.status === state.status;
        let matchesCategory = true;
        if (state.category !== "all") {
            matchesCategory = order.items.some(item => {
                const product = getProduct(item.productId);
                return product && product.category === state.category;
            });
        }

        return matchesSearch && matchesStatus && matchesCategory;
    });
};