
const eurosFormatter = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
});

class Wallet {
  #name;
  #cash;
  #dailyAllowance = 40;
  #dayTotalWithdrawals = 0; 

  constructor(name, cash) {
    this.#name = name;
    this.#cash = cash;
  }

  get name() {
    return this.#name;
  }

  deposit(amount) {
    this.#cash += amount;
  }

  withdraw(amount) {
    if (this.#cash - amount < 0) {
      console.log(`Insufficient funds!`);
      return 0;
    }
    // Check if the withdrawal amount exceeds the daily allowance
    if (amount + this.#dayTotalWithdrawals > this.#dailyAllowance) {
      console.log(`Insufficient remaining daily allowance!`);
      return 0;
    }


    this.#cash -= amount;
    this.#dayTotalWithdrawals += amount;
    return amount;
  }

  transferInto(wallet, amount) {
    console.log(
      `Transferring ${eurosFormatter.format(amount)} from ${this.name} to ${
        wallet.name
      }`
    );
    const withdrawnAmount = this.withdraw(amount);
    wallet.deposit(withdrawnAmount);
  }

  reportBalance() {
    console.log(
      `Name: ${this.name}, balance: ${eurosFormatter.format(
        this.#cash
      )}, daily allowance: ${eurosFormatter.format(
        this.#dailyAllowance
      )}, withdrawals today: ${eurosFormatter.format(this.#dayTotalWithdrawals)}`
    );
  }

  resetDailyAllowance() {
    this.#dayTotalWithdrawals = 0;
  }

  setDailyAllowance(newAllowance) {
    this.#dailyAllowance = newAllowance;
  }

};



function main() {
  const walletJack = new Wallet('Jack', 100);
  const walletJoe = new Wallet('Joe', 10);
  const walletJane = new Wallet('Jane', 20);

  walletJack.transferInto(walletJoe, 50);
  walletJane.transferInto(walletJoe, 25);

  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();
  walletJack.setDailyAllowance(60);
  walletJack.withdraw(50); 
  walletJack.withdraw(20)
  walletJack.reportBalance();

  walletJack.resetDailyAllowance();
  walletJack.withdraw(50); 
  walletJack.reportBalance();
}

main();