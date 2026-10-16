/**
 * CodeBuddy — Shared Challenges Dataset
 * Realistic beginner & intermediate coding problems with starter templates and hints.
 */

const CHALLENGES_DATA = [
  {
    id: "count-vowels",
    title: "Count Vowels in a String",
    difficulty: "Beginner",
    topic: "Strings & Loops",
    estimatedTime: "15 min",
    summary: "Count the total number of vowels (a, e, i, o, u) present in a given string, ignoring letter case.",
    description: "Write a function named count_vowels(text) that takes a string of words and returns the total number of vowels present. Vowels are defined as 'a', 'e', 'i', 'o', and 'u' in both lowercase and uppercase.",
    examples: [
      { input: 'text = "hello world"', output: '3', explanation: "Vowels: 'e', 'o', 'o'" },
      { input: 'text = "CodeBuddy AI"', output: '5', explanation: "Vowels: 'o', 'e', 'u', 'A', 'I'" }
    ],
    starterCode: {
      python: `def count_vowels(text: str) -> int:
    # Your solution here
    vowels = "aeiouAEIOU"
    count = 0
    for char in text:
        if char in vowels:
            count += 1
    return count

# Test your function:
print(count_vowels("hello world"))`,
      javascript: `function countVowels(text) {
    // Your solution here
    const vowels = "aeiouAEIOU";
    let count = 0;
    for (const char of text) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    return count;
}

// Test your function:
console.log(countVowels("hello world"));`
    },
    hints: [
      "Think about inspecting letters one at a time. What loop lets you visit each character in a sequence?",
      "How can you check if the current character is a vowel? Consider comparing against a collection of vowels like 'aeiouAEIOU'.",
      "Initialize an accumulator at 0 before your loop. Every time you find a match, increment by 1. Return the total count after the loop."
    ],
    mistakeAnalysis: "A frequent pitfall is forgetting uppercase vowels (like 'A' or 'E'), or accidentally resetting the counter inside the loop body.",
    solutionWalkthrough: "Iterate over each character in the string. If the character is present in the set of vowels 'aeiouAEIOU', increment a counter. Return the accumulated count."
  },
  {
    id: "max-number",
    title: "Find the Largest Number",
    difficulty: "Beginner",
    topic: "Arrays & Conditionals",
    estimatedTime: "10 min",
    summary: "Given a list or array of numbers, return the highest value without using built-in max functions.",
    description: "Write a function named find_max(numbers) that accepts a non-empty list of integers and returns the greatest number.",
    examples: [
      { input: 'numbers = [3, 7, 2, 9, 5]', output: '9', explanation: "9 is the greatest value." },
      { input: 'numbers = [-10, -3, -50]', output: '-3', explanation: "-3 is greater than -10 and -50." }
    ],
    starterCode: {
      python: `def find_max(numbers: list[int]) -> int:
    # Your solution here
    max_val = numbers[0]
    for num in numbers:
        if num > max_val:
            max_val = num
    return max_val

print(find_max([3, 7, 2, 9, 5]))`,
      javascript: `function findMax(numbers) {
    // Your solution here
    let maxVal = numbers[0];
    for (const num of numbers) {
        if (num > maxVal) {
            maxVal = num;
        }
    }
    return maxVal;
}

console.log(findMax([3, 7, 2, 9, 5]));`
    },
    hints: [
      "Start by assuming the first item in the list is the largest candidate so far.",
      "Compare your current maximum candidate against each number as you iterate through the rest of the array.",
      "Whenever you encounter a number strictly greater than your current candidate, update your maximum."
    ],
    mistakeAnalysis: "Initializing your maximum to 0 instead of the first element will fail if the array only contains negative numbers (e.g., [-5, -2]).",
    solutionWalkthrough: "Initialize `max_val` to `numbers[0]`. Loop over the array. If any element exceeds `max_val`, assign that element to `max_val`. Return `max_val`."
  },
  {
    id: "reverse-string",
    title: "Reverse a String",
    difficulty: "Beginner",
    topic: "Strings",
    estimatedTime: "10 min",
    summary: "Return a new string containing the characters of the original string in reverse order.",
    description: "Write a function named reverse_string(text) that returns the reversed version of the input string without mutating the original text.",
    examples: [
      { input: 'text = "code"', output: '"edoc"', explanation: "Characters in reverse order." },
      { input: 'text = "Buddy"', output: '"ydduB"', explanation: "Preserves case when reversed." }
    ],
    starterCode: {
      python: `def reverse_string(text: str) -> str:
    # Your solution here
    reversed_text = ""
    for char in text:
        reversed_text = char + reversed_text
    return reversed_text

print(reverse_string("code"))`,
      javascript: `function reverseString(text) {
    // Your solution here
    let reversed = "";
    for (const char of text) {
        reversed = char + reversed;
    }
    return reversed;
}

console.log(reverseString("code"));`
    },
    hints: [
      "How does prepending a character (placing it at the front) alter a string compared to appending it at the end?",
      "You can build an empty string and iterate through the input string, adding each letter to the beginning.",
      "Alternatively, consider looping backwards from the final index down to index 0."
    ],
    mistakeAnalysis: "In languages where strings are immutable, remember to build a new string or array rather than trying to modify string indices directly.",
    solutionWalkthrough: "Start with an empty accumulator string. For each character in the input, prepend it: `reversed = char + reversed`. Return the accumulated string."
  },
  {
    id: "palindrome",
    title: "Check for Palindrome",
    difficulty: "Beginner",
    topic: "Strings & Two Pointers",
    estimatedTime: "15 min",
    summary: "Determine if a word reads the same forwards and backwards, ignoring capitalization.",
    description: "Write a function is_palindrome(word) that returns True if the word is identical forwards and backwards, and False otherwise.",
    examples: [
      { input: 'word = "racecar"', output: 'true', explanation: "'racecar' reads identically backwards." },
      { input: 'word = "hello"', output: 'false', explanation: "'olleh' does not equal 'hello'." }
    ],
    starterCode: {
      python: `def is_palindrome(word: str) -> bool:
    # Your solution here
    cleaned = word.lower()
    return cleaned == cleaned[::-1]

print(is_palindrome("Racecar"))`,
      javascript: `function isPalindrome(word) {
    // Your solution here
    const cleaned = word.toLowerCase();
    const reversed = cleaned.split("").reverse().join("");
    return cleaned === reversed;
}

console.log(isPalindrome("Racecar"));`
    },
    hints: [
      "Case sensitivity matters: 'Racecar' should match 'racecar'. Standardize the casing first using lowercase.",
      "Compare the standardized string with its reversed counterpart.",
      "For an optimal approach, compare the first and last characters, then move inward towards the center."
    ],
    mistakeAnalysis: "Forgetting to lowercase the input string will cause words like 'Madam' or 'Racecar' to falsely report as not palindromes.",
    solutionWalkthrough: "Convert the string to lowercase. Compare characters from both ends moving inward, or directly compare the string to its reversed version."
  },
  {
    id: "sum-evens",
    title: "Sum of Even Numbers",
    difficulty: "Beginner",
    topic: "Loops & Math",
    estimatedTime: "10 min",
    summary: "Calculate the sum of all even integers up to and including a given number n.",
    description: "Write a function sum_even_numbers(n) that returns the sum of all positive even integers from 1 up to n.",
    examples: [
      { input: 'n = 6', output: '12', explanation: "2 + 4 + 6 = 12" },
      { input: 'n = 10', output: '30', explanation: "2 + 4 + 6 + 8 + 10 = 30" }
    ],
    starterCode: {
      python: `def sum_even_numbers(n: int) -> int:
    # Your solution here
    total = 0
    for i in range(2, n + 1, 2):
        total += i
    return total

print(sum_even_numbers(6))`,
      javascript: `function sumEvenNumbers(n) {
    // Your solution here
    let total = 0;
    for (let i = 2; i <= n; i += 2) {
        total += i;
    }
    return total;
}

console.log(sumEvenNumbers(6));`
    },
    hints: [
      "How do you determine if a number is even? The modulo operator (i % 2 == 0) checks for divisibility by 2.",
      "Alternatively, step your loop in increments of 2 starting at 2.",
      "Keep an accumulator variable initialized to 0 and add each even integer."
    ],
    mistakeAnalysis: "Make sure your loop includes n when n is itself an even number (use <= n or range(2, n + 1, 2)).",
    solutionWalkthrough: "Iterate from 2 up to n by steps of 2. Add each value to a running sum. Return the final total."
  },
  {
    id: "fizz-buzz",
    title: "FizzBuzz Classic",
    difficulty: "Beginner",
    topic: "Logic & Conditionals",
    estimatedTime: "15 min",
    summary: "Return 'Fizz' for multiples of 3, 'Buzz' for multiples of 5, and 'FizzBuzz' for both.",
    description: "Write a function fizz_buzz(n) that returns a list of results from 1 to n following standard FizzBuzz rules.",
    examples: [
      { input: 'n = 5', output: '["1", "2", "Fizz", "4", "Buzz"]', explanation: "3 is Fizz, 5 is Buzz." }
    ],
    starterCode: {
      python: `def fizz_buzz(n: int) -> list[str]:
    # Your solution here
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result

print(fizz_buzz(5))`,
      javascript: `function fizzBuzz(n) {
    // Your solution here
    const result = [];
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            result.push("FizzBuzz");
        } else if (i % 3 === 0) {
            result.push("Fizz");
        } else if (i % 5 === 0) {
            result.push("Buzz");
        } else {
            result.push(String(i));
        }
    }
    return result;
}

console.log(fizzBuzz(5));`
    },
    hints: [
      "Pay attention to the order of conditional checks! Multiples of both 3 and 5 must be checked first.",
      "A number divisible by both 3 and 5 is divisible by 15.",
      "Convert regular numbers to strings when pushing them into the output list."
    ],
    mistakeAnalysis: "If you check `i % 3 === 0` before `i % 15 === 0`, numbers like 15 will output 'Fizz' instead of 'FizzBuzz'.",
    solutionWalkthrough: "Check for divisibility by 15 first. Then check 3, then 5, and default to the number string."
  },
  {
    id: "first-non-repeating",
    title: "First Non-Repeating Character",
    difficulty: "Intermediate",
    topic: "Hash Maps & Strings",
    estimatedTime: "20 min",
    summary: "Find the first character in a string that appears only once.",
    description: "Write a function first_unique_char(s) that returns the first non-repeating character in string s. If none exists, return an empty string.",
    examples: [
      { input: 's = "swiss"', output: '"w"', explanation: "'s' repeats, so 'w' is the first unique character." },
      { input: 's = "aabb"', output: '""', explanation: "All characters repeat." }
    ],
    starterCode: {
      python: `def first_unique_char(s: str) -> str:
    # Your solution here
    counts = {}
    for char in s:
        counts[char] = counts.get(char, 0) + 1
        
    for char in s:
        if counts[char] == 1:
            return char
    return ""

print(first_unique_char("swiss"))`,
      javascript: `function firstUniqueChar(s) {
    // Your solution here
    const counts = {};
    for (const char of s) {
        counts[char] = (counts[char] || 0) + 1;
    }
    for (const char of s) {
        if (counts[char] === 1) {
            return char;
        }
    }
    return "";
}

console.log(firstUniqueChar("swiss"));`
    },
    hints: [
      "This problem typically requires two passes: first count character frequencies, then find the first character with frequency 1.",
      "A dictionary (Python) or object/Map (JavaScript) is ideal for tracking frequencies in O(n) time.",
      "In the second pass, iterate through the string in its original order so you return the FIRST unique character."
    ],
    mistakeAnalysis: "Iterating through the hash map keys instead of the original string might not preserve the original character order.",
    solutionWalkthrough: "Build a frequency map in pass 1. In pass 2, loop through the original string and return the first character whose count is 1. If none, return empty string."
  },
  {
    id: "merge-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Intermediate",
    topic: "Arrays & Pointers",
    estimatedTime: "20 min",
    summary: "Combine two already-sorted arrays into one single sorted list.",
    description: "Write a function merge_sorted(list1, list2) that merges two sorted integer arrays into one sorted array in O(n + m) time.",
    examples: [
      { input: 'list1 = [1, 3, 5], list2 = [2, 4, 6]', output: '[1, 2, 3, 4, 5, 6]', explanation: "Combined in sorted order." }
    ],
    starterCode: {
      python: `def merge_sorted(list1: list[int], list2: list[int]) -> list[int]:
    # Your solution here
    merged = []
    i = j = 0
    while i < len(list1) and j < len(list2):
        if list1[i] <= list2[j]:
            merged.append(list1[i])
            i += 1
        else:
            merged.append(list2[j])
            j += 1
            
    merged.extend(list1[i:])
    merged.extend(list2[j:])
    return merged

print(merge_sorted([1, 3, 5], [2, 4, 6]))`,
      javascript: `function mergeSorted(list1, list2) {
    // Your solution here
    const merged = [];
    let i = 0, j = 0;
    while (i < list1.length && j < list2.length) {
        if (list1[i] <= list2[j]) {
            merged.push(list1[i++]);
        } else {
            merged.push(list2[j++]);
        }
    }
    return merged.concat(list1.slice(i)).concat(list2.slice(j));
}

console.log(mergeSorted([1, 3, 5], [2, 4, 6]));`
    },
    hints: [
      "Use two pointers, starting at index 0 of each array.",
      "At each step, compare the values at the two pointers. Append the smaller one and advance that pointer.",
      "Don't forget to append any remaining elements once one list is exhausted."
    ],
    mistakeAnalysis: "Avoid concatenating and sorting with `.sort()` — the challenge specifically asks for the two-pointer O(n + m) linear merge.",
    solutionWalkthrough: "Compare pointers `i` and `j` in a while loop, appending the smaller element each time. Append remaining elements after the loop finishes."
  }
];
