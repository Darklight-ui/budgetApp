/** @format */

import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "./contexts/BudgetContexts";

export default function AddExpenses({ show, handleClose, defaultBudgetId }) {
	const descRef = useRef();
	const amountRef = useRef();
	const budgetIdRef = useRef();

	const { addExpenses, budgets } = useBudgets();
	function handleSubmit(e) {
		e.preventDefault();
		addExpenses({
			desc: descRef.current.value,
			amount: parseFloat(amountRef.current.value),
			budgetId: budgetIdRef.current.value,
		});
		handleClose();
	}
	return (
		<Modal show={show} onHide={handleClose}>
			<Form onSubmit={handleSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>New Expenses</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" ControlId="desc">
						<Form.Label>Description</Form.Label>
						<Form.Control ref={descRef} type="TextArea" required />
					</Form.Group>

					<Form.Group className="mb-3" ControlId="amount">
						<Form.Label>Amount</Form.Label>
						<Form.Control
							ref={amountRef}
							type="number"
							min={0}
							step={0.01}
							required
						/>
					</Form.Group>

					<Form.Group className="mb-3" ControlId="Budget">
						<Form.Label>Budget</Form.Label>
						<Form.Select
							defaultValue={defaultBudgetId}
							ref={budgetIdRef}
							as="select"
							required>
							<option id={UNCATEGORIZED_BUDGET_ID}> Un-Categorized</option>
							{budgets.map((budget) => (
								<option key={budget.id} value={budget.id}>
									{budget.name}
								</option>
							))}
						</Form.Select>
					</Form.Group>
					<div className="d-flex justify-content-end">
						<Button variant="primary" type="submit">
							Add
						</Button>
					</div>
				</Modal.Body>
			</Form>
		</Modal>
	);
}
