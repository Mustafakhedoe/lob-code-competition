"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const questions: Question[] = [
  // 1-10 makkelijk
  { question: "Wat betekent HTML?", options: ["Hyper Text Markup Language","Home Tool Markup Language","Hyper Trainer Marking Language","Hyper Text Marketing Language"], answer: "Hyper Text Markup Language" },
  { question: "Welke tag gebruik je voor een link?", options: ["<href>", "<a>", "<url>", "<link>"], answer: "<a>" },
  { question: "Welke CSS property verandert tekst kleur?", options: ["background", "color", "font-style", "text-color"], answer: "color" },
  { question: "Wat doet JavaScript?", options: ["Stylet de website","Host de site","Maakt websites interactief","Maakt database"], answer: "Maakt websites interactief" },
  { question: "Welke tag is een heading?", options: ["<div>", "<span>", "<h1>", "<p>"], answer: "<h1>" },
  { question: "Hoe maak je een comment in HTML?", options: ["// comment", "<!-- comment -->", "# comment", "/* comment */"], answer: "<!-- comment -->" },
  { question: "Welke property maakt tekst vet?", options: ["text-style", "font-weight", "font-bold", "weight"], answer: "font-weight" },
  { question: "Hoe voeg je een externe CSS file toe?", options: ["<script src='style.css'>","<link rel='stylesheet' href='style.css'>","<css src='style.css'>","<style src='style.css'>"], answer: "<link rel='stylesheet' href='style.css'>" },
  { question: "Welke tag gebruik je voor een paragraaf?", options: ["<span>", "<para>", "<p>", "<div>"], answer: "<p>" },
  { question: "Hoe declareer je een variabele in JS?", options: ["const x","alle drie","let x","var x"], answer: "alle drie" },

  // 11-20 medium
  { question: "Welke pseudo-class gebruik je bij hover?", options: [":active", ":hover", ":focus", ":visited"], answer: ":hover" },
  { question: "Wat doet 'document.getElementById'?", options: ["Voegt element toe","Zoekt element","Stylet element","Verwijdert element"], answer: "Zoekt element" },
  { question: "Hoe maak je een flex container?", options: ["display:block","display:flex","display:inline","display:grid"], answer: "display:flex" },
  { question: "Wat is de juiste manier om een array te maken in JS?", options: ["let arr={}","array arr=[]","let arr=[]","let arr=()"], answer: "let arr=[]" },
  { question: "Welke CSS property verandert lettertype?", options: ["font","letter-style","font-family","text-style"], answer: "font-family" },
  { question: "Wat doet 'addEventListener'?", options: ["Maakt events","Luistert naar events","Stylet events","Verwijdert events"], answer: "Luistert naar events" },
  { question: "Welke tag gebruik je voor een afbeelding?", options: ["<picture>", "<image>", "<img>", "<src>"], answer: "<img>" },
  { question: "Wat is de default display van een div?", options: ["inline","flex","block","grid"], answer: "block" },
  { question: "Hoe krijg je de lengte van een array?", options: ["arr.size","arr.length","arr.count","arr.total"], answer: "arr.length" },
  { question: "Wat doet 'innerHTML'?", options: ["Verwijdert element","Maakt nieuw element","Verandert content","Verandert style"], answer: "Verandert content" },

  // 21-25 moeilijk
  { question: "Welke selector selecteert directe kinderen?", options: [" ", "~", ">", "+"], answer: ">" },
  { question: "Hoe stop je een event in JavaScript?", options: ["event.stopPropagation()","alle bovenstaande","return false","event.preventDefault()"], answer: "alle bovenstaande" },
  { question: "Wat doet 'position: absolute'?", options: ["Maakt element sticky","Positioneert absoluut t.o.v viewport","Positioneert relatief t.o.v eerstvolgende relative","Verwijdert element"], answer: "Positioneert relatief t.o.v eerstvolgende relative" },
  { question: "Wat doet 'display: grid'?", options: ["Verbergt elementen","Maakt flex layout","Maakt grid layout","Stylet elementen"], answer: "Maakt grid layout" },
  { question: "Hoe selecteer je meerdere elementen tegelijk in JS?", options: ["document.getElementById","alle bovenstaande","document.querySelectorAll","document.getElementsByClassName"], answer: "document.querySelectorAll" },
];
export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const router = useRouter();

  const handleAnswer = (option: string) => {
    const correct = questions[current].answer;

    if (option === correct) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Fout! Antwoord: ${correct}`);
    }

    setTimeout(() => {
      setFeedback("");

      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        const percentage = Math.round(
          ((score + (option === correct ? 1 : 0)) / questions.length) * 100
        );

        const user = localStorage.getItem("username") || "Onbekend";
        const results = JSON.parse(localStorage.getItem("scores") || "[]");
        results.push({
          name: user,
          score: `${score + (option === correct ? 1 : 0)}/${questions.length}`,
          percentage,
        });
        localStorage.setItem("scores", JSON.stringify(results));
        router.push("/");
      }
    }, 1500);
  };

  const q = questions[current];

  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md text-center">
        <h2 className="text-xl mb-4">
          Vraag {current + 1} / {questions.length}
        </h2>

        <h1 className="text-2xl font-bold mb-6">{q.question}</h1>

        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className={`w-full p-3 rounded-lg mb-2 transition-colors ${
                feedback
                  ? opt === q.answer
                    ? "bg-green-500"
                    : "bg-red-500"
                  : "bg-blue-500 hover:bg-blue-400"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {feedback && (
          <p
            className={`mt-6 text-lg font-bold ${
              feedback.startsWith("✅") ? "text-green-400" : "text-red-500"
            }`}
          >
            {feedback}
          </p>
        )}
      </div>
    </main>
  );
}