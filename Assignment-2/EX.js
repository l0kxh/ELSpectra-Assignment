const fs = require("fs")
const data = fs.readFileSync("input.json")
const skills = JSON.parse(data);

const getRank = (sc, arr, p) => arr.filter(item => item[p] < sc).length + 1;

skills.forEach(skill => {
    skill.rank_2019 = getRank(skill['2019_rank'], skills, '2019_score')
    skill.rank_2024 = getRank(skill['2024_rank'], skills, '2024_score')
})

const top_3_2019 = skills.sort((a, b) => b['2019_score'] - a['2019_score']).slice(0, 3)
const bottom_3_2019 = skills.sort((a, b) => a['2019_score'] - b['2019_score']).slice(0, 3)
const top_3_2024 = skills.sort((a, b) => b['2024_score'] - a['2024_score']).slice(0, 3)
const bottom_3_2024 = skills.sort((a, b) => a['2024_score'] - b['2024_score']).slice(0, 3)
const fastestGrowing = skills.sort((a, b) => (b['2024_score'] - b['2019_score']) - (a['2024_score'] - a['2019_score'])).slice(0, 3);
const fastestDeclining = skills.sort((a, b) => (a['2024_score'] - a['2019_score']) - (b['2024_score'] - b['2019_score'])).slice(0, 3);

console.log('Ranks:');
skills.forEach(skill => {
    console.log(`\n\n${skill.skill}: \n  Rank in 2019 - ${skill.rank_2019}, Rank in 2024 - ${skill.rank_2024}`)
}
);

console.log('\nTop 3 in 2019 : ');
top_3_2019.forEach(skill => console.log(`${skill.skill}: ${skill['2019_score']}%`));

console.log('\nBottom 3 in 2019 : ');
bottom_3_2019.forEach(skill => console.log(`${skill.skill}: ${skill['2019_score']}%`));

console.log('\nTop 3: ');
top_3_2024.forEach(skill => console.log(`${skill.skill}: ${skill['2024_score']}%`));

console.log('\nBottom 3: ');
bottom_3_2024.forEach(skill => console.log(`${skill.skill}: ${skill['2024_score']}%`));

console.log('\nFastest growing : ');
fastestGrowing.forEach(skill => console.log(`${skill.skill}: ${skill['2024_score'] - skill['2019_score']}%`));

console.log('\nFastest declining : ');
fastestDeclining.forEach(skill => console.log(`${skill.skill}: ${skill['2024_score'] - skill['2019_score']}%`));

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Enter a skill: ', skillName => {
    const skill = skills.find(obj => obj.skill.toLowerCase() === skillName.toLowerCase());
    if (skill) {
        console.log(`Rank of ${skill.skill} in 2019 : ${skill.rank_2019}, Rank of Senses in 2024 : ${skill.rank_2024}`);
    } else {
        console.log(`Skill not found: ${skillName}`);
    }
    readline.close();
});
