/** @format */

import { Button } from "react-bootstrap";
import React from "react";
import { Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";

const BudgetCard = ({ name, amount, max, gray, onAddExpenseClick, hideButton }) => {
	const classNames = [];
	// color to indicate the level of amount used...
	if (amount > max) {
		classNames.push("bg-danger", "bg-opacity-10");
	} else if (gray) {
		classNames.push("bg-light");
	}
	// ProgressBar to indicate the amount used...
	function getProgressBarVariant(amount, max) {
		const ratio = amount / max;
		if (ratio < 0.5) return "success";
		if (ratio < 0.75) return "warning";
		return "danger";
	}
	return (
		<Card className={classNames.join(" ")}>
			<Card.Body>
				<Card.Title className="justify-content-between align-items-baseline fw-normal mb-3">
					<div className="me-2">{name}</div>
					<div className="d-flex align-items-baseline">
						{currencyFormatter.format(amount)}
						{/* IF THEHER'S A MAX VALUE DISPLAY IT IF NOT DON'T */}
					{max && (	<span className="text-muted fs-6 ms-1">
							/ {currencyFormatter.format(max)}
						</span>)}
					</div>
				</Card.Title>
				{/* IF THEHER'S A MAX VALUE DISPLAY IT IF NOT DON'T */}
				{max && (<ProgressBar
					className="rounded-pill"
					variant={getProgressBarVariant(amount, max)}
					min={0}
					max={max}
					now={amount}
				/>)}

				{!hideButton && <Stack direction="horizontal" gap="2" className="mt-4">
					<Button
						onClick={onAddExpenseClick}
						variant="outline-primary"
						className="ms-auto">
						Add Expenses
					</Button>
					<Button variant="outline-secondary">View Expenses</Button>
				</Stack>}
			</Card.Body>
		</Card>
	);
};

export default BudgetCard;
