// generate-db.js
const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

function generateDb() {
  const accounts = [];
  const numberOfAccounts = 10;

  for (let i = 0; i < numberOfAccounts; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const userName = faker.internet.username({ firstName, lastName });
    const email = faker.internet.email({ firstName, lastName });
    const bio = faker.lorem.paragraph({ min: 1, max: 3 });
    const userpicUrl = faker.image.avatar();
    const skills = faker.helpers.arrayElements(
      ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'RxJS',
      'NgRx', 'Git', 'Agile', 'RESTful API', 'SQL', 'MongoDB', 'React', 'Vue.js',
      'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Unit Testing',
      'E2E Testing', 'CI/CD', 'UX/UI Design', 'Figma', 'Problem Solving',
      'Communication', 'Teamwork', 'Scrum', 'Kanban', 'Redux', 'Vuex', 'GraphQL',
      'Python', 'Java', 'C#', 'PHP', 'Ruby on Rails', 'Go', 'Kotlin', 'Swift',
      'Machine Learning', 'Data Science', 'Cybersecurity', 'Cloud Computing',
      'Microservices', 'WebSockets', 'Responsive Design', 'Sass', 'Less',
      'Webpack', 'Vite', 'Parcel', 'Design Patterns', 'Algorithms', 'Data Structures',
      'Leadership', 'Mentoring', 'Public Speaking', 'Critical Thinking'],
      { min: 2, max: 7 }
    );

    accounts.push({
      id: faker.string.uuid(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      firstName,
      lastName,
      userName,
      email,
      bio,
      userpicUrl,
      skills,
    });
  }

  const db = {
    accounts: accounts,
    
    // posts: [],
    // comments: [],
  };

  const dbPath = path.join(__dirname, 'public/assets/db.json'); 
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

  console.log(`Generated ${numberOfAccounts} accounts and saved to ${dbPath}`);
}

generateDb();