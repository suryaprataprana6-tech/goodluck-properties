"use client";

import { useState } from "react";
import { Calculator, Percent, ShieldCheck, Wallet } from "lucide-react";


export default function InvestmentCalculator() {
  const [activeTab, setActiveTab] = useState<"emi" | "roi">("emi");

  // EMI State variables
  const [propertyCost, setPropertyCost] = useState(25000000); // 2.5 Cr default
  const [loanPercentage, setLoanPercentage] = useState(80);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  // ROI State variables
  const [monthlyRent, setMonthlyRent] = useState(75000);
  const [appreciationRate, setAppreciationRate] = useState(8); // annual %

  // EMI Calculations
  const loanAmount = (propertyCost * loanPercentage) / 100;
  const monthlyRate = interestRate / 12 / 100;
  const numberOfPayments = tenureYears * 12;
  const estimatedEMI =
    monthlyRate === 0
      ? loanAmount / numberOfPayments
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  // Yield Calculations
  const annualRentalIncome = monthlyRent * 12;
  const grossRentalYield = (annualRentalIncome / propertyCost) * 100;
  const projectedValue5Yrs = propertyCost * Math.pow(1 + appreciationRate / 100, 5);
  const totalGain5Yrs = projectedValue5Yrs - propertyCost + annualRentalIncome * 5;

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} Lac`;
  };

  return (
    <section id="calculator" className="py-24 bg-luxury-green-dark/30 relative">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-luxury-gold/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-[0.25em] text-luxury-gold uppercase font-semibold mb-2 block">
            Financial Dashboard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Noida Investment Planner
          </h2>
          <p className="text-slate-300 font-light">
            Plan your purchases with transparency. Estimate monthly outlays or calculate long-term appreciation yields on premium developments.
          </p>
        </div>

        {/* Calculator Widget */}
        <div className="glass rounded-2xl border-luxury-gold/20 overflow-hidden shadow-2xl">
          {/* Tab Selector */}
          <div className="flex border-b border-white/5">
            <button
              onClick={() => setActiveTab("emi")}
              className={`flex-1 py-4 text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center space-x-2 border-b-2 cursor-pointer transition-colors ${
                activeTab === "emi"
                  ? "border-luxury-gold text-luxury-gold bg-white/[0.02]"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <Wallet className="w-4.5 h-4.5" />
              <span>EMI Planner</span>
            </button>
            <button
              onClick={() => setActiveTab("roi")}
              className={`flex-1 py-4 text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center space-x-2 border-b-2 cursor-pointer transition-colors ${
                activeTab === "roi"
                  ? "border-luxury-gold text-luxury-gold bg-white/[0.02]"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <Calculator className="w-4.5 h-4.5" />
              <span>Rental Yield &amp; ROI</span>
            </button>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Inputs Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Common Property Cost slider */}
              <div>
                <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
                  <span className="uppercase tracking-widest font-semibold text-[10px]">
                    Property Valuation
                  </span>
                  <span className="text-luxury-gold font-bold text-sm">
                    {formatCurrency(propertyCost)}
                  </span>
                </div>
                <input
                  type="range"
                  min={5000000}
                  max={150000000}
                  step={1000000}
                  value={propertyCost}
                  onChange={(e) => setPropertyCost(Number(e.target.value))}
                  className="w-full accent-luxury-gold cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>50 Lac</span>
                  <span>5 Cr</span>
                  <span>10 Cr</span>
                  <span>15 Cr</span>
                </div>
              </div>

              {activeTab === "emi" ? (
                <>
                  {/* Loan Percentage */}
                  <div>
                    <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
                      <span className="uppercase tracking-widest font-semibold text-[10px]">
                        Loan LTV Ratio
                      </span>
                      <span className="text-luxury-gold font-bold">{loanPercentage}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={90}
                      value={loanPercentage}
                      onChange={(e) => setLoanPercentage(Number(e.target.value))}
                      className="w-full accent-luxury-gold cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                      <span>10% Loan</span>
                      <span>50%</span>
                      <span>90% Max</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Interest Rate */}
                    <div>
                      <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
                        <span className="uppercase tracking-widest font-semibold text-[10px]">
                          Interest Rate
                        </span>
                        <span className="text-luxury-gold font-bold">{interestRate}%</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={15}
                        step={0.1}
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full accent-luxury-gold cursor-pointer"
                      />
                    </div>

                    {/* Loan Tenure */}
                    <div>
                      <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
                        <span className="uppercase tracking-widest font-semibold text-[10px]">
                          Loan Tenure
                        </span>
                        <span className="text-luxury-gold font-bold">{tenureYears} Years</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={30}
                        value={tenureYears}
                        onChange={(e) => setTenureYears(Number(e.target.value))}
                        className="w-full accent-luxury-gold cursor-pointer"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Monthly Rental Income */}
                    <div>
                      <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
                        <span className="uppercase tracking-widest font-semibold text-[10px]">
                          Expected Monthly Rent
                        </span>
                        <span className="text-luxury-gold font-bold">
                          {formatCurrency(monthlyRent)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={10000}
                        max={500000}
                        step={5000}
                        value={monthlyRent}
                        onChange={(e) => setMonthlyRent(Number(e.target.value))}
                        className="w-full accent-luxury-gold cursor-pointer"
                      />
                    </div>

                    {/* Capital Appreciation Rate */}
                    <div>
                      <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
                        <span className="uppercase tracking-widest font-semibold text-[10px]">
                          Appreciation Rate (Annual)
                        </span>
                        <span className="text-luxury-gold font-bold">{appreciationRate}%</span>
                      </div>
                      <input
                        type="range"
                        min={3}
                        max={15}
                        step={0.5}
                        value={appreciationRate}
                        onChange={(e) => setAppreciationRate(Number(e.target.value))}
                        className="w-full accent-luxury-gold cursor-pointer"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Right Output Column */}
            <div className="lg:col-span-5 bg-white/[0.03] border border-white/5 p-6 rounded-xl flex flex-col justify-between space-y-6">
              {activeTab === "emi" ? (
                <>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-white mb-4">
                      Loan Overview Estimates
                    </h4>
                    <div className="space-y-4 text-xs font-light text-slate-300">
                      <div className="flex justify-between">
                        <span>Down Payment (Own Funds)</span>
                        <span className="font-mono text-white font-medium">
                          {formatCurrency(propertyCost - loanAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sanctioned Loan Amount</span>
                        <span className="font-mono text-white font-medium">
                          {formatCurrency(loanAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between pb-4 border-b border-white/5">
                        <span>Interest Rate &amp; Tenure</span>
                        <span className="text-white font-medium">
                          {interestRate}% for {tenureYears} Years
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 text-center">
                    <span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                      Estimated Monthly Outlay (EMI)
                    </span>
                    <span className="text-3xl font-serif font-extrabold text-gold-gradient tracking-tight block">
                      ₹{estimatedEMI.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-[10px] text-slate-400 font-light block mt-1.5">
                      Subject to lender criteria. Varies by credit score.
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-white mb-4">
                      Yield &amp; Gain Projections
                    </h4>
                    <div className="space-y-4 text-xs font-light text-slate-300">
                      <div className="flex justify-between">
                        <span>Gross Annual Rental Income</span>
                        <span className="font-mono text-white font-medium">
                          {formatCurrency(annualRentalIncome)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gross Rental Yield %</span>
                        <span className="font-mono text-luxury-gold-light font-bold flex items-center">
                          <Percent className="w-3.5 h-3.5 mr-0.5" />
                          {grossRentalYield.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between pb-4 border-b border-white/5">
                        <span>Projected Value in 5 Yrs</span>
                        <span className="font-mono text-white font-medium">
                          {formatCurrency(projectedValue5Yrs)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 text-center">
                    <span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                      Net Gain 5-Yr Wealth Projection
                    </span>
                    <span className="text-3xl font-serif font-extrabold text-gold-gradient tracking-tight block">
                      {formatCurrency(totalGain5Yrs)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-light block mt-1.5">
                      Includes rental yields + {appreciationRate}% annual capital appreciation.
                    </span>
                  </div>
                </>
              )}

              <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 border-t border-white/5 pt-4">
                <ShieldCheck className="w-4 h-4 text-luxury-gold" />
                <span>Zero brokerage on new developer bookings. Get VIP rates.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
