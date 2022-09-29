/** @format */

import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../../hooks/useLocalStorage";
const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Un-Categorized";
export function useBudgets() {
	return useContext(BudgetsContext);
}

// // Budget set up
// {
//     id:
//     name:
//     max:

// }

// // Expenses set up
// {
//     id:
//     budgetId:
//     amount:
//     desc:
// }

export const BudgetProvider = ({ children }) => {
	const [budgets, setBudgets] = useLocalStorage("budgets", []);
	const [expenses, setExpenses] = useLocalStorage("expenses", []);

	// Get budget expenses
	function getBudgetExpenses(budgetId) {
		return expenses.filter((expense) => expense.budgetId === budgetId);
	}

	// Add Expenses
	function addExpenses({ desc, amount, budgetId }) {
		setExpenses((prevExpenses) => {
			return [...prevExpenses, { id: uuidV4(), desc, amount, budgetId }];
		});
	}

	// Add Budget function
	function addBudget({ name, max }) {
		setBudgets((prevBudgets) => {
			if (prevBudgets.find((budget) => budget.name === name)) {
				return prevBudgets;
			}
			return [...prevBudgets, { id: uuidV4(), name, max }];
		});
	}

	function deleteBudget(id) {
		// TODO: Deal with un-categorized
		setBudgets((prevBudgets) => {
			return prevBudgets.filter((budget) => budget.id !== id);
		});
	}
	function deleteExpenses(id) {
		setExpenses((prevExpenses) => {
			return prevExpenses.filter((expense) => expense.id !== id);
		});
	}
	return (
		<BudgetsContext.Provider
			value={{
				budgets,
				expenses,
				getBudgetExpenses,
				addExpenses,
				addBudget,
				deleteBudget,
				deleteExpenses,
			}}>
			{children}
		</BudgetsContext.Provider>
	);
};
