import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from './services/expense';
import { Expense } from './models/expense.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  expenses: Expense[] = [];
  removingExpenses = new Set<Expense>();

  name = '';
  amount: number | null = null;
  category = '';

  constructor(private expenseService: ExpenseService) {
    this.expenses = this.expenseService.getExpenses();
  }

  addExpense(): void {
    if (!this.name.trim() || !this.amount || this.amount <= 0 || !this.category.trim()) {
      return;
    }

    this.expenseService.addExpense({
      name: this.name.trim(),
      amount: this.amount,
      category: this.category.trim()
    });

    this.expenses = this.expenseService.getExpenses();

    this.name = '';
    this.amount = null;
    this.category = '';
  }

  isRemoving(expense: Expense): boolean {
    return this.removingExpenses.has(expense);
  }

  deleteExpense(expense: Expense): void {
    this.removingExpenses.add(expense);

    setTimeout(() => {
      this.expenseService.deleteExpense(expense);
      this.expenses = this.expenseService.getExpenses();
      this.removingExpenses.delete(expense);
    }, 250);
  }

  get total(): number {
    return this.expenses.reduce((sum, e) => sum + e.amount, 0);
  }
}
