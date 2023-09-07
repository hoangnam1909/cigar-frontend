import { useEffect, useState } from "react";
import { adminEndpoints } from "~/api/API";
import AuthAPI from "~/api/AuthAPI";

export default function OrderStatusForm({ order, getOrder }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStatusId, setOrderStatusId] = useState();
  const [orderStatuses, setOrderStatuses] = useState();

  const getOrderStatuses = async () => {
    const res = await AuthAPI().get(adminEndpoints.orderStatus);
    if (res.data.result != null) {
      setOrderStatuses(res.data.result);
    }
  };

  useEffect(() => {
    getOrderStatuses();
    setOrderStatusId(order.orderStatus.id);
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const updateOrderStatus = async (e) => {
      setIsSubmitting(true);

      const res = await AuthAPI().patch(
        `${adminEndpoints.orders}/${order.id}`,
        {
          orderStatusId: orderStatusId,
        }
      );
      if (res.status === 200) getOrder();

      setIsSubmitting(false);
    };

    updateOrderStatus();
  };

  return (
    <form
      onSubmit={handleSubmitForm}
      className={`${order ? "" : "loading-skeleton"}`}
    >
      {isSubmitting ? (
        <div
          className="isSubmitting-border me-3 align-self-center"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}

      <select
        className="form-select mb-3"
        disabled={isSubmitting}
        onChange={(e) => {
          setOrderStatusId(e.target.value);
        }}
      >
        {orderStatuses?.map((orderStatus) => {
          return (
            <option
              key={orderStatus.id}
              value={orderStatus.id}
              selected={order?.orderStatus?.id == orderStatus.id}
            >
              {orderStatus.name}
            </option>
          );
        })}
      </select>

      <button
        className="btn btn-primary w-100 py-2"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span
            className="isSubmitting-border isSubmitting-border-sm me-2"
            aria-hidden="true"
          ></span>
        ) : null}
        <span role="status">Lưu</span>
      </button>
    </form>
  );
}
