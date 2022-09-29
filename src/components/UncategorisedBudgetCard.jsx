import React from "react";
import BudgetCard from "./BudgetCard";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetContexts";

const UncategorisedBugetCard = (props) => {
    const {getBudgetExpenses} = useBudgets()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
							(total, expenses) => total + expenses.amount,
							0,
						);
        if(amount === 0) return null
    return (
        <BudgetCard gray name="Un-Categorized" amount={amount} {...props} />
    )
}

export default UncategorisedBugetCard; 
 