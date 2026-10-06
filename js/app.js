const searchInput = document.querySelector('#searchInput');
const statusFilter = document.querySelector('#statusFilter');
const transactionRows = document.querySelector('#transactionRows');
const summary = document.querySelector('#summary');
const emptyState = document.querySelector('#emptyState');

function getVisibleTransactions() {
  // TODO 1 (candidate): Return records matching both the search text and selected status.
  // Search must ignore letter case and match customer name or transaction ID.
  return transactionData;
}

function createTransactionRow(transaction) {
  const row = document.createElement('tr');
  const values = [
    transaction.id,
    transaction.customer,
    formatCurrency(transaction.amount, transaction.currency),
    transaction.status,
    formatDate(transaction.date)
  ];

  values.forEach((value, index) => {
    const cell = document.createElement('td');

    if (index === 3) {
      const badge = document.createElement('span');
      badge.className = `status status--${transaction.status}`;
      badge.textContent = value;
      cell.appendChild(badge);
    } else {
      cell.textContent = value;
    }

    row.appendChild(cell);
  });

  return row;
}

function renderTransactions() {
  const visibleTransactions = getVisibleTransactions();

  transactionRows.replaceChildren();
  visibleTransactions.forEach((transaction) => {
    transactionRows.appendChild(createTransactionRow(transaction));
  });

  const count = visibleTransactions.length;
  summary.textContent = `${count} ${count === 1 ? 'transaction' : 'transactions'}`;
  emptyState.hidden = count !== 0;
  transactionRows.closest('table').hidden = count === 0;
}

searchInput.addEventListener('input', renderTransactions);
statusFilter.addEventListener('change', renderTransactions);
renderTransactions();

/* Candidate notes:
   Technical decision:
   Improvement with more time:
   AI usage:
*/
