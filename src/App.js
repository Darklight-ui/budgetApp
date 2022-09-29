/** @format */

import React, { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddBudget from "./components/AddBudget";
import AddExpenses from "./components/AddExpenses";
import BudgetCard from "./components/BudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import UncategorisedBudgetCard from "./components/UncategorisedBudgetCard";
import { useBudgets } from "./components/contexts/BudgetContexts";

const App = () => {
	const [showAddBudgetModal, setShowBudgetModal] = useState(false);
	const [showAddExpensesModal, setShowExpensesModal] = useState(false);
	const [addExpensesModalBudgetId, setAddExpensesModalBudgetId] = useState();
	const { budgets, getBudgetExpenses } = useBudgets();

	function openAddExpenseModal(budgetId) {
		setAddExpensesModalBudgetId(budgetId);
		setShowExpensesModal(true);
	}

	return (
		<div className="app">
			<Container className="my-4">
				<Stack direction="horizontal" gap="2" className="mb-4">
					<h1 className="me-auto">BUDGET APP</h1>
					<Button variant="primary" onClick={() => setShowBudgetModal(true)}>
						Add Budget
					</Button>
					<Button variant="outline-primary" onClick={openAddExpenseModal}>
						Add Expenses
					</Button>
				</Stack>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
						gap: "1rem",
						alignItems: "flex-start",
					}}>
					{budgets.map((budget) => {
						const amount = getBudgetExpenses(budget.id).reduce(
							(total, expenses) => total + expenses.amount,
							0,
						);
						return (
							<BudgetCard
								gray
								name={budget.name}
								key={budget.id}
								amount={amount}
								max={budget.max}
								onAddExpenseClick={() => openAddExpenseModal(budget.id)}
							/>
						);
					})}
					<UncategorisedBudgetCard onAddExpenseClick={openAddExpenseModal}/>
					<TotalBudgetCard />
				</div>
				{/* <BudgetCard gray name="Entertainment" amount={350} max={1000} /> */}
			</Container>
			<AddBudget
				show={showAddBudgetModal}
				handleClose={() => setShowBudgetModal(false)}
			/>
			<AddExpenses
				show={showAddExpensesModal}
				defaultBudgetId={addExpensesModalBudgetId}
				handleClose={() => setShowExpensesModal(false)}
			/>
		</div>
	);
};

export default App;
