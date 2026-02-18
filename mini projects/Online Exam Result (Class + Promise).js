class ExamResult {
	constructor(studentName, marks) {
		this.studentName = studentName;
		this.marks = marks; // array of numbers
	}

	// Calculate total and percentage
	getTotal() {
		return this.marks.reduce((s, m) => s + (Number(m) || 0), 0);
	}

	getPercentage() {
		if (!this.marks.length) return 0;
		const total = this.getTotal();
		const maxPerSubject = 100;
		const percentage = (total / (this.marks.length * maxPerSubject)) * 100;
		return Number(percentage.toFixed(2));
	}

	// Determine grade synchronously
	getGrade() {
		const p = this.getPercentage();
		if (p >= 90) return 'A+';
		if (p >= 80) return 'A';
		if (p >= 70) return 'B';
		if (p >= 60) return 'C';
		if (p >= 50) return 'D';
		return 'F';
	}

	// Return a Promise that resolves to the result after a simulated async check
	evaluateAsync(delayMs = 500) {
		return new Promise((resolve, reject) => {
			// basic validation
			if (!this.studentName) return reject(new Error('Missing student name'));
			if (!Array.isArray(this.marks)) return reject(new Error('Marks must be an array'));
			if (this.marks.some(m => typeof m !== 'number' && isNaN(Number(m)))) {
				return reject(new Error('All marks must be numbers'));
			}

			setTimeout(() => {
				const total = this.getTotal();
				const percentage = this.getPercentage();
				const grade = this.getGrade();
				resolve({
					studentName: this.studentName,
					marks: this.marks,
					total,
					percentage,
					grade,
				});
			}, delayMs);
		});
	}
}

// Example usage
const alice = new ExamResult('Alice', [85, 92, 78, 88]);
alice.evaluateAsync(300).then(res => {
	console.log('Result for', res.studentName);
	console.log('Marks:', res.marks.join(', '));
	console.log('Total:', res.total);
	console.log('Percentage:', res.percentage + '%');
	console.log('Grade:', res.grade);
}).catch(err => console.error('Error:', err.message));

// Example with invalid input to show rejection
const broken = new ExamResult('', ['a', 90]);
broken.evaluateAsync().catch(err => console.log('Expected error:', err.message));

module.exports = ExamResult;
