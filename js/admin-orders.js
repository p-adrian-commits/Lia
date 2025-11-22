document.addEventListener('DOMContentLoaded', () => {
    const pendingOrdersBody = document.getElementById('pending-orders');
    const deliveryOrdersBody = document.getElementById('delivery-orders');
    const deliveredOrdersBody = document.getElementById('delivered-orders');

    let orders = [
        { id: 'AGRI-8342', customer: 'John Doe', date: '2023-10-26', status: 'Delivered', total: 99.48 },
        { id: 'AGRI-5912', customer: 'Jane Smith', date: '2023-10-28', status: 'Shipped', total: 100.00 },
        { id: 'AGRI-7734', customer: 'Sam Wilson', date: '2023-11-01', status: 'Pending', total: 200.95 },
    ];

    function renderOrders() {
        pendingOrdersBody.innerHTML = '';
        deliveryOrdersBody.innerHTML = '';
        deliveredOrdersBody.innerHTML = '';

        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.date}</td>
                <td><span class="status status-${order.status.toLowerCase()}">${order.status}</span></td>
                <td>₱${order.total.toFixed(2)}</td>
                <td class="actions">
                    <button class="more-options-btn">...</button>
                    <div class="actions-menu" style="display:none;">
                        <a href="#" onclick="updateStatus('${order.id}', 'Pending')">Pending</a>
                        <a href="#" onclick="updateStatus('${order.id}', 'Shipped')">Shipped</a>
                        <a href="#" onclick="updateStatus('${order.id}', 'Delivered')">Delivered</a>
                    </div>
                </td>
            `;

            if (order.status === 'Pending') {
                pendingOrdersBody.appendChild(row);
            } else if (order.status === 'Shipped') {
                deliveryOrdersBody.appendChild(row);
            } else if (order.status === 'Delivered') {
                deliveredOrdersBody.appendChild(row);
            }
        });

        document.querySelectorAll('.more-options-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                let menu = e.target.nextElementSibling;
                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
            });
        });
    }

    window.updateStatus = (orderId, newStatus) => {
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            renderOrders();
        }
    };

    renderOrders();
});
