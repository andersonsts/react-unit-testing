import { useEffect, useState } from "react";

export default function useFetch() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(data => setTasks(data.map((item: any) => item.title)))
  }, [])

  return { tasks }
}