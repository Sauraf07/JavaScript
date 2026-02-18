// function countVowels(str) {
//   let vowels = "aeiou";
//   let count = 0;

//   for(let ch of str.toLowerCase()) {
//     if(vowels.includes(ch)) count++;
//   }

//   return count;
// }

// console.log(countVowels("Saurav"));

function longestword(sentence){
    let words = sentence.split(" ");
    let longest = "";

    for(let word of words){
        if(word.length > longest. length){
            longest = word;
        }
    }
    return longest;
}
console.log(longestword("I am the Best"))
