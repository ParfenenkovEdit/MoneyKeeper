let startPayment = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesItem = document.getElementsByClassName('optionalexpenses-item'),
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesItem = document.getElementsByClassName('expenses-item'),
    approveExpenses = document.getElementsByTagName('button')[0],
    approveOptionalExpenses = document.getElementsByTagName('button')[1],
    calculateDayBudget = document.getElementsByTagName('button')[2],
    startCalc = document.getElementsByTagName('button')[3],
    varIncome = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumOfSavings = document.querySelector('.choose-sum'),
    percentOfSaving = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

    let time, money;

    let appData = {
      budget: money,
      timeData: time,
      expenses: {},
      optionalExpenses: {},
      income: [],
      savings: false,
    }

    startPayment.addEventListener('click',() => {
      time = prompt("Введите дату в формате YYYY-MM-DD"),
      money = +prompt("Ваш бюджет на месяц?");

      while(isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?");
      }
      appData.budget = money;
      appData.timeData = time;
      budgetValue.textContent = money.toFixed();
      yearValue.value = new Date(Date.parse(time)).getFullYear();
      monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
      dayValue.value = new Date(Date.parse(time)).getDate();
      document.querySelectorAll('button').forEach((item) => {
        item.removeAttribute("disabled");
      });
    });

    approveExpenses.addEventListener('click', () => {
        let sum = 0;
        for (let i = 0; i < expensesItem.length; i++) {
          let expenseName = expensesItem[i].value,
              expenseCost = expensesItem[++i].value;
          if (typeof(expenseName) != null && 
          typeof(expenseCost) != null && expenseName != '' &&
           expenseCost != '' && expenseName.length < 50) {
            appData.expenses[expenseName] = expenseCost;
            sum += +expenseCost;
         } else {
              i--;
            }
        }
        expensesValue.textContent = sum;
    });

    approveOptionalExpenses.addEventListener('click', () => {
      for (let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + " ";
      }
    });

    calculateDayBudget.addEventListener('click', () => {
      if (appData.budget != undefined) {
        let sumOfExpenses = 0;
        for (let key in appData.expenses) {
          sumOfExpenses += +appData.expenses[key];
        }
        appData.moneyPerDay = ((appData.budget - sumOfExpenses) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
        if (appData.moneyPerDay < 10) {
          levelValue.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 10 && appData.moneyPerDay < 20) {
          levelValue.textContent = 'Средний уровень достатка';
        } else if (appData.moneyPerDay > 20) {
          levelValue.textContent = 'Высокий уровень достатка';
        } else {
          levelValue.textContent = 'Некорректные данные';
        }
      } else {
        dayBudgetValue.textContent = 'Произошла ошибка';
      }
    });

    varIncome.addEventListener('input', () => {
      let items = varIncome.value;
      appData.income = items.split(', ');
      incomeValue.textContent = appData.income;
    });

    checkSavings.addEventListener('click', () => {
      if (appData.savings == true) {
        appData.savings = false;
      } else {
        appData.savings = true;
      }
    });

    sumOfSavings.addEventListener('input', () => {
      if (appData.savings == true) {
        let sum  = +sumOfSavings.value,
            percent = +percentOfSaving.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthIncome.textContent = appData.monthIncome.toFixed(1);
        yearIncome.textContent = appData.yearIncome.toFixed(1);
      }
    }); 

    percentOfSaving.addEventListener('input', () => {
      if (appData.savings == true) {
        let sum  = +sumOfSavings.value,
            percent = +percentOfSaving.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
      }
    }); 