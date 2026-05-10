
        let display = document.getElementById('display');
        let currentInput = '';
        let lastResult = '';

        function appendToDisplay(value) {
            // যদি শেষ রেজাল্ট দেখানো হয়ে থাকে এবং নতুন ইনপুট শুরু হয়
            if (lastResult !== '' && !isNaN(value)) {
                currentInput = value;
                lastResult = '';
            } else {
                currentInput += value;
            }
            display.value = currentInput;
        }

        function clearDisplay() {
            currentInput = '';
            lastResult = '';
            display.value = '';
        }

        function deleteLast() {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        }

        function calculate() {
            try {
                // % কে /100 দিয়ে রিপ্লেস করা
                let expression = currentInput.replace(/%/g, '/100');
                
                // এক্সপ্রেশন ইভ্যালুয়েট করা
                let result = eval(expression);
                
                // ফলাফল ফরম্যাট করা
                if (!isFinite(result)) {
                    display.value = 'Error';
                    currentInput = '';
                    return;
                }
                
                // ফ্লোটিং পয়েন্ট এরর হ্যান্ডলিং
                result = Math.round(result * 1000000000000) / 1000000000000;
                
                display.value = result;
                currentInput = result.toString();
                lastResult = result.toString();
            } catch (error) {
                display.value = 'Error';
                currentInput = '';
            }
        }

        function toggleSign() {
            if (currentInput !== '' && currentInput !== '0') {
                if (currentInput.startsWith('-')) {
                    currentInput = currentInput.substring(1);
                } else {
                    currentInput = '-' + currentInput;
                }
                display.value = currentInput;
            }
        }

        // কিবোর্ড সাপোর্ট
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            
            if (key >= '0' && key <= '9') {
                appendToDisplay(key);
            } else if (key === '.') {
                appendToDisplay('.');
            } else if (key === '+') {
                appendToDisplay('+');
            } else if (key === '-') {
                appendToDisplay('-');
            } else if (key === '*') {
                appendToDisplay('*');
            } else if (key === '/') {
                appendToDisplay('/');
            } else if (key === '%') {
                appendToDisplay('%');
            } else if (key === 'Enter' || key === '=') {
                calculate();
            } else if (key === 'Backspace') {
                deleteLast();
            } else if (key === 'Escape' || key === 'Delete') {
                clearDisplay();
            }
        });