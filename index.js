import inquirer from "inquirer";
let customerBalance = 150000; // Changed to number type for proper calculations
let selectedPin = "293742";
let pinANS = await inquirer.prompt([
    {
        type: "input",
        name: "pin",
        message: "Enter your pin",
        validate: function (value) {
            if (isNaN(value)) {
                return 'Please enter a valid number';
            }
            return true;
        }
    }
]);
if (pinANS.pin == selectedPin) {
    console.log("CORRECT PIN");
    let operationANS = await inquirer.prompt([
        {
            type: "list",
            name: "operation",
            message: "Enter operation",
            choices: ["withdraw", "check balance"],
        }
    ]);
    if (operationANS.operation === "withdraw") {
        let withdrawANS = await inquirer.prompt([
            {
                type: "input",
                name: "amount",
                message: "Enter amount to withdraw",
                validate: function (value) {
                    let numberValue = parseFloat(value);
                    if (isNaN(numberValue) || numberValue <= 0) {
                        return 'Please enter a valid amount';
                    }
                    else if (numberValue > customerBalance) {
                        return 'Insufficient balance';
                    }
                    return true;
                }
            }
        ]);
        customerBalance -= parseFloat(withdrawANS.amount);
        console.log(`Withdrawal successful. New balance: ${customerBalance}`);
    }
    else if (operationANS.operation === "check balance") {
        console.log(`Your balance is: ${customerBalance}`);
    }
}
else {
    console.log("INCORRECT PIN");
}
