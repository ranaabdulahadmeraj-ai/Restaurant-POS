import React, { useEffect, useState } from 'react';
import {
  X,
  CreditCard,
  DollarSign,
  Smartphone,
  CheckCircle2,
  Printer,
  Mail,
  Receipt,
  Users,
  ShieldCheck,
  Split
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRestaurant } from '../../context/RestaurantContext';
import { Order, PaymentMethod } from '../../types';
import { cn, formatCurrency } from '../../utils';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    subtotal,
    tax,
    discountAmount,
    tipAmount,
    setTipAmount,
    total,
    selectedTableForOrder,
    orderType,
    createOrder
  } = useRestaurant();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('apple_pay');
  const [cashTendered, setCashTendered] = useState<string>('100');
  const [splitWays, setSplitWays] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!isCheckoutModalOpen) return;
    setPaymentMethod('apple_pay');
    setCashTendered(total.toFixed(2));
    setSplitWays(1);
    setIsProcessing(false);
    setIsPaidSuccess(false);
    setCompletedOrder(null);
  }, [isCheckoutModalOpen]);

  if (!isCheckoutModalOpen) return null;

  const tipPercentages = [15, 18, 20, 25];

  const handleTipSelect = (pct: number) => {
    const tip = (subtotal * pct) / 100;
    setTipAmount(Number(tip.toFixed(2)));
  };

  const cashAmountNum = parseFloat(cashTendered) || 0;
  const cashChange = Math.max(0, cashAmountNum - total);
  const cashPaymentIsValid = paymentMethod !== 'cash' || cashAmountNum >= total;

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = createOrder(paymentMethod);
      setCompletedOrder(order);
      setIsProcessing(false);
      setIsPaidSuccess(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 900);
  };

  const handleClose = () => {
    setIsPaidSuccess(false);
    setIsProcessing(false);
    setIsCheckoutModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#F7F8FA] border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#111827]">
                {isPaidSuccess ? 'Order Recorded' : 'Checkout & Settlement'}
              </h3>
              <p className="text-[11px] text-[#6B7280]">
                {orderType === 'dine_in'
                  ? `${selectedTableForOrder?.name ?? 'Unassigned table'} • Dine-in`
                  : orderType === 'bar'
                    ? 'Bar Tab'
                    : orderType === 'delivery'
                      ? 'Delivery Order'
                      : 'Takeaway Order'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg hover:bg-[#E5E7EB] text-[#6B7280] hover:text-[#111827] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body */}
        {!isPaidSuccess ? (
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2.5">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={cn(
                    'p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-semibold transition-all',
                    paymentMethod === 'apple_pay'
                      ? 'border-[#635BFF] bg-[#EEF0FF] text-[#635BFF] shadow-xs'
                      : 'border-[#E5E7EB] hover:border-[#D1D5DB] text-[#111827] bg-[#F7F8FA]'
                  )}
                >
                  <Smartphone className="w-5 h-5" />
                  <span>Apple Pay / Tap</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={cn(
                    'p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-semibold transition-all',
                    paymentMethod === 'credit_card'
                      ? 'border-[#635BFF] bg-[#EEF0FF] text-[#635BFF] shadow-xs'
                      : 'border-[#E5E7EB] hover:border-[#D1D5DB] text-[#111827] bg-[#F7F8FA]'
                  )}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Credit / Debit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={cn(
                    'p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-semibold transition-all',
                    paymentMethod === 'cash'
                      ? 'border-[#635BFF] bg-[#EEF0FF] text-[#635BFF] shadow-xs'
                      : 'border-[#E5E7EB] hover:border-[#D1D5DB] text-[#111827] bg-[#F7F8FA]'
                  )}
                >
                  <DollarSign className="w-5 h-5" />
                  <span>Cash Payment</span>
                </button>
              </div>
            </div>

            {/* Cash Tendered Calculator (If Cash selected) */}
            {paymentMethod === 'cash' && (
              <div className="p-4 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#111827]">Cash Tendered</span>
                  <div className="flex items-center gap-1.5">
                    {['50', '100', '150', '200'].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setCashTendered(amt)}
                        className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-white border border-[#E5E7EB] hover:bg-[#F3F4F6]"
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 text-xs text-[#6B7280] font-mono">$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={cashTendered}
                      onChange={(e) => setCashTendered(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 rounded-lg border border-[#E5E7EB] text-sm font-mono font-semibold"
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">Change Due</p>
                    <p className="text-base font-mono font-bold text-[#16A34A]">{formatCurrency(cashChange)}</p>
                  </div>
                </div>
                {!cashPaymentIsValid && (
                  <p className="text-xs font-medium text-[#DC2626]">
                    Cash tendered must cover the total due.
                  </p>
                )}
              </div>
            )}

            {/* Tip Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                  Gratuity / Server Tip
                </label>
                {tipAmount > 0 && (
                  <span className="text-xs font-mono font-bold text-[#16A34A]">
                    +{formatCurrency(tipAmount)}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {tipPercentages.map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handleTipSelect(pct)}
                    className="py-2.5 rounded-xl border border-[#E5E7EB] hover:border-[#635BFF] hover:bg-[#EEF0FF] text-xs font-semibold text-[#111827] transition-all text-center"
                  >
                    {pct}%
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setTipAmount(0)}
                  className="py-2.5 rounded-xl border border-[#E5E7EB] hover:bg-[#F3F4F6] text-xs font-medium text-[#6B7280] transition-all text-center"
                >
                  No Tip
                </button>
              </div>
            </div>

            {/* Split Bill Option */}
            <div className="p-3.5 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Split className="w-4 h-4 text-[#635BFF]" />
                <span className="text-xs font-semibold text-[#111827]">Split Total Equally</span>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setSplitWays(n)}
                    className={cn(
                      'w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all',
                      splitWays === n
                        ? 'bg-[#635BFF] text-white shadow-xs'
                        : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6]'
                    )}
                  >
                    {n}x
                  </button>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="border-t border-[#E5E7EB] pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-[#6B7280]">
                <span>Items Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-mono text-[#111827]">{formatCurrency(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#16A34A] font-semibold">
                  <span>Promotional Discount</span>
                  <span className="font-mono">-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#6B7280]">
                <span>State & Local Tax (8.875%)</span>
                <span className="font-mono text-[#111827]">{formatCurrency(tax)}</span>
              </div>
              {tipAmount > 0 && (
                <div className="flex justify-between text-[#6B7280]">
                  <span>Server Gratuity</span>
                  <span className="font-mono text-[#111827]">{formatCurrency(tipAmount)}</span>
                </div>
              )}

              <div className="border-t border-[#E5E7EB] pt-2 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-bold text-[#111827]">Settlement Total</span>
                  {splitWays > 1 && (
                    <p className="text-[11px] text-[#635BFF] font-medium">
                      {formatCurrency(total / splitWays)} per person ({splitWays} guests)
                    </p>
                  )}
                </div>
                <span className="text-xl font-extrabold font-mono text-[#111827]">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Payment Success Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#ECFDF5] border border-[#16A34A]/30 text-[#16A34A] flex items-center justify-center mx-auto shadow-lg shadow-[#16A34A]/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#16A34A] bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-[#16A34A]/20">
                Demo Payment Recorded
              </span>
              <h2 className="text-2xl font-bold text-[#111827] mt-3 tracking-tight">
                {formatCurrency(completedOrder?.total ?? total)} Recorded
              </h2>
              <p className="text-xs text-[#6B7280] mt-1">
                Ticket {completedOrder?.displayId} dispatched to Kitchen Display System.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="max-w-sm mx-auto p-4 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] text-left text-xs font-mono space-y-1.5">
              <div className="flex justify-between text-[#6B7280]">
                <span>Ticket Number:</span>
                <span className="text-[#111827] font-bold">{completedOrder?.displayId}</span>
              </div>
              <div className="flex justify-between text-[#6B7280]">
                <span>Payment Method:</span>
                <span className="text-[#111827] capitalize">{paymentMethod.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between text-[#6B7280]">
                <span>Server:</span>
                <span className="text-[#111827]">Marco Silva</span>
              </div>
              <div className="flex justify-between text-[#6B7280]">
                <span>Status:</span>
                <span className="text-[#16A34A] font-bold">Recorded in POS</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => alert('Sending digital receipt to customer email...')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E5E7EB] hover:bg-[#F3F4F6] text-xs font-semibold text-[#111827] transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Receipt</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E5E7EB] hover:bg-[#F3F4F6] text-xs font-semibold text-[#111827] transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Thermal Chit</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-[#F7F8FA] border-t border-[#E5E7EB] flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280]">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span>Demo checkout · no payment is processed</span>
          </div>

          {!isPaidSuccess ? (
            <button
              onClick={handleProcessPayment}
              disabled={isProcessing || cart.length === 0 || !cashPaymentIsValid}
              className="py-3 px-6 rounded-xl bg-[#635BFF] hover:bg-[#5147FF] disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-2 shadow-md shadow-[#635BFF]/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              {isProcessing ? (
                <span>Recording Payment...</span>
              ) : (
                <span>Record {formatCurrency(total)} Payment</span>
              )}
            </button>
          ) : (
            <button
              onClick={handleClose}
              className="py-2.5 px-6 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white font-semibold text-xs transition-all"
            >
              Start Next Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
