import { connect } from 'ts-postgres';

interface Person {
  name: string;
  age: number;
}

export default async function Page() {
  const client = await connect();
  // The query method is generic on the result row.
  const result = client.query(
    "SELECT name, age FROM people",
  );
  // let persons = [{name: 'John', age: 30}, {name: 'Doe', age: 25}]
  // let allPosts = await db.select().from(posts
  let people = [];
  for await (const obj of result) {
    let person: Person = {name: obj.name, age: obj.age}
    people.push(person)
  }
  return (
    <ul>
      {people.map((person) => (
        <li>{person.name} - {person.age}</li>
      ))}
    </ul>
  )
}
