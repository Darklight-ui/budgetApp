import React from "react";
import BudgetCard from "./BudgetCard";
import { useBudgets } from "./contexts/BudgetContexts";

const TotalBudgetCard = () => {
    const { expenses, budgets} = useBudgets();
    const amount = expenses.reduce((total, expenses) => total + expenses.amount,0);
    const max = budgets.reduce((total, budgets) => total + budgets.max,0);
        if(max === 0) return null
    return (
        <BudgetCard gray name="Total" amount={amount} max={max} hideButton />
    )
}
 
export default TotalBudgetCard; 
 