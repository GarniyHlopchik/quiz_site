import React, { useState, useEffect } from 'react';
import { QuizBrowse } from '../components/QuizBrowse';
// Note: Removed unused import: import { getAllQuizzes } from '../utils/storage';

export function Index() {
    // 1. Define state variables to hold the data, loading status, and any errors.
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Use the useEffect hook to perform the asynchronous fetch operation once.
    useEffect(() => {
        fetch("/api/get_quizzes", {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                // Throw an error for bad HTTP statuses (4xx, 5xx)
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(quizzes_array => {
            // 3. Data successfully fetched and parsed: update the state.
            console.log("Successfully retrieved and parsed quizzes:", quizzes_array);
            setQuizzes(quizzes_array);
        })
        .catch(err => {
            // 4. Handle network or parsing errors.
            console.error('Fetch error:', err.message);
            setError(err.message);
        })
        .finally(() => {
            // 5. This runs regardless of success or failure, setting loading to false.
            setLoading(false);
        });
    }, []); // Empty array ensures this effect runs only once after the initial render

    // --- Conditional Rendering based on State ---

    if (loading) {
        return <div>Loading quizzes...</div>;
    }

    if (error) {
        return <div>Error loading quizzes: {error}</div>;
    }

    if (quizzes.length === 0) {
        return <div>No quizzes found.</div>;
    }

    // --- Final Render with Data ---
    
    // Now we safely use the 'quizzes' state variable (which is an array)
    return (
        <div>
            <h1>Available Quizzes</h1>
            {quizzes.map(q => (
                <QuizBrowse key={q.id} quiz={q} quiz_id={q.id} setQuizzes={setQuizzes}/>
            ))}
        </div>
    );
}