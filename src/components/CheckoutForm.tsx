"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/lib/orders";
import { CheckoutFormValues } from "@/types/checkout";

const INITIAL_VALUES: CheckoutFormValues = {
  fullName: "",
  email: "",
  paymentMethod: "tarjeta",
  acceptsTerms: false,
};

const INITIAL_TOUCHED = { fullName: false, email: false };


export default function CheckoutForm() {
  const { items, clearCart } = useCart();

  const [values, setValues] = useState<CheckoutFormValues>(INITIAL_VALUES);
  const [touched, setTouched] = useState(INITIAL_TOUCHED);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const nameError =
    values.fullName.trim().length < 5
      ? "mas de 5 caracteres!"
      : null;


  const canSubmit =
    !nameError  && values.acceptsTerms && items.length > 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const order = await createOrder(items);
      setOrderId(order.id);
      clearCart();
      setValues(INITIAL_VALUES);
      setTouched(INITIAL_TOUCHED);
    } catch {
      setSubmitError("no se pudo, intenta de nuevo");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (orderId !== null) {
    return (
      <section className="rounded-lg border border-green-200 bg-green-50 p-6">
        <h2 className="text-lg font-semibold text-green-800">
          Pedido confirmado!!!!
        </h2>
        <p className="mt-2 text-sm text-green-700">
          tu ordenfue procesada correctamente
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-blue-600 hover:underline"
        >
          Seguir comprando
        </Link>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6"
    >




      <div className="flex flex-col gap-1">
        <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={values.fullName}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, fullName: event.target.value }))
          }
          onBlur={() => setTouched((prev) => ({ ...prev, fullName: true }))}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
        />
        {touched.fullName && nameError && (
          <p className="text-sm text-red-600">{nameError}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Correo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
        />
      </div>

      <div className="flex flex-col gap-1">
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={values.paymentMethod}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              paymentMethod: event.target.value,
            }))
          }
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
        >
          <option value="tarjeta">pse</option>
          <option value="pse">debitr</option>
          <option value="efectivo">credito facil codensa</option>
        </select>
      </div>

      <div className="flex items-start gap-2">
        <input
          id="acceptsTerms"
          name="acceptsTerms"
          type="checkbox"
          checked={values.acceptsTerms}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              acceptsTerms: event.target.checked,
            }))
          }
          className="mt-1"
        />
        <label htmlFor="acceptsTerms" className="text-sm text-gray-700">
          Acepto los terminos!!
        </label>
      </div>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}

      <button
        type="submit"
        disabled={!canSubmit || isSubmitting}
        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
      >
        {isSubmitting ? "Procesando..." : "Confirmar pedido"}
      </button>
    </form>
  );
}
