import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private storageKey = 'expenses';

  private expenses: Expense[] = this.loadFromStorage();

  getExpenses(): Expense[] {
    return this.expenses;
  }

  addExpense(expense: Expense): void {
    this.expenses.push(expense);
    this.saveToStorage();
  }

  deleteExpense(expense: Expense): void {
    this.expenses = this.expenses.filter(e => e !== expense);
    this.saveToStorage();
  }

  private loadFromStorage(): Expense[] {
    const saved = localStorage.getItem(this.storageKey);

    if (saved) {
      return JSON.parse(saved);
    }

    return [
      { name: 'Groceries', amount: 250, category: 'Food' },
      { name: 'Bus ticket', amount: 15, category: 'Transport' }
    ];
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.expenses));
  }
}
