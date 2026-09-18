import CheckoutForm from "@/components/CheckoutForm";
import CheckoutSummary from "@/components/CheckoutSummary";

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Finalizar compra
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <CheckoutSummary />
        <CheckoutForm />
      </div>
    </main>
  );
}
