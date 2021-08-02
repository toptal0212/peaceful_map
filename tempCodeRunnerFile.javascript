function testString(s) {
    let string = '';
    
    for(let i = 0; i < s.length; i++) {
        if(s[i] >= 'a' && s[i] <= 'z') {
            string += s[i];
        }
    }
    return string.split('').reverse().join('');
}

console.log(8%4)