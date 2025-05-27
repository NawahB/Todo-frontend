import { useEffect, useState } from "react";
import axios from "axios";

const api = "https://todo-backend-production-ff45.up.railway.app/api/todos"; // Change to production URL when deployed

function Home() {
    const [todos, setTodos] = useState([]);
    const [form, setForm] = useState({ name: "", priority: "low", isFun: false });

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const res = await axios.get(api);
        setTodos(res.data);
    };

    const addTodo = async (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        await axios.post(api, form);
        setForm({ name: "", priority: "low", isFun: false });
        fetchTodos();
    };

    const deleteTodo = async (id) => {
        await axios.delete(`${api}/${id}`);
        fetchTodos();
    };

    const toggleComplete = async (todo) => {
        await axios.put(`${api}/${todo.id}`, {
            ...todo,
            isComplete: !todo.isComplete,
        });
        fetchTodos();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
            <div className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-2xl">
                <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">Todo List</h1>
                <form onSubmit={addTodo} className="flex flex-col sm:flex-row gap-3 mb-6">
                    <input
                        type="text"
                        placeholder="What's your task?"
                        className="flex-1 px-4 py-2 rounded-md border"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <select
                        className="px-4 py-2 rounded-md border"
                        value={form.priority}
                        onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <label className="inline-flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={form.isFun}
                            onChange={(e) => setForm({ ...form, isFun: e.target.checked })}
                        />
                        <span>Fun</span>
                    </label>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                        Add
                    </button>
                </form>

                <ul className="space-y-3">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className={`flex items-center justify-between p-4 rounded-lg shadow-sm border ${todo.isComplete ? "bg-green-100" : "bg-gray-50"
                                }`}
                        >
                            <div className="flex-1">
                                <p
                                    className={`text-lg font-medium ${todo.isComplete ? "line-through text-gray-400" : ""
                                        }`}
                                >
                                    {todo.name}
                                </p>
                                <div className="text-sm space-x-2 mt-1">
                                    <span
                                        className={`inline-block px-2 py-1 rounded-full text-white ${todo.priority === "high"
                                                ? "bg-red-500"
                                                : todo.priority === "medium"
                                                    ? "bg-yellow-500"
                                                    : "bg-green-500"
                                            }`}
                                    >
                                        {todo.priority}
                                    </span>
                                    {todo.isFun && (
                                        <span className="inline-block px-2 py-1 bg-pink-400 text-white rounded-full">
                                            🎉 Fun
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => toggleComplete(todo)}
                                    className="text-green-600 hover:scale-110"
                                    title="Toggle Complete"
                                >
                                    {todo.isComplete ? "✅" : "⬜"}
                                </button>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="text-red-500 hover:scale-110"
                                    title="Delete"
                                >
                                    🗑️
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;
